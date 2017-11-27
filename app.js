require("dotenv").config({ silent: true });
process.env.PWD = process.cwd();

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const compression = require("compression");
const helmet = require("helmet");
const csp = require("express-csp-header");
const referrerPolicy = require("referrer-policy");

require("./app_api/models/db");
require("./app_api/config/passport");

const routes = require("./app_server/routes/index");
const routesApi = require("./app_api/routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "jade");

// logging
switch (app.get("env")) {
  case "development":
    app.use(logger("dev"));
    break;
  case "production":
    app.use(
      require("express-logger")({
        path: __dirname + "/log/requests.log"
      })
    );
    break;
}

// security middleware
app.use(
  helmet({
    frameguard: {
      action: "deny"
    }
  })
);

app.use(
  csp({
    policies: {
      "default-src": [csp.SELF],
      "script-src": [csp.NONCE, "cdnjs.cloudflare.com"],
      "style-src": [
        csp.SELF,
        csp.INLINE,
        "fonts.googleapis.com",
        "cdnjs.cloudflare.com"
      ],
      "img-src": [csp.SELF],
      "font-src": [csp.NONCE, "fonts.gstatic.com", "cdnjs.cloudflare.com"],
      "object-src": [csp.NONE],
      "block-all-mixed-content": true,
      "frame-ancestors": [csp.NONE]
    }
  })
);

app.use(referrerPolicy({ policy: "same-origin" }));

// misc. middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET
  })
);

app.use(compression());

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(process.env.PWD + "/public"));

app.use(passport.initialize());

// catch flash messages, then delete them (so they only appear on next view render)
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

//routes
app.use("/api", routesApi);
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

//output pretty HTML:
app.locals.pretty = true;

module.exports = app;

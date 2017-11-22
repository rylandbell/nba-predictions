require("dotenv").config({ silent: true });
process.env.PWD = process.cwd();

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var bodyParser = require("body-parser");
var passport = require("passport");
var compression = require("compression");
var helmet = require("helmet");
var csp = require("express-csp-header");
var referrerPolicy = require("referrer-policy");

require("./app_api/models/db");
require("./app_api/config/passport");

var routes = require("./app_server/routes/index");
var routesApi = require("./app_api/routes/index");

var app = express();

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

// misc. middleware
app.use(referrerPolicy({ policy: "same-origin" }));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

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
app.use(express.static(process.env.PWD + "/public"));

app.use(passport.initialize());

// catch flash messages, then delete them (so they only appear on next view render)
app.use(function(req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

//routes
app.use("/api", routesApi);
app.use("/", routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

//output pretty HTML:
app.locals.pretty = true;

module.exports = app;

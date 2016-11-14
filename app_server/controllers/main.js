'use strict';

var request = require('request');
var moment = require('moment-timezone');
var _ = require('lodash');

var updateData = require('../../bin/updateDataFunction.js');

//don't run updateData more than once per minute:
var throttledUpdateData = _.throttle(updateData, 60000, { leading: true });

var apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://frozen-retreat-57000.herokuapp.com';
}

// generate error page in browser:
var _showError = function (req, res, apiResponse, err, body) {
  var title;
  var content;
  var message;

  if (apiResponse) {
    switch (apiResponse.statusCode){
      case 401:
        if (req.cookies && req.cookies.user) {

          //For logged-in user attempting to access unauthorized endpoints
          title = '401, Authorization Error';
          content = 'You are not authorized to access that page.';
        } else {

          //If user isn't logged in at all, load login page instead of error page
          res.redirect('/login');
        }

        break;
      case 404:
        title = '404, content not found';
        content = 'Sorry, we can\'t find your page. Maybe try again?';
        break;
      case 422:
        title = '422 Error';
        content = body.text;
        break;
      default:
        title = apiResponse.statusCode + ' error';
        if (apiResponse.body && apiResponse.body.errors) {
          content = 'Something\'s gone wrong with this request: \n\n' + apiResponse.body.errors[0].message;
        } else {
          content = 'Something\'s gone wrong with this request.';
        }
    }
  } else {
    if (err.code === 'ECONNREFUSED') {
      title = '503, Service Unavailable';
      content = 'Could not connect to the server. Please try again later.';
    } else {
      title = '500, Internal Service Error';
      content = 'Something\'s gone wrong with this request. Try again later.';
    }
  }

  res.render('generic-text', {
    message: message,
    title: title,
    content: content
  });
};

/* GET React app */
module.exports.reactApp = function (req, res, next) {
  throttledUpdateData();

  var prettyDate = moment(req.params.month).format('MMM YYYY');
  res.render('react-app', {
    title: 'My Picks: ' + prettyDate,
    month: req.params.month,
    loggedIn: true,
    error: req.query.err
  });
};

// var renderDashboard = function (req, res, responseBody) {

//   //get month names ('2016-10' format) from API results
//   var existingUserMonths = [];
//   responseBody.userMonthArray.forEach(userMonth => {
//     existingUserMonths.push(userMonth.month);
//   });
//   existingUserMonths.sort().reverse();

//   //check if current month already have userMonths; if not, send it to view to create links to add them
//   var addableUserMonths = [];
//   var currentMonth = moment().format('YYYY-MM');
//   if (!_.includes(existingUserMonths, currentMonth)) {
//     addableUserMonths.push(currentMonth);
//   }

//   //If it's at least the 27th of the month, check if next month already have userMonths; if not, send it to view to create links to add them
//   if(moment().format('D') > 26) {
//     var nextMonth = moment().add(1, 'months').format('YYYY-MM');
//     if (!_.includes(existingUserMonths, nextMonth)) {
//       addableUserMonths.push(nextMonth);
//     }
//   }

//   addableUserMonths.sort().reverse();

//   res.render('dashboard', {
//     title: 'Home',
//     existingUserMonths: existingUserMonths,
//     addableUserMonths: addableUserMonths,
//     loggedIn: true,
//     error: req.query.err,
//     moment: moment
//   });
// };

// /* GET dashboard page */
// module.exports.dashboard = function (req, res, next) {
//   throttledUpdateData();

//   var path = '/api/userMonth';
//   var requestOptions = {
//     url: apiOptions.server + path,
//     method: 'GET',
//     json: req.cookies,
//     qs: {}
//   };
//   request(requestOptions, function (err, apiResponse, body) {
//     if (apiResponse.statusCode === 200) {
//       renderDashboard(req, res, body);
//     } else {
//       _showError(req, res, apiResponse);
//     }
//   });
// };



// /* Temp reference page */
// module.exports.howToPlay = function (req, res, next) {
//   res.render('how-to-play', {
//     title: 'How to Play',
//     loggedIn: true,
//     error: req.query.err
//   });
// };

// //add new userMonth, then redirect user to it
// module.exports.newUserMonth = function (req, res, next) {
//   var path = '/api/userMonth';
//   var requestOptions = {
//     url: apiOptions.server + path,
//     method: 'POST',
//     json: {
//       token: req.cookies.token,
//       month: req.params.month
//     },
//     qs: {}
//   };
//   request(requestOptions, function (err, apiResponse, body) {
//     if (apiResponse.statusCode === 201) {
//       res.redirect('/month/' + req.params.month);
//     } else {
//       _showError(req, res, apiResponse);
//     }
//   });
// };

// GET login page
var renderLoginView = function (req, res, body) {
  var message;
  if (body && body.message) {
    message = body.message;
  }

  console.log('rendering with message: ', message);
  res
    .clearCookie('token')
    .render('login', {
      title: 'Login Page',
      loggedIn: false,
      message: message
    });
};

module.exports.login = function (req, res, next) {
  renderLoginView(req, res);
};

// POST credentials from login page
module.exports.submitCredentials = function (req, res, next) {
  var path = '/api/login';
  var requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: req.body,
    qs: {}
  };
  request(requestOptions, function (err, apiResponse, body) {
    var cookieOptions = {};
    cookieOptions.maxAge = 1000 * 3600 * 24 * 7;
    if (apiResponse.statusCode === 200) {
      res.cookie('token', apiResponse.body.token, cookieOptions);
      res.redirect('/app/');
    } else if (apiResponse.statusCode === 400 || apiResponse.statusCode === 401) {
      renderLoginView(req, res, apiResponse.body);
    } else {
      _showError(req, res, apiResponse);
    }
  });
};

module.exports.registerNew = function (req, res, next) {
  console.log('registerNew called');
  var path = '/api/register';
  var requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: req.body,
    qs: {}
  };
  request(requestOptions, function (err, apiResponse, body) {
    var cookieOptions = {};
    cookieOptions.maxAge = 1000 * 3600 * 24;
    if (apiResponse.statusCode === 200) {
      res.cookie('token', apiResponse.body.token, cookieOptions);
      res.redirect('/app/');
    } else if (apiResponse.statusCode === 400 || apiResponse.statusCode === 401) {
      console.log('failed registration: ', body.message);
      renderLoginView(req, res, apiResponse.body);
      return;
    } else {
      _showError(req, res, apiResponse);
    }
  });
};

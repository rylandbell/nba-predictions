var express = require('express');
var router = express.Router();
// var jwt = require('express-jwt');
// var auth = jwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: 'payload',
//   getToken: function (req) {
//     if (req.body.token) {
//       return req.body.token;
//     } else {
//       console.log('Couldn\'t find a cookie token');
//       return null;
//     }
//   }
// });

var ctrlUserMonths = require('../controllers/user-months');
// var ctrlAuth = require('../controllers/authentication');

// routes for calls to userMonths folder:
// router.get('/userMonths', ctrlUserMonths.userMonthsList);
router.get('/userMonths/:userMonthId', ctrlUserMonths.userMonthsReadOne);
router.post('/userMonths', ctrlUserMonths.userMonthsCreate);
// router.put('/userMonths/:userMonthId', ctrlUserMonths.userMonthsUpdateOne);
// router.delete('/userMonths', ctrlUserMonths.userMonthsDeleteCompleted);

// router.delete('/userMonths/:userMonthid', auth, ctrlUserMonths.userMonthsDeleteOne);

// routes for authentication requests:
// router.post('/register', ctrlAuth.register);
// router.post('/login', ctrlAuth.login);

module.exports = router;
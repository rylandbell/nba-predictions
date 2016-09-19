var mongoose = require('mongoose');
var userMonthModel = mongoose.model('UserMonth');

//helper function for composing responses as status codes (e.g. 404) with JSON files
var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//helper function for getting author data from JWT
// var getOwnerData = function (req, res, callback) {
//   console.log('Finding author with database ID ' + req.payload._id);
//   if (req.payload._id) {
//     userModel
//       .findOne({ _id: req.payload._id })
//       .exec(function (err, user) {
//         if (!user) {
//           sendJsonResponse(res, 404, {
//             message: 'User not found'
//           });
//           return;
//         } else if (err) {
//           console.log(err);
//           sendJsonResponse(res, 404, err);
//           return;
//         }

//         console.log(user);
//         callback(req, res, user);
//       });

//   } else {
//     sendJsonResponse(res, 404, {
//       message: 'User not found'
//     });
//     return;
//   }

// };

//Response functions for CRUD operations on tasks

/* GET list of tasks (optionally filters completed tasks) */
// module.exports.tasksList = function (req, res) {
//   getOwnerData(req, res, function (req, res, owner) {
//     var responseBody = {};

//     //query.show_completed is 0 or 1 as a string, so convert to Boolean:
//     var completedBool = Boolean(parseInt(req.query.show_completed));

//     //Unless told to show completed tasks, only return items with a completed value of false:
//     var filter = { ownerId: owner._id };
//     if (!completedBool) {
//       filter.completed = false;
//     }

//     taskModel
//       .find(filter)
//       .exec(function (err, tasks) {
//         if (err) {
//           console.log(err);
//           sendJsonResponse(res, 404, err);
//           return;
//         }

//         responseBody.tasks = tasks;
//         responseBody.owner = owner;
//         sendJsonResponse(res, 200, responseBody);
//       });
//   });
// };

/* GET one task by userMonthId */
module.exports.userMonthsReadOne = function (req, res) {
  if (req.params && req.params.userMonthId) {
    userMonthModel
      .findById(req.params.userMonthId)
      .exec(function (err, task) {
        var responseBody = {};
        if (!task) {
          sendJsonResponse(res, 404, {
            message: 'userMonthId not found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }

        responseBody.task = task;
        sendJsonResponse(res, 200, responseBody);
      });
  } else {
    console.log('No userMonthId specified');
    sendJsonResponse(res, 404, {
      message: 'No userMonthId in request'
    });
  }
};

/* POST a new userMonth */
module.exports.userMonthsCreate = function (req, res) {
  userMonthModel.create({
    month: req.body.month,
    eligibleTeams: {},
    predictedWinners: {}
  }, function (err, userMonth) {
    if (err) {
      console.log(err);
      sendJsonResponse(res, 400, err);
    } else {
      console.log(userMonth);
      sendJsonResponse(res, 201, userMonth);
    }
  });
};

// PUT update one task
// module.exports.tasksUpdateOne = function (req, res) {
//   getOwnerData(req, res, function (req, res, owner) {
//     if (!req.params.taskid) {
//       sendJsonResponse(res, 404, {
//         message: 'Not found, taskid is required'
//       });
//       return;
//     }

//     taskModel
//       .findById(req.params.taskid)
//       .exec(
//         function (err, task) {
//           if (!task) {
//             sendJsonResponse(res, 404, {
//               message: 'taskid not found'
//             });
//             return;
//           } else if (err) {
//             sendJsonResponse(res, 400, err);
//             return;
//           }

//           if (!task.ownerId || task.ownerId !== owner._id.toString()) {
//             console.log('Wrong owner!');
//             sendJsonResponse(res, 401, {
//               message: 'User not authorized to perform that action'
//             });
//             return;
//           }

//           for (var key in req.body) {
//             if (req.body.hasOwnProperty(key)) {
//               task[key] = req.body[key];
//             }
//           }

//           task.save(function (err, task) {
//             if (err) {
//               sendJsonResponse(res, 400, err);
//             } else {
//               sendJsonResponse(res, 200, task);
//             }
//           });
//         }
//     );
//   });
// };


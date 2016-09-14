(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _singleGame = require('./single-game.jsx');

var _singleGame2 = _interopRequireDefault(_singleGame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api(_ref) {
  var reduxState = _ref.reduxState;
  return _react2.default.createElement(
    'div',
    { className: 'row' },
    reduxState.map(function (gameData, index) {
      return _react2.default.createElement(_singleGame2.default, { gameData: gameData, key: index });
    })
  );
};

exports.default = api;

},{"./single-game.jsx":5,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api(_ref) {
  var statusData = _ref.statusData;

  var scoreString;
  var progressString;

  //set scoreString to game score or start time
  if (statusData.hasStarted) {
    scoreString = statusData.roadScore + ' - ' + statusData.homeScore;
  } else {
    scoreString = statusData.startTime;
  }

  // set progressString to Final or In Progress (maybe eventually better precision than In Progress)
  if (statusData.hasStarted) {
    if (statusData.isFinal) {
      progressString = 'Final';
    } else {
      progressString = 'In Progress';
    }
  }

  return _react2.default.createElement(
    'div',
    { className: 'game-item game-status' },
    _react2.default.createElement(
      'h5',
      { className: 'game-status-score' },
      scoreString
    ),
    _react2.default.createElement(
      'small',
      { className: 'game-status-progress' },
      progressString
    )
  );
};

exports.default = api;

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _teamMessage = require('./team-message.jsx');

var _teamMessage2 = _interopRequireDefault(_teamMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api(_ref) {
  var teamData = _ref.teamData;
  return _react2.default.createElement(
    'div',
    { className: "game-item game-team " + (teamData.isEligible ? "eligible-team" : "ineligible-team") },
    _react2.default.createElement(
      'h4',
      null,
      teamData.teamName
    ),
    teamData.isChosen ? _react2.default.createElement(_teamMessage2.default, { teamData: teamData }) : ''
  );
};

exports.default = api;

},{"./team-message.jsx":6,"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gameTeam = require('./game-team.jsx');

var _gameTeam2 = _interopRequireDefault(_gameTeam);

var _gameStatus = require('./game-status.jsx');

var _gameStatus2 = _interopRequireDefault(_gameStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api(_ref) {
  var gameData = _ref.gameData;

  var panelType = 'panel-default';
  if (gameData.roadTeam.isChosen || gameData.homeTeam.isChosen) {
    panelType = 'panel-primary';
  }
  if (gameData.roadTeam.isWinner || gameData.homeTeam.isWinner) {
    panelType = 'panel-success';
  }
  if (gameData.roadTeam.isLoser || gameData.homeTeam.isLoser) {
    panelType = 'panel-danger';
  }

  return _react2.default.createElement(
    'div',
    { className: 'col-xs-12 col-sm-6 col-md-4' },
    _react2.default.createElement(
      'div',
      { className: "panel " + panelType },
      _react2.default.createElement(
        'div',
        { className: 'panel-body' },
        _react2.default.createElement(
          'div',
          { className: "game-container " + (gameData.gameStatus.hasStarted ? "" : "game-not-started") },
          _react2.default.createElement(_gameTeam2.default, { teamData: gameData.roadTeam }),
          _react2.default.createElement(_gameStatus2.default, { statusData: gameData.gameStatus }),
          _react2.default.createElement(_gameTeam2.default, { teamData: gameData.homeTeam })
        )
      )
    )
  );
};

exports.default = api;

},{"./game-status.jsx":3,"./game-team.jsx":4,"react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api(_ref) {
  var teamData = _ref.teamData;

  var message;
  var statusClass;

  if (teamData.isWinner) {
    message = "Win!";
    statusClass = "text-success";
  } else if (teamData.isLoser) {
    message = "Loss!";
    statusClass = "text-danger";
  } else {
    message = "Selected";
    statusClass = "text-primary";
  }

  return _react2.default.createElement(
    'div',
    { className: statusClass },
    message
  );
};

exports.default = api;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

var fudge = [{
  roadTeam: {
    teamName: 'POR',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'UTA',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: false,
    homeScore: null,
    roadScore: null,
    isFinal: false
  }
}, {
  roadTeam: {
    teamName: 'LAC',
    isEligible: false,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'DAL',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: false,
    homeScore: null,
    roadScore: null,
    isFinal: false
  }
}, {
  roadTeam: {
    teamName: 'HOU',
    isEligible: true,
    isChosen: true,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'LAL',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: false,
    homeScore: null,
    roadScore: null,
    isFinal: false
  }
}, {
  roadTeam: {
    teamName: 'DEN',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'SAN',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 9,
    roadScore: 22,
    isFinal: false
  }
}, {
  roadTeam: {
    teamName: 'CHI',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'MI',
    isEligible: true,
    isChosen: true,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 60,
    roadScore: 47,
    isFinal: false
  }
}, {
  roadTeam: {
    teamName: 'BKN',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'BOS',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 90,
    roadScore: 97,
    isFinal: true
  }
}, {
  roadTeam: {
    teamName: 'NYK',
    isEligible: true,
    isChosen: true,
    isWinner: true,
    isLoser: false
  },
  homeTeam: {
    teamName: 'MIN',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 90,
    roadScore: 97,
    isFinal: true
  }
}, {
  roadTeam: {
    teamName: 'MIL',
    isEligible: true,
    isChosen: true,
    isWinner: false,
    isLoser: true
  },
  homeTeam: {
    teamName: 'DET',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 84,
    roadScore: 79,
    isFinal: true
  }
}];

module.exports = fudge;

},{}],8:[function(require,module,exports){
'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch

require('babel-polyfill');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var Redux = _interopRequireWildcard(_redux);

var _reducers = require('./reducers.jsx');

var _reducers2 = _interopRequireDefault(_reducers);

var _gameList = require('./components/game-list.jsx');

var _gameList2 = _interopRequireDefault(_gameList);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = Redux.createStore(_reducers2.default.gameList, Redux.applyMiddleware(_reduxThunk2.default));
store.subscribe(render);
render();

function render() {
  _reactDom2.default.render(_react2.default.createElement(_gameList2.default, { reduxState: store.getState() }), document.getElementById('app-root'));
}

render();

// GameList
//   SingleGame
//     GameTeam (road team)
//       TeamMessage
//     GameStatus
//     GameTeam (home team)
//       TeamMessage

},{"./components/game-list.jsx":2,"./reducers.jsx":9,"babel-polyfill":"babel-polyfill","react":"react","react-dom":"react-dom","react-redux":"react-redux","redux":"redux","redux-thunk":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

var fudge = require('./fudge.js');

var homeTeam = function homeTeam(state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

var roadTeam = function roadTeam(state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

var gameStatus = function gameStatus(state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

var singleGame = Redux.combineReducers({
  homeTeam: homeTeam,
  roadTeam: roadTeam,
  gameStatus: gameStatus
});

var gameList = function gameList() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? fudge : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  }
};

var api = {
  gameList: gameList
};

exports.default = api;

},{"./fudge.js":7,"redux":"redux","redux-thunk":1}]},{},[8]);

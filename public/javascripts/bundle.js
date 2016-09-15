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
var api = {
  addPrediction: function addPrediction(gameId, winner) {
    return {
      type: 'ADD_PREDICTION',
      gameId: gameId,
      winner: winner
    };
  },
  removePrediction: function removePrediction(gameId) {
    return {
      type: 'REMOVE_PREDICTION',
      gameId: gameId
    };
  },
  dayForward: function dayForward() {
    return {
      type: 'DAY_FORWARD'
    };
  },
  dayBack: function dayBack() {
    return {
      type: 'DAY_BACK'
    };
  }
};

exports.default = api;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api(_ref) {
  var reduxState = _ref.reduxState;
  var dayForward = _ref.dayForward;
  var dayBack = _ref.dayBack;
  return _react2.default.createElement(
    'div',
    { className: 'row' },
    _react2.default.createElement(
      'div',
      { className: 'day-picker-container' },
      _react2.default.createElement('span', { onClick: dayBack, className: 'day-picker-item glyphicon glyphicon-menu-left' }),
      _react2.default.createElement(
        'div',
        { className: 'day-picker-item date-display' },
        _react2.default.createElement(
          'h3',
          null,
          moment(reduxState.selectedDate).format('MMMM Do, YYYY')
        )
      ),
      _react2.default.createElement('span', { onClick: dayForward, className: 'day-picker-item glyphicon glyphicon-menu-right' })
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

},{"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _teamMessage = require('./team-message.jsx');

var _teamMessage2 = _interopRequireDefault(_teamMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _react2.default.createClass({
  displayName: 'api',

  handleClick: function handleClick() {
    var homeVsRoad = this.props.homeVsRoad;
    var teamData = this.props.gameData[homeVsRoad];
    if (teamData.isEligible && !this.props.gameData.gameStatus.hasStarted) {
      if (teamData.isChosen) {
        this.props.removePrediction(this.props.gameData.gameId, this.props.homeVsRoad);
      } else {
        this.props.addPrediction(this.props.gameData.gameId, this.props.homeVsRoad);
      }
    }
  },
  render: function render() {
    var homeVsRoad = this.props.homeVsRoad;
    var teamData = this.props.gameData[homeVsRoad];
    return _react2.default.createElement(
      'div',
      { className: 'game-item game-team', onClick: this.handleClick },
      _react2.default.createElement(
        'div',
        { className: 'team-container' },
        _react2.default.createElement(
          'div',
          { className: "team-item team-name " + (teamData.isEligible ? "eligible-team" : "ineligible-team") },
          _react2.default.createElement(
            'h4',
            null,
            teamData.teamName
          )
        ),
        teamData.isChosen ? _react2.default.createElement(_teamMessage2.default, { teamData: teamData }) : ''
      )
    );
  }
});

exports.default = api;

},{"./team-message.jsx":9,"react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _singleDayGameList = require('./single-day-game-list.jsx');

var _singleDayGameList2 = _interopRequireDefault(_singleDayGameList);

var _dayPicker = require('./day-picker.jsx');

var _dayPicker2 = _interopRequireDefault(_dayPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api(_ref) {
  var reduxState = _ref.reduxState;
  var addPrediction = _ref.addPrediction;
  var removePrediction = _ref.removePrediction;
  var dayForward = _ref.dayForward;
  var dayBack = _ref.dayBack;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_dayPicker2.default, { reduxState: reduxState, dayForward: dayForward, dayBack: dayBack }),
    _react2.default.createElement(_singleDayGameList2.default, { reduxState: reduxState, addPrediction: addPrediction, removePrediction: removePrediction })
  );
};

exports.default = api;

},{"./day-picker.jsx":3,"./single-day-game-list.jsx":7,"react":"react"}],7:[function(require,module,exports){
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
  var addPrediction = _ref.addPrediction;
  var removePrediction = _ref.removePrediction;


  //subtract 1 to go from day-of-month to zero-indexed array position:
  var dayKey = moment(reduxState.selectedDate).format('D') - 1;
  return _react2.default.createElement(
    'div',
    { className: 'row' },
    reduxState.gamesByDay[dayKey].map(function (gameData, index) {
      return _react2.default.createElement(_singleGame2.default, { gameData: gameData, addPrediction: addPrediction, removePrediction: removePrediction, key: index });
    })
  );
};

exports.default = api;

},{"./single-game.jsx":8,"react":"react"}],8:[function(require,module,exports){
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
  var addPrediction = _ref.addPrediction;
  var removePrediction = _ref.removePrediction;

  var panelType = 'panel-default';
  if (gameData.roadTeam.isChosen || gameData.homeTeam.isChosen) {
    panelType = 'panel-primary';
  }
  if (gameData.roadTeam.isWinner && gameData.roadTeam.isChosen || gameData.homeTeam.isWinner && gameData.homeTeam.isChosen) {
    panelType = 'panel-success';
  }
  if (gameData.roadTeam.isLoser && gameData.roadTeam.isChosen || gameData.homeTeam.isLoser && gameData.homeTeam.isChosen) {
    panelType = 'panel-danger';
  }

  return _react2.default.createElement(
    'div',
    { className: 'col-xs-12 col-sm-6 col-md-4' },
    _react2.default.createElement(
      'div',
      { className: "panel game-panel " + panelType },
      _react2.default.createElement(
        'div',
        { className: 'panel-body' },
        _react2.default.createElement(
          'div',
          { className: "game-container " + (gameData.gameStatus.hasStarted ? "" : "game-not-started") },
          _react2.default.createElement(_gameTeam2.default, { gameData: gameData, homeVsRoad: 'roadTeam', addPrediction: addPrediction, removePrediction: removePrediction }),
          _react2.default.createElement(_gameStatus2.default, { statusData: gameData.gameStatus }),
          _react2.default.createElement(_gameTeam2.default, { gameData: gameData, homeVsRoad: 'homeTeam', addPrediction: addPrediction, removePrediction: removePrediction })
        )
      )
    )
  );
};

exports.default = api;

},{"./game-status.jsx":4,"./game-team.jsx":5,"react":"react"}],9:[function(require,module,exports){
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
    { className: 'team-item ' + statusClass },
    message
  );
};

exports.default = api;

},{"react":"react"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"12/09/2015","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2015-12-09T00:00:00",1,"0021500319",3,"Final","20151209/CHIBOS",1610612738,1610612741,"2015",4,"     ","ESPN","Q4       - ESPN",1],["2015-12-09T00:00:00",2,"0021500320",3,"Final","20151209/MIACHA",1610612766,1610612748,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",3,"0021500321",3,"Final","20151209/HOUWAS",1610612764,1610612745,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",4,"0021500322",3,"Final","20151209/MEMDET",1610612765,1610612763,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",5,"0021500323",3,"Final","20151209/SASTOR",1610612761,1610612759,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",6,"0021500324",3,"Final","20151209/LACMIL",1610612749,1610612746,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",7,"0021500325",3,"Final","20151209/LALMIN",1610612750,1610612747,"2015",5,"     ",null,"Q5       - ",1],["2015-12-09T00:00:00",8,"0021500326",3,"Final","20151209/ORLPHX",1610612756,1610612753,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",9,"0021500327",3,"Final","20151209/NYKUTA",1610612762,1610612752,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",10,"0021500328",3,"Final","20151209/ATLDAL",1610612742,1610612737,"2015",4,"     ","ESPN","Q4       - ESPN",1]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2015-12-09T00:00:00",1,"0021500319",1610612741,"CHI","Chicago","11-8",24,30,21,25,0,0,0,0,0,0,0,0,0,0,100,0.429,0.696,0.286,22,50,16],["2015-12-09T00:00:00",1,"0021500319",1610612738,"BOS","Boston","13-9",24,27,24,30,0,0,0,0,0,0,0,0,0,0,105,0.413,0.857,0.217,22,45,12],["2015-12-09T00:00:00",2,"0021500320",1610612748,"MIA","Miami","12-8",17,19,18,27,0,0,0,0,0,0,0,0,0,0,81,0.387,0.708,0.286,17,43,17],["2015-12-09T00:00:00",2,"0021500320",1610612766,"CHA","Charlotte","13-8",27,29,24,19,0,0,0,0,0,0,0,0,0,0,99,0.494,0.471,0.407,27,40,10],["2015-12-09T00:00:00",3,"0021500321",1610612745,"HOU","Houston","11-12",30,26,26,27,0,0,0,0,0,0,0,0,0,0,109,0.482,0.680,0.364,23,42,19],["2015-12-09T00:00:00",3,"0021500321",1610612764,"WAS","Washington","9-11",17,30,36,20,0,0,0,0,0,0,0,0,0,0,103,0.438,0.833,0.200,20,47,18],["2015-12-09T00:00:00",4,"0021500322",1610612763,"MEM","Memphis","13-10",24,19,24,26,0,0,0,0,0,0,0,0,0,0,93,0.466,0.538,0.267,23,53,17],["2015-12-09T00:00:00",4,"0021500322",1610612765,"DET","Detroit","12-11",17,30,27,18,0,0,0,0,0,0,0,0,0,0,92,0.425,0.667,0.276,17,43,12],["2015-12-09T00:00:00",5,"0021500323",1610612759,"SAS","San Antonio","18-5",21,25,16,32,0,0,0,0,0,0,0,0,0,0,94,0.447,0.792,0.280,23,35,17],["2015-12-09T00:00:00",5,"0021500323",1610612761,"TOR","Toronto","14-9",27,26,20,24,0,0,0,0,0,0,0,0,0,0,97,0.578,0.909,0.300,23,34,20],["2015-12-09T00:00:00",6,"0021500324",1610612746,"LAC","LA","13-9",25,22,28,34,0,0,0,0,0,0,0,0,0,0,109,0.469,0.583,0.429,27,51,14],["2015-12-09T00:00:00",6,"0021500324",1610612749,"MIL","Milwaukee","9-14",26,22,20,27,0,0,0,0,0,0,0,0,0,0,95,0.467,0.750,0.200,26,40,11],["2015-12-09T00:00:00",7,"0021500325",1610612747,"LAL","Los Angeles","3-19",32,25,24,33,8,0,0,0,0,0,0,0,0,0,122,0.516,0.630,0.391,19,40,9],["2015-12-09T00:00:00",7,"0021500325",1610612750,"MIN","Minnesota","9-12",35,24,25,30,9,0,0,0,0,0,0,0,0,0,123,0.495,0.774,0.368,30,47,14],["2015-12-09T00:00:00",8,"0021500326",1610612753,"ORL","Orlando","12-10",24,23,26,31,0,0,0,0,0,0,0,0,0,0,104,0.471,0.750,0.480,28,32,16],["2015-12-09T00:00:00",8,"0021500326",1610612756,"PHX","Phoenix","10-13",21,28,35,23,0,0,0,0,0,0,0,0,0,0,107,0.513,0.704,0.250,23,44,18],["2015-12-09T00:00:00",9,"0021500327",1610612752,"NYK","New York","10-13",11,24,24,26,0,0,0,0,0,0,0,0,0,0,85,0.397,0.556,0.381,20,36,10],["2015-12-09T00:00:00",9,"0021500327",1610612762,"UTA","Utah","10-10",29,31,22,24,0,0,0,0,0,0,0,0,0,0,106,0.488,0.826,0.429,26,51,14],["2015-12-09T00:00:00",10,"0021500328",1610612737,"ATL","Atlanta","14-9",22,27,27,22,0,0,0,0,0,0,0,0,0,0,98,0.481,0.778,0.300,26,47,14],["2015-12-09T00:00:00",10,"0021500328",1610612742,"DAL","Dallas","13-10",23,21,28,23,0,0,0,0,0,0,0,0,0,0,95,0.360,0.842,0.226,18,51,9]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[["0021500326",1610612756,1610612753,"2015-12-09T00:00:00",2,0,"Phoenix"],["0021500325",1610612750,1610612747,"2015-12-09T00:00:00",2,1,"Minnesota"],["0021500323",1610612761,1610612759,"2015-12-09T00:00:00",1,1,"Tied"],["0021500327",1610612762,1610612752,"2015-12-09T00:00:00",1,1,"Tied"],["0021500321",1610612764,1610612745,"2015-12-09T00:00:00",1,1,"Tied"],["0021500320",1610612766,1610612748,"2015-12-09T00:00:00",2,2,"Tied"],["0021500322",1610612765,1610612763,"2015-12-09T00:00:00",0,2,"Memphis"],["0021500324",1610612749,1610612746,"2015-12-09T00:00:00",0,2,"LA Clippers"],["0021500319",1610612738,1610612741,"2015-12-09T00:00:00",2,1,"Boston"],["0021500328",1610612742,1610612737,"2015-12-09T00:00:00",0,2,"Atlanta"]]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021500319","0021400591","2015-01-16T00:00:00",1610612738,"Boston","Celtics","BOS",103,1610612741,"Chicago","Bulls","CHI",119],["0021500320","0021500008","2015-10-28T00:00:00",1610612766,"Charlotte","Hornets","CHA",94,1610612748,"Miami","Heat","MIA",104],["0021500321","0021401097","2015-03-29T00:00:00",1610612764,"Washington","Wizards","WAS",91,1610612745,"Houston","Rockets","HOU",99],["0021500322","0021401000","2015-03-17T00:00:00",1610612765,"Detroit","Pistons","DET",105,1610612763,"Memphis","Grizzlies","MEM",95],["0021500323","0021400949","2015-03-10T00:00:00",1610612761,"Toronto","Raptors","TOR",107,1610612759,"San Antonio","Spurs","SAS",117],["0021500324","0021400399","2014-12-20T00:00:00",1610612749,"Milwaukee","Bucks","MIL",102,1610612746,"LA","Clippers","LAC",106],["0021500325","0021500017","2015-10-28T00:00:00",1610612750,"Minnesota","Timberwolves","MIN",112,1610612747,"Los Angeles","Lakers","LAL",111],["0021500326","0021400897","2015-03-04T00:00:00",1610612756,"Phoenix","Suns","PHX",105,1610612753,"Orlando","Magic","ORL",100],["0021500327","0021400950","2015-03-10T00:00:00",1610612762,"Utah","Jazz","UTA",87,1610612752,"New York","Knicks","NYK",82],["0021500328","0011500068","2015-10-16T00:00:00",1610612742,"Dallas","Mavericks","DAL",84,1610612737,"Atlanta","Hawks","ATL",91]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612739,"00","22015","12/09/2015","East","Cleveland",21,14,7,0.667,"10-1","4-6"],[1610612766,"00","22015","12/09/2015","East","Charlotte",21,13,8,0.619,"10-3","3-5"],[1610612737,"00","22015","12/09/2015","East","Atlanta",23,14,9,0.609,"8-4","6-5"],[1610612761,"00","22015","12/09/2015","East","Toronto",23,14,9,0.609,"6-4","8-5"],[1610612754,"00","22015","12/09/2015","East","Indiana",20,12,8,0.6,"6-3","6-5"],[1610612748,"00","22015","12/09/2015","East","Miami",20,12,8,0.6,"10-4","2-4"],[1610612738,"00","22015","12/09/2015","East","Boston",22,13,9,0.591,"7-4","6-5"],[1610612741,"00","22015","12/09/2015","East","Chicago",19,11,8,0.579,"7-3","4-5"],[1610612753,"00","22015","12/09/2015","East","Orlando",22,12,10,0.545,"7-3","5-7"],[1610612765,"00","22015","12/09/2015","East","Detroit",23,12,11,0.522,"8-3","4-8"],[1610612764,"00","22015","12/09/2015","East","Washington",20,9,11,0.45,"4-7","5-4"],[1610612752,"00","22015","12/09/2015","East","New York",23,10,13,0.435,"5-7","5-6"],[1610612749,"00","22015","12/09/2015","East","Milwaukee",23,9,14,0.391,"7-5","2-9"],[1610612751,"00","22015","12/09/2015","East","Brooklyn",21,6,15,0.286,"5-4","1-11"],[1610612755,"00","22015","12/09/2015","East","Philadelphia",22,1,21,0.045,"1-9","0-12"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612744,"00","22015","12/09/2015","West","Golden State",23,23,0,1.0,"10-0","13-0"],[1610612759,"00","22015","12/09/2015","West","San Antonio",23,18,5,0.783,"11-0","7-5"],[1610612760,"00","22015","12/09/2015","West","Oklahoma City",21,13,8,0.619,"9-3","4-5"],[1610612746,"00","22015","12/09/2015","West","LA Clippers",22,13,9,0.591,"9-5","4-4"],[1610612742,"00","22015","12/09/2015","West","Dallas",23,13,10,0.565,"5-4","8-6"],[1610612763,"00","22015","12/09/2015","West","Memphis",23,13,10,0.565,"7-5","6-5"],[1610612762,"00","22015","12/09/2015","West","Utah",20,10,10,0.5,"5-4","5-6"],[1610612745,"00","22015","12/09/2015","West","Houston",23,11,12,0.478,"6-7","5-5"],[1610612756,"00","22015","12/09/2015","West","Phoenix",23,10,13,0.435,"6-5","4-8"],[1610612750,"00","22015","12/09/2015","West","Minnesota",21,9,12,0.429,"3-9","6-3"],[1610612757,"00","22015","12/09/2015","West","Portland",23,9,14,0.391,"5-5","4-9"],[1610612743,"00","22015","12/09/2015","West","Denver",22,8,14,0.364,"3-7","5-7"],[1610612758,"00","22015","12/09/2015","West","Sacramento",23,8,15,0.348,"6-7","2-8"],[1610612740,"00","22015","12/09/2015","West","New Orleans",21,5,16,0.238,"4-6","1-10"],[1610612747,"00","22015","12/09/2015","West","L.A. Lakers",22,3,19,0.136,"1-6","2-13"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021500319",1],["0021500320",1],["0021500323",1],["0021500321",1],["0021500322",1],["0021500325",1],["0021500324",1],["0021500327",1],["0021500326",1],["0021500328",1]]}]}';

exports.default = api;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"12/10/2015","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2015-12-10T00:00:00",1,"0021500329",3,"Final","20151210/PHIBKN",1610612751,1610612755,"2015",4,"     ",null,"Q4       - ",1],["2015-12-10T00:00:00",2,"0021500330",3,"Final","20151210/LACCHI",1610612741,1610612746,"2015",4,"     ","TNT","Q4       - TNT",1],["2015-12-10T00:00:00",3,"0021500331",3,"Final","20151210/ATLOKC",1610612760,1610612737,"2015",4,"     ",null,"Q4       - ",1],["2015-12-10T00:00:00",4,"0021500332",3,"Final","20151210/NYKSAC",1610612758,1610612752,"2015",4,"     ","TNT","Q4       - TNT",1]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2015-12-10T00:00:00",1,"0021500329",1610612755,"PHI","Philadelphia","1-22",13,31,30,17,0,0,0,0,0,0,0,0,0,0,91,0.391,0.864,0.129,17,38,10],["2015-12-10T00:00:00",1,"0021500329",1610612751,"BKN","Brooklyn","7-15",24,28,18,30,0,0,0,0,0,0,0,0,0,0,100,0.500,0.741,0.429,22,43,19],["2015-12-10T00:00:00",2,"0021500330",1610612746,"LAC","LA","13-10",24,11,19,26,0,0,0,0,0,0,0,0,0,0,80,0.341,0.833,0.455,22,52,13],["2015-12-10T00:00:00",2,"0021500330",1610612741,"CHI","Chicago","12-8",23,21,20,19,0,0,0,0,0,0,0,0,0,0,83,0.356,0.875,0.304,20,54,11],["2015-12-10T00:00:00",3,"0021500331",1610612737,"ATL","Atlanta","14-10",28,21,26,19,0,0,0,0,0,0,0,0,0,0,94,0.449,0.609,0.357,21,34,9],["2015-12-10T00:00:00",3,"0021500331",1610612760,"OKC","Oklahoma City","14-8",35,25,23,24,0,0,0,0,0,0,0,0,0,0,107,0.488,0.769,0.529,24,52,14],["2015-12-10T00:00:00",4,"0021500332",1610612752,"NYK","New York","10-14",16,23,26,32,0,0,0,0,0,0,0,0,0,0,97,0.398,0.786,0.310,17,54,18],["2015-12-10T00:00:00",4,"0021500332",1610612758,"SAC","Sacramento","9-15",24,22,30,23,0,0,0,0,0,0,0,0,0,0,99,0.452,0.750,0.188,24,44,12]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[["0021500331",1610612760,1610612737,"2015-12-10T00:00:00",1,1,"Tied"],["0021500332",1610612758,1610612752,"2015-12-10T00:00:00",2,0,"Sacramento"],["0021500329",1610612751,1610612755,"2015-12-10T00:00:00",2,2,"Tied"],["0021500330",1610612741,1610612746,"2015-12-10T00:00:00",1,1,"Tied"]]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021500329","0011500075","2015-10-18T00:00:00",1610612751,"Brooklyn","Nets","BKN",92,1610612755,"Philadelphia","76ers","PHI",91],["0021500330","0021400877","2015-03-01T00:00:00",1610612741,"Chicago","Bulls","CHI",86,1610612746,"LA","Clippers","LAC",96],["0021500331","0021500256","2015-11-30T00:00:00",1610612760,"Oklahoma City","Thunder","OKC",100,1610612737,"Atlanta","Hawks","ATL",106],["0021500332","0021400669","2015-03-03T00:00:00",1610612758,"Sacramento","Kings","SAC",124,1610612752,"New York","Knicks","NYK",86]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612739,"00","22015","12/10/2015","East","Cleveland",21,14,7,0.667,"10-1","4-6"],[1610612766,"00","22015","12/10/2015","East","Charlotte",21,13,8,0.619,"10-3","3-5"],[1610612761,"00","22015","12/10/2015","East","Toronto",23,14,9,0.609,"6-4","8-5"],[1610612741,"00","22015","12/10/2015","East","Chicago",20,12,8,0.6,"8-3","4-5"],[1610612754,"00","22015","12/10/2015","East","Indiana",20,12,8,0.6,"6-3","6-5"],[1610612748,"00","22015","12/10/2015","East","Miami",20,12,8,0.6,"10-4","2-4"],[1610612738,"00","22015","12/10/2015","East","Boston",22,13,9,0.591,"7-4","6-5"],[1610612737,"00","22015","12/10/2015","East","Atlanta",24,14,10,0.583,"8-4","6-6"],[1610612753,"00","22015","12/10/2015","East","Orlando",22,12,10,0.545,"7-3","5-7"],[1610612765,"00","22015","12/10/2015","East","Detroit",23,12,11,0.522,"8-3","4-8"],[1610612764,"00","22015","12/10/2015","East","Washington",20,9,11,0.45,"4-7","5-4"],[1610612752,"00","22015","12/10/2015","East","New York",24,10,14,0.417,"5-7","5-7"],[1610612749,"00","22015","12/10/2015","East","Milwaukee",23,9,14,0.391,"7-5","2-9"],[1610612751,"00","22015","12/10/2015","East","Brooklyn",22,7,15,0.318,"6-4","1-11"],[1610612755,"00","22015","12/10/2015","East","Philadelphia",23,1,22,0.043,"1-9","0-13"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612744,"00","22015","12/10/2015","West","Golden State",23,23,0,1.0,"10-0","13-0"],[1610612759,"00","22015","12/10/2015","West","San Antonio",23,18,5,0.783,"11-0","7-5"],[1610612760,"00","22015","12/10/2015","West","Oklahoma City",22,14,8,0.636,"10-3","4-5"],[1610612742,"00","22015","12/10/2015","West","Dallas",23,13,10,0.565,"5-4","8-6"],[1610612746,"00","22015","12/10/2015","West","LA Clippers",23,13,10,0.565,"9-5","4-5"],[1610612763,"00","22015","12/10/2015","West","Memphis",23,13,10,0.565,"7-5","6-5"],[1610612762,"00","22015","12/10/2015","West","Utah",20,10,10,0.5,"5-4","5-6"],[1610612745,"00","22015","12/10/2015","West","Houston",23,11,12,0.478,"6-7","5-5"],[1610612756,"00","22015","12/10/2015","West","Phoenix",23,10,13,0.435,"6-5","4-8"],[1610612750,"00","22015","12/10/2015","West","Minnesota",21,9,12,0.429,"3-9","6-3"],[1610612757,"00","22015","12/10/2015","West","Portland",23,9,14,0.391,"5-5","4-9"],[1610612758,"00","22015","12/10/2015","West","Sacramento",24,9,15,0.375,"7-7","2-8"],[1610612743,"00","22015","12/10/2015","West","Denver",22,8,14,0.364,"3-7","5-7"],[1610612740,"00","22015","12/10/2015","West","New Orleans",21,5,16,0.238,"4-6","1-10"],[1610612747,"00","22015","12/10/2015","West","L.A. Lakers",22,3,19,0.136,"1-6","2-13"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021500329",1],["0021500330",1],["0021500331",1],["0021500332",1]]}]}';

exports.default = api;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"12/11/2015","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2015-12-11T00:00:00",1,"0021500333",3,"Final","20151211/MIAIND",1610612754,1610612748,"2015",4,"     ","ESPN","Q4       - ESPN",1],["2015-12-11T00:00:00",2,"0021500334",3,"Final","20151211/CLEORL",1610612753,1610612739,"2015",4,"     ",null,"Q4       - ",1],["2015-12-11T00:00:00",3,"0021500335",3,"Final","20151211/DETPHI",1610612755,1610612765,"2015",4,"     ",null,"Q4       - ",1],["2015-12-11T00:00:00",4,"0021500336",3,"Final","20151211/GSWBOS",1610612738,1610612744,"2015",6,"     ",null,"Q6       - ",1],["2015-12-11T00:00:00",5,"0021500337",3,"Final","20151211/MILTOR",1610612761,1610612749,"2015",4,"     ",null,"Q4       - ",1],["2015-12-11T00:00:00",6,"0021500338",3,"Final","20151211/CHAMEM",1610612763,1610612766,"2015",4,"     ",null,"Q4       - ",1],["2015-12-11T00:00:00",7,"0021500339",3,"Final","20151211/WASNOP",1610612740,1610612764,"2015",4,"     ",null,"Q4       - ",1],["2015-12-11T00:00:00",8,"0021500340",3,"Final","20151211/MINDEN",1610612743,1610612750,"2015",5,"     ",null,"Q5       - ",1],["2015-12-11T00:00:00",9,"0021500341",3,"Final","20151211/OKCUTA",1610612762,1610612760,"2015",4,"     ",null,"Q4       - ",1],["2015-12-11T00:00:00",10,"0021500342",3,"Final","20151211/LALSAS",1610612759,1610612747,"2015",4,"     ","ESPN","Q4       - ESPN",1],["2015-12-11T00:00:00",11,"0021500343",3,"Final","20151211/PORPHX",1610612756,1610612757,"2015",4,"     ",null,"Q4       - ",1]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2015-12-11T00:00:00",1,"0021500333",1610612748,"MIA","Miami","12-9",21,27,20,15,0,0,0,0,0,0,0,0,0,0,83,0.432,0.615,0.250,14,45,19],["2015-12-11T00:00:00",1,"0021500333",1610612754,"IND","Indiana","13-8",20,27,30,19,0,0,0,0,0,0,0,0,0,0,96,0.419,0.900,0.214,22,45,12],["2015-12-11T00:00:00",2,"0021500334",1610612739,"CLE","Cleveland","15-7",22,31,30,28,0,0,0,0,0,0,0,0,0,0,111,0.569,0.667,0.524,28,45,18],["2015-12-11T00:00:00",2,"0021500334",1610612753,"ORL","Orlando","12-11",20,17,15,24,0,0,0,0,0,0,0,0,0,0,76,0.389,0.700,0.273,16,30,19],["2015-12-11T00:00:00",3,"0021500335",1610612765,"DET","Detroit","13-11",35,23,31,18,0,0,0,0,0,0,0,0,0,0,107,0.462,0.688,0.370,18,48,14],["2015-12-11T00:00:00",3,"0021500335",1610612755,"PHI","Philadelphia","1-23",14,32,20,29,0,0,0,0,0,0,0,0,0,0,95,0.450,0.708,0.333,22,44,21],["2015-12-11T00:00:00",4,"0021500336",1610612744,"GSW","Golden State","24-0",26,31,25,21,7,14,0,0,0,0,0,0,0,0,124,0.393,0.795,0.290,28,67,18],["2015-12-11T00:00:00",4,"0021500336",1610612738,"BOS","Boston","13-10",25,28,22,28,7,9,0,0,0,0,0,0,0,0,119,0.430,0.563,0.364,32,51,15],["2015-12-11T00:00:00",5,"0021500337",1610612749,"MIL","Milwaukee","9-15",17,14,29,23,0,0,0,0,0,0,0,0,0,0,83,0.413,0.813,0.364,19,40,15],["2015-12-11T00:00:00",5,"0021500337",1610612761,"TOR","Toronto","15-9",24,25,21,20,0,0,0,0,0,0,0,0,0,0,90,0.486,0.652,0.350,16,39,16],["2015-12-11T00:00:00",6,"0021500338",1610612766,"CHA","Charlotte","14-8",29,30,34,30,0,0,0,0,0,0,0,0,0,0,123,0.500,0.900,0.486,23,41,13],["2015-12-11T00:00:00",6,"0021500338",1610612763,"MEM","Memphis","13-11",35,19,19,26,0,0,0,0,0,0,0,0,0,0,99,0.400,0.757,0.350,19,40,12],["2015-12-11T00:00:00",7,"0021500339",1610612764,"WAS","Washington","9-12",27,27,23,28,0,0,0,0,0,0,0,0,0,0,105,0.500,0.619,0.444,27,33,10],["2015-12-11T00:00:00",7,"0021500339",1610612740,"NOP","New Orleans","6-16",29,26,22,30,0,0,0,0,0,0,0,0,0,0,107,0.494,0.722,0.593,21,41,16],["2015-12-11T00:00:00",8,"0021500340",1610612750,"MIN","Minnesota","9-13",29,27,22,22,8,0,0,0,0,0,0,0,0,0,108,0.437,0.862,0.368,22,43,10],["2015-12-11T00:00:00",8,"0021500340",1610612743,"DEN","Denver","9-14",23,18,32,27,11,0,0,0,0,0,0,0,0,0,111,0.442,0.727,0.393,21,50,12],["2015-12-11T00:00:00",9,"0021500341",1610612760,"OKC","Oklahoma City","15-8",27,25,20,22,0,0,0,0,0,0,0,0,0,0,94,0.468,0.875,0.353,14,45,13],["2015-12-11T00:00:00",9,"0021500341",1610612762,"UTA","Utah","10-11",15,29,23,23,0,0,0,0,0,0,0,0,0,0,90,0.423,0.667,0.286,17,39,11],["2015-12-11T00:00:00",10,"0021500342",1610612747,"LAL","Los Angeles","3-20",27,22,22,16,0,0,0,0,0,0,0,0,0,0,87,0.409,0.600,0.360,20,36,15],["2015-12-11T00:00:00",10,"0021500342",1610612759,"SAS","San Antonio","19-5",31,20,28,30,0,0,0,0,0,0,0,0,0,0,109,0.537,0.600,0.429,26,49,13],["2015-12-11T00:00:00",11,"0021500343",1610612757,"POR","Portland","10-14",33,24,21,28,0,0,0,0,0,0,0,0,0,0,106,0.469,0.571,0.353,23,51,12],["2015-12-11T00:00:00",11,"0021500343",1610612756,"PHX","Phoenix","10-14",26,35,21,14,0,0,0,0,0,0,0,0,0,0,96,0.434,0.611,0.371,21,40,9]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[["0021500333",1610612754,1610612748,"2015-12-11T00:00:00",2,2,"Tied"],["0021500340",1610612743,1610612750,"2015-12-11T00:00:00",3,1,"Denver"],["0021500339",1610612740,1610612764,"2015-12-11T00:00:00",1,1,"Tied"],["0021500343",1610612756,1610612757,"2015-12-11T00:00:00",2,1,"Phoenix"],["0021500341",1610612762,1610612760,"2015-12-11T00:00:00",0,4,"Oklahoma City"],["0021500337",1610612761,1610612749,"2015-12-11T00:00:00",4,0,"Toronto"],["0021500335",1610612755,1610612765,"2015-12-11T00:00:00",0,4,"Detroit"],["0021500342",1610612759,1610612747,"2015-12-11T00:00:00",4,0,"San Antonio"],["0021500338",1610612763,1610612766,"2015-12-11T00:00:00",0,2,"Charlotte"],["0021500334",1610612753,1610612739,"2015-12-11T00:00:00",0,4,"Cleveland"],["0021500336",1610612738,1610612744,"2015-12-11T00:00:00",1,1,"Tied"]]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021500333","0021500080","2015-11-06T00:00:00",1610612754,"Indiana","Pacers","IND",90,1610612748,"Miami","Heat","MIA",87],["0021500334","0021500203","2015-11-23T00:00:00",1610612753,"Orlando","Magic","ORL",103,1610612739,"Cleveland","Cavaliers","CLE",117],["0021500335","0021401006","2015-03-18T00:00:00",1610612755,"Philadelphia","76ers","PHI",94,1610612765,"Detroit","Pistons","DET",83],["0021500336","0021400880","2015-03-01T00:00:00",1610612738,"Boston","Celtics","BOS",101,1610612744,"Golden State","Warriors","GSW",106],["0021500337","0021500042","2015-11-01T00:00:00",1610612761,"Toronto","Raptors","TOR",106,1610612749,"Milwaukee","Bucks","MIL",87],["0021500338","0021400334","2014-12-12T00:00:00",1610612763,"Memphis","Grizzlies","MEM",113,1610612766,"Charlotte","Hornets","CHA",107],["0021500339","0021400515","2015-01-05T00:00:00",1610612740,"New Orleans","Pelicans","NOP",85,1610612764,"Washington","Wizards","WAS",92],["0021500340","0021500029","2015-10-30T00:00:00",1610612743,"Denver","Nuggets","DEN",78,1610612750,"Minnesota","Timberwolves","MIN",95],["0021500341","0021500208","2015-11-23T00:00:00",1610612762,"Utah","Jazz","UTA",89,1610612760,"Oklahoma City","Thunder","OKC",111],["0021500342","0021400648","2015-01-23T00:00:00",1610612759,"San Antonio","Spurs","SAS",99,1610612747,"Los Angeles","Lakers","LAL",85],["0021500343","0021500037","2015-10-31T00:00:00",1610612756,"Phoenix","Suns","PHX",101,1610612757,"Portland","Trail Blazers","POR",90]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612739,"00","22015","12/11/2015","East","Cleveland",22,15,7,0.682,"10-1","5-6"],[1610612766,"00","22015","12/11/2015","East","Charlotte",22,14,8,0.636,"10-3","4-5"],[1610612761,"00","22015","12/11/2015","East","Toronto",24,15,9,0.625,"7-4","8-5"],[1610612754,"00","22015","12/11/2015","East","Indiana",21,13,8,0.619,"7-3","6-5"],[1610612741,"00","22015","12/11/2015","East","Chicago",20,12,8,0.6,"8-3","4-5"],[1610612737,"00","22015","12/11/2015","East","Atlanta",24,14,10,0.583,"8-4","6-6"],[1610612748,"00","22015","12/11/2015","East","Miami",21,12,9,0.571,"10-4","2-5"],[1610612738,"00","22015","12/11/2015","East","Boston",23,13,10,0.565,"7-5","6-5"],[1610612765,"00","22015","12/11/2015","East","Detroit",24,13,11,0.542,"8-3","5-8"],[1610612753,"00","22015","12/11/2015","East","Orlando",23,12,11,0.522,"7-4","5-7"],[1610612764,"00","22015","12/11/2015","East","Washington",21,9,12,0.429,"4-7","5-5"],[1610612752,"00","22015","12/11/2015","East","New York",24,10,14,0.417,"5-7","5-7"],[1610612749,"00","22015","12/11/2015","East","Milwaukee",24,9,15,0.375,"7-5","2-10"],[1610612751,"00","22015","12/11/2015","East","Brooklyn",22,7,15,0.318,"6-4","1-11"],[1610612755,"00","22015","12/11/2015","East","Philadelphia",24,1,23,0.042,"1-10","0-13"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612744,"00","22015","12/11/2015","West","Golden State",24,24,0,1.0,"10-0","14-0"],[1610612759,"00","22015","12/11/2015","West","San Antonio",24,19,5,0.792,"12-0","7-5"],[1610612760,"00","22015","12/11/2015","West","Oklahoma City",23,15,8,0.652,"10-3","5-5"],[1610612742,"00","22015","12/11/2015","West","Dallas",23,13,10,0.565,"5-4","8-6"],[1610612746,"00","22015","12/11/2015","West","LA Clippers",23,13,10,0.565,"9-5","4-5"],[1610612763,"00","22015","12/11/2015","West","Memphis",24,13,11,0.542,"7-6","6-5"],[1610612745,"00","22015","12/11/2015","West","Houston",23,11,12,0.478,"6-7","5-5"],[1610612762,"00","22015","12/11/2015","West","Utah",21,10,11,0.476,"5-5","5-6"],[1610612756,"00","22015","12/11/2015","West","Phoenix",24,10,14,0.417,"6-6","4-8"],[1610612757,"00","22015","12/11/2015","West","Portland",24,10,14,0.417,"5-5","5-9"],[1610612750,"00","22015","12/11/2015","West","Minnesota",22,9,13,0.409,"3-9","6-4"],[1610612743,"00","22015","12/11/2015","West","Denver",23,9,14,0.391,"4-7","5-7"],[1610612758,"00","22015","12/11/2015","West","Sacramento",24,9,15,0.375,"7-7","2-8"],[1610612740,"00","22015","12/11/2015","West","New Orleans",22,6,16,0.273,"5-6","1-10"],[1610612747,"00","22015","12/11/2015","West","L.A. Lakers",23,3,20,0.13,"1-6","2-14"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021500336",1],["0021500334",1],["0021500333",1],["0021500337",1],["0021500335",1],["0021500339",1],["0021500338",1],["0021500340",1],["0021500341",1],["0021500343",1],["0021500342",1]]}]}';

exports.default = api;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"11/01/2016","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2016-11-01T00:00:00",1,"0021600046",1,"7:00 pm ET","20161101/ORLPHI",1610612755,1610612753,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",2,"0021600047",1,"7:00 pm ET","20161101/HOUCLE",1610612739,1610612745,"2016",0,"     ","NBA TV","Q0       - NBA TV",0],["2016-11-01T00:00:00",3,"0021600048",1,"7:00 pm ET","20161101/LALIND",1610612754,1610612747,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",4,"0021600049",1,"7:30 pm ET","20161101/SACMIA",1610612748,1610612758,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",5,"0021600050",1,"7:30 pm ET","20161101/NYKDET",1610612765,1610612752,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",6,"0021600051",1,"8:00 pm ET","20161101/MILNOP",1610612740,1610612749,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",7,"0021600052",1,"8:00 pm ET","20161101/MEMMIN",1610612750,1610612763,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",8,"0021600053",1,"8:30 pm ET","20161101/UTASAS",1610612759,1610612762,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",9,"0021600054",1,"10:00 pm ET","20161101/GSWPOR",1610612757,1610612744,"2016",0,"     ","NBA TV","Q0       - NBA TV",0]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2016-11-01T00:00:00",1,"0021600046",1610612753,"ORL","Orlando","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",1,"0021600046",1610612755,"PHI","Philadelphia","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",2,"0021600047",1610612745,"HOU","Houston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",2,"0021600047",1610612739,"CLE","Cleveland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",3,"0021600048",1610612754,"IND","Indiana","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",3,"0021600048",1610612747,"LAL","Los Angeles","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",4,"0021600049",1610612748,"MIA","Miami","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",4,"0021600049",1610612758,"SAC","Sacramento","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",5,"0021600050",1610612765,"DET","Detroit","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",5,"0021600050",1610612752,"NYK","New York","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",6,"0021600051",1610612740,"NOP","New Orleans","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",6,"0021600051",1610612749,"MIL","Milwaukee","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",7,"0021600052",1610612750,"MIN","Minnesota","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",7,"0021600052",1610612763,"MEM","Memphis","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",8,"0021600053",1610612759,"SAS","San Antonio","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",8,"0021600053",1610612762,"UTA","Utah","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",9,"0021600054",1610612757,"POR","Portland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",9,"0021600054",1610612744,"GSW","Golden State","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021600046","0021500881","2016-02-28T00:00:00",1610612755,"Philadelphia","76ers","PHI",116,1610612753,"Orlando","Magic","ORL",130],["0021600047","0021501111","2016-03-29T00:00:00",1610612739,"Cleveland","Cavaliers","CLE",100,1610612745,"Houston","Rockets","HOU",106],["0021600048","0021500776","2016-02-08T00:00:00",1610612754,"Indiana","Pacers","IND",89,1610612747,"Los Angeles","Lakers","LAL",87],["0021600049","0021501135","2016-04-01T00:00:00",1610612748,"Miami","Heat","MIA",112,1610612758,"Sacramento","Kings","SAC",106],["0021600050","0021500923","2016-03-05T00:00:00",1610612765,"Detroit","Pistons","DET",89,1610612752,"New York","Knicks","NYK",102],["0021600051","0021500978","2016-03-12T00:00:00",1610612740,"New Orleans","Pelicans","NOP",92,1610612749,"Milwaukee","Bucks","MIL",103],["0021600052","0021501008","2016-03-16T00:00:00",1610612750,"Minnesota","Timberwolves","MIN",114,1610612763,"Memphis","Grizzlies","MEM",108],["0021600053","0021501161","2016-04-05T00:00:00",1610612759,"San Antonio","Spurs","SAS",88,1610612762,"Utah","Jazz","UTA",86],["0021600054","0041500225","2016-05-11T00:00:00",1610612757,"Portland","Trail Blazers","POR",121,1610612744,"Golden State","Warriors","GSW",125]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22016","11/01/2016","East","Atlanta",0,0,0,0.0,"0-0","0-0"],[1610612738,"00","22016","11/01/2016","East","Boston",0,0,0,0.0,"0-0","0-0"],[1610612751,"00","22016","11/01/2016","East","Brooklyn",0,0,0,0.0,"0-0","0-0"],[1610612766,"00","22016","11/01/2016","East","Charlotte",0,0,0,0.0,"0-0","0-0"],[1610612741,"00","22016","11/01/2016","East","Chicago",0,0,0,0.0,"0-0","0-0"],[1610612739,"00","22016","11/01/2016","East","Cleveland",0,0,0,0.0,"0-0","0-0"],[1610612765,"00","22016","11/01/2016","East","Detroit",0,0,0,0.0,"0-0","0-0"],[1610612754,"00","22016","11/01/2016","East","Indiana",0,0,0,0.0,"0-0","0-0"],[1610612748,"00","22016","11/01/2016","East","Miami",0,0,0,0.0,"0-0","0-0"],[1610612749,"00","22016","11/01/2016","East","Milwaukee",0,0,0,0.0,"0-0","0-0"],[1610612752,"00","22016","11/01/2016","East","New York",0,0,0,0.0,"0-0","0-0"],[1610612753,"00","22016","11/01/2016","East","Orlando",0,0,0,0.0,"0-0","0-0"],[1610612755,"00","22016","11/01/2016","East","Philadelphia",0,0,0,0.0,"0-0","0-0"],[1610612761,"00","22016","11/01/2016","East","Toronto",0,0,0,0.0,"0-0","0-0"],[1610612764,"00","22016","11/01/2016","East","Washington",0,0,0,0.0,"0-0","0-0"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612742,"00","22016","11/01/2016","West","Dallas",0,0,0,0.0,"0-0","0-0"],[1610612743,"00","22016","11/01/2016","West","Denver",0,0,0,0.0,"0-0","0-0"],[1610612744,"00","22016","11/01/2016","West","Golden State",0,0,0,0.0,"0-0","0-0"],[1610612745,"00","22016","11/01/2016","West","Houston",0,0,0,0.0,"0-0","0-0"],[1610612747,"00","22016","11/01/2016","West","L.A. Lakers",0,0,0,0.0,"0-0","0-0"],[1610612746,"00","22016","11/01/2016","West","LA Clippers",0,0,0,0.0,"0-0","0-0"],[1610612763,"00","22016","11/01/2016","West","Memphis",0,0,0,0.0,"0-0","0-0"],[1610612750,"00","22016","11/01/2016","West","Minnesota",0,0,0,0.0,"0-0","0-0"],[1610612740,"00","22016","11/01/2016","West","New Orleans",0,0,0,0.0,"0-0","0-0"],[1610612760,"00","22016","11/01/2016","West","Oklahoma City",0,0,0,0.0,"0-0","0-0"],[1610612756,"00","22016","11/01/2016","West","Phoenix",0,0,0,0.0,"0-0","0-0"],[1610612757,"00","22016","11/01/2016","West","Portland",0,0,0,0.0,"0-0","0-0"],[1610612758,"00","22016","11/01/2016","West","Sacramento",0,0,0,0.0,"0-0","0-0"],[1610612759,"00","22016","11/01/2016","West","San Antonio",0,0,0,0.0,"0-0","0-0"],[1610612762,"00","22016","11/01/2016","West","Utah",0,0,0,0.0,"0-0","0-0"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021600046",0],["0021600047",0],["0021600048",0],["0021600049",0],["0021600050",0],["0021600051",0],["0021600052",0],["0021600053",0],["0021600054",0]]}]}';

exports.default = api;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"11/02/2016","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2016-11-02T00:00:00",1,"0021600055",1,"7:00 pm ET","20161102/TORWAS",1610612764,1610612761,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",2,"0021600056",1,"7:00 pm ET","20161102/PHICHA",1610612766,1610612755,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",3,"0021600057",1,"7:30 pm ET","20161102/DETBKN",1610612751,1610612765,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",4,"0021600058",1,"7:30 pm ET","20161102/HOUNYK",1610612752,1610612745,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",5,"0021600059",1,"7:30 pm ET","20161102/LALATL",1610612737,1610612747,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",6,"0021600060",1,"8:00 pm ET","20161102/NOPMEM",1610612763,1610612740,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",7,"0021600061",1,"8:00 pm ET","20161102/CHIBOS",1610612738,1610612741,"2016",0,"     ","ESPN","Q0       - ESPN",0],["2016-11-02T00:00:00",8,"0021600062",1,"9:00 pm ET","20161102/DALUTA",1610612762,1610612742,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",9,"0021600063",1,"10:00 pm ET","20161102/PORPHX",1610612756,1610612757,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",10,"0021600064",1,"10:30 pm ET","20161102/OKCLAC",1610612746,1610612760,"2016",0,"     ","ESPN","Q0       - ESPN",0]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2016-11-02T00:00:00",1,"0021600055",1610612761,"TOR","Toronto","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",1,"0021600055",1610612764,"WAS","Washington","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",2,"0021600056",1610612755,"PHI","Philadelphia","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",2,"0021600056",1610612766,"CHA","Charlotte","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",3,"0021600057",1610612765,"DET","Detroit","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",3,"0021600057",1610612751,"BKN","Brooklyn","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",4,"0021600058",1610612745,"HOU","Houston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",4,"0021600058",1610612752,"NYK","New York","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",5,"0021600059",1610612737,"ATL","Atlanta","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",5,"0021600059",1610612747,"LAL","Los Angeles","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",6,"0021600060",1610612763,"MEM","Memphis","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",6,"0021600060",1610612740,"NOP","New Orleans","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",7,"0021600061",1610612738,"BOS","Boston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",7,"0021600061",1610612741,"CHI","Chicago","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",8,"0021600062",1610612762,"UTA","Utah","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",8,"0021600062",1610612742,"DAL","Dallas","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",9,"0021600063",1610612756,"PHX","Phoenix","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",9,"0021600063",1610612757,"POR","Portland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",10,"0021600064",1610612746,"LAC","LA","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",10,"0021600064",1610612760,"OKC","Oklahoma City","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021600055","0021500680","2016-01-26T00:00:00",1610612764,"Washington","Wizards","WAS",89,1610612761,"Toronto","Raptors","TOR",106],["0021600056","0021501128","2016-04-01T00:00:00",1610612766,"Charlotte","Hornets","CHA",100,1610612755,"Philadelphia","76ers","PHI",91],["0021600057","0021501030","2016-03-19T00:00:00",1610612751,"Brooklyn","Nets","BKN",103,1610612765,"Detroit","Pistons","DET",115],["0021600058","0021500252","2015-11-29T00:00:00",1610612752,"New York","Knicks","NYK",111,1610612745,"Houston","Rockets","HOU",116],["0021600059","0021500921","2016-03-04T00:00:00",1610612737,"Atlanta","Hawks","ATL",106,1610612747,"Los Angeles","Lakers","LAL",77],["0021600060","0021500967","2016-03-11T00:00:00",1610612763,"Memphis","Grizzlies","MEM",121,1610612740,"New Orleans","Pelicans","NOP",114],["0021600061","0021500646","2016-01-22T00:00:00",1610612738,"Boston","Celtics","BOS",110,1610612741,"Chicago","Bulls","CHI",101],["0021600062","0021501210","2016-04-11T00:00:00",1610612762,"Utah","Jazz","UTA",92,1610612742,"Dallas","Mavericks","DAL",101],["0021600063","0021500343","2015-12-11T00:00:00",1610612756,"Phoenix","Suns","PHX",96,1610612757,"Portland","Trail Blazers","POR",106],["0021600064","0021501126","2016-03-31T00:00:00",1610612746,"LA","Clippers","LAC",117,1610612760,"Oklahoma City","Thunder","OKC",119]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22016","11/02/2016","East","Atlanta",0,0,0,0.0,"0-0","0-0"],[1610612738,"00","22016","11/02/2016","East","Boston",0,0,0,0.0,"0-0","0-0"],[1610612751,"00","22016","11/02/2016","East","Brooklyn",0,0,0,0.0,"0-0","0-0"],[1610612766,"00","22016","11/02/2016","East","Charlotte",0,0,0,0.0,"0-0","0-0"],[1610612741,"00","22016","11/02/2016","East","Chicago",0,0,0,0.0,"0-0","0-0"],[1610612739,"00","22016","11/02/2016","East","Cleveland",0,0,0,0.0,"0-0","0-0"],[1610612765,"00","22016","11/02/2016","East","Detroit",0,0,0,0.0,"0-0","0-0"],[1610612754,"00","22016","11/02/2016","East","Indiana",0,0,0,0.0,"0-0","0-0"],[1610612748,"00","22016","11/02/2016","East","Miami",0,0,0,0.0,"0-0","0-0"],[1610612749,"00","22016","11/02/2016","East","Milwaukee",0,0,0,0.0,"0-0","0-0"],[1610612752,"00","22016","11/02/2016","East","New York",0,0,0,0.0,"0-0","0-0"],[1610612753,"00","22016","11/02/2016","East","Orlando",0,0,0,0.0,"0-0","0-0"],[1610612755,"00","22016","11/02/2016","East","Philadelphia",0,0,0,0.0,"0-0","0-0"],[1610612761,"00","22016","11/02/2016","East","Toronto",0,0,0,0.0,"0-0","0-0"],[1610612764,"00","22016","11/02/2016","East","Washington",0,0,0,0.0,"0-0","0-0"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612742,"00","22016","11/02/2016","West","Dallas",0,0,0,0.0,"0-0","0-0"],[1610612743,"00","22016","11/02/2016","West","Denver",0,0,0,0.0,"0-0","0-0"],[1610612744,"00","22016","11/02/2016","West","Golden State",0,0,0,0.0,"0-0","0-0"],[1610612745,"00","22016","11/02/2016","West","Houston",0,0,0,0.0,"0-0","0-0"],[1610612747,"00","22016","11/02/2016","West","L.A. Lakers",0,0,0,0.0,"0-0","0-0"],[1610612746,"00","22016","11/02/2016","West","LA Clippers",0,0,0,0.0,"0-0","0-0"],[1610612763,"00","22016","11/02/2016","West","Memphis",0,0,0,0.0,"0-0","0-0"],[1610612750,"00","22016","11/02/2016","West","Minnesota",0,0,0,0.0,"0-0","0-0"],[1610612740,"00","22016","11/02/2016","West","New Orleans",0,0,0,0.0,"0-0","0-0"],[1610612760,"00","22016","11/02/2016","West","Oklahoma City",0,0,0,0.0,"0-0","0-0"],[1610612756,"00","22016","11/02/2016","West","Phoenix",0,0,0,0.0,"0-0","0-0"],[1610612757,"00","22016","11/02/2016","West","Portland",0,0,0,0.0,"0-0","0-0"],[1610612758,"00","22016","11/02/2016","West","Sacramento",0,0,0,0.0,"0-0","0-0"],[1610612759,"00","22016","11/02/2016","West","San Antonio",0,0,0,0.0,"0-0","0-0"],[1610612762,"00","22016","11/02/2016","West","Utah",0,0,0,0.0,"0-0","0-0"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021600055",0],["0021600056",0],["0021600057",0],["0021600058",0],["0021600059",0],["0021600060",0],["0021600062",0],["0021600063",0],["0021600061",0],["0021600064",0]]}]}';

exports.default = api;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"11/03/2016","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2016-11-03T00:00:00",1,"0021600065",1,"7:00 pm ET","20161103/SACORL",1610612753,1610612758,"2016",0,"     ",null,"Q0       - ",0],["2016-11-03T00:00:00",2,"0021600066",1,"8:00 pm ET","20161103/INDMIL",1610612749,1610612754,"2016",0,"     ",null,"Q0       - ",0],["2016-11-03T00:00:00",3,"0021600067",1,"8:00 pm ET","20161103/DENMIN",1610612750,1610612743,"2016",0,"     ",null,"Q0       - ",0],["2016-11-03T00:00:00",4,"0021600068",1,"8:00 pm ET","20161103/BOSCLE",1610612739,1610612738,"2016",0,"     ","TNT","Q0       - TNT",0],["2016-11-03T00:00:00",5,"0021600069",1,"10:30 pm ET","20161103/OKCGSW",1610612744,1610612760,"2016",0,"     ","TNT","Q0       - TNT",0]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2016-11-03T00:00:00",1,"0021600065",1610612753,"ORL","Orlando","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",1,"0021600065",1610612758,"SAC","Sacramento","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",2,"0021600066",1610612749,"MIL","Milwaukee","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",2,"0021600066",1610612754,"IND","Indiana","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",3,"0021600067",1610612750,"MIN","Minnesota","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",3,"0021600067",1610612743,"DEN","Denver","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",4,"0021600068",1610612739,"CLE","Cleveland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",4,"0021600068",1610612738,"BOS","Boston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",5,"0021600069",1610612744,"GSW","Golden State","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",5,"0021600069",1610612760,"OKC","Oklahoma City","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021600065","0021500970","2016-03-11T00:00:00",1610612753,"Orlando","Magic","ORL",107,1610612758,"Sacramento","Kings","SAC",100],["0021600066","0021501225","2016-04-13T00:00:00",1610612749,"Milwaukee","Bucks","MIL",92,1610612754,"Indiana","Pacers","IND",97],["0021600067","0021500530","2016-01-06T00:00:00",1610612750,"Minnesota","Timberwolves","MIN",74,1610612743,"Denver","Nuggets","DEN",78],["0021600068","0021500922","2016-03-05T00:00:00",1610612739,"Cleveland","Cavaliers","CLE",120,1610612738,"Boston","Celtics","BOS",103],["0021600069","0041500317","2016-05-30T00:00:00",1610612744,"Golden State","Warriors","GSW",96,1610612760,"Oklahoma City","Thunder","OKC",88]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22016","11/03/2016","East","Atlanta",0,0,0,0.0,"0-0","0-0"],[1610612738,"00","22016","11/03/2016","East","Boston",0,0,0,0.0,"0-0","0-0"],[1610612751,"00","22016","11/03/2016","East","Brooklyn",0,0,0,0.0,"0-0","0-0"],[1610612766,"00","22016","11/03/2016","East","Charlotte",0,0,0,0.0,"0-0","0-0"],[1610612741,"00","22016","11/03/2016","East","Chicago",0,0,0,0.0,"0-0","0-0"],[1610612739,"00","22016","11/03/2016","East","Cleveland",0,0,0,0.0,"0-0","0-0"],[1610612765,"00","22016","11/03/2016","East","Detroit",0,0,0,0.0,"0-0","0-0"],[1610612754,"00","22016","11/03/2016","East","Indiana",0,0,0,0.0,"0-0","0-0"],[1610612748,"00","22016","11/03/2016","East","Miami",0,0,0,0.0,"0-0","0-0"],[1610612749,"00","22016","11/03/2016","East","Milwaukee",0,0,0,0.0,"0-0","0-0"],[1610612752,"00","22016","11/03/2016","East","New York",0,0,0,0.0,"0-0","0-0"],[1610612753,"00","22016","11/03/2016","East","Orlando",0,0,0,0.0,"0-0","0-0"],[1610612755,"00","22016","11/03/2016","East","Philadelphia",0,0,0,0.0,"0-0","0-0"],[1610612761,"00","22016","11/03/2016","East","Toronto",0,0,0,0.0,"0-0","0-0"],[1610612764,"00","22016","11/03/2016","East","Washington",0,0,0,0.0,"0-0","0-0"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612742,"00","22016","11/03/2016","West","Dallas",0,0,0,0.0,"0-0","0-0"],[1610612743,"00","22016","11/03/2016","West","Denver",0,0,0,0.0,"0-0","0-0"],[1610612744,"00","22016","11/03/2016","West","Golden State",0,0,0,0.0,"0-0","0-0"],[1610612745,"00","22016","11/03/2016","West","Houston",0,0,0,0.0,"0-0","0-0"],[1610612747,"00","22016","11/03/2016","West","L.A. Lakers",0,0,0,0.0,"0-0","0-0"],[1610612746,"00","22016","11/03/2016","West","LA Clippers",0,0,0,0.0,"0-0","0-0"],[1610612763,"00","22016","11/03/2016","West","Memphis",0,0,0,0.0,"0-0","0-0"],[1610612750,"00","22016","11/03/2016","West","Minnesota",0,0,0,0.0,"0-0","0-0"],[1610612740,"00","22016","11/03/2016","West","New Orleans",0,0,0,0.0,"0-0","0-0"],[1610612760,"00","22016","11/03/2016","West","Oklahoma City",0,0,0,0.0,"0-0","0-0"],[1610612756,"00","22016","11/03/2016","West","Phoenix",0,0,0,0.0,"0-0","0-0"],[1610612757,"00","22016","11/03/2016","West","Portland",0,0,0,0.0,"0-0","0-0"],[1610612758,"00","22016","11/03/2016","West","Sacramento",0,0,0,0.0,"0-0","0-0"],[1610612759,"00","22016","11/03/2016","West","San Antonio",0,0,0,0.0,"0-0","0-0"],[1610612762,"00","22016","11/03/2016","West","Utah",0,0,0,0.0,"0-0","0-0"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021600065",0],["0021600066",0],["0021600067",0],["0021600068",0],["0021600069",0]]}]}';

exports.default = api;

},{}],16:[function(require,module,exports){
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

var _gamesViewer = require('./components/games-viewer.jsx');

var _gamesViewer2 = _interopRequireDefault(_gamesViewer);

var _actionCreators = require('./action-creators.jsx');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = Redux.createStore(_reducers2.default.app, Redux.applyMiddleware(_reduxThunk2.default));
store.subscribe(render);
render();

function render() {
  _reactDom2.default.render(_react2.default.createElement(_gamesViewer2.default, {
    reduxState: store.getState(),
    addPrediction: function addPrediction(gameId, homeVsRoad) {
      store.dispatch(_actionCreators2.default.addPrediction(gameId, homeVsRoad));
    },
    removePrediction: function removePrediction(gameId) {
      store.dispatch(_actionCreators2.default.removePrediction(gameId));
    },
    dayForward: function dayForward() {
      store.dispatch(_actionCreators2.default.dayForward());
    },
    dayBack: function dayBack() {
      store.dispatch(_actionCreators2.default.dayBack());
    }
  }), document.getElementById('app-root'));
}

render();

// GamesViewer
//   DayPicker
//   SingleDayGameList
//     SingleGame
//       GameTeam (road team)
//         TeamMessage
//       GameStatus
//       GameTeam (home team)
//         TeamMessage

},{"./action-creators.jsx":2,"./components/games-viewer.jsx":6,"./reducers.jsx":18,"babel-polyfill":"babel-polyfill","react":"react","react-dom":"react-dom","react-redux":"react-redux","redux":"redux","redux-thunk":1}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var processSingleGame = function processSingleGame(data, index) {
  var gameSummary = {};

  gameSummary.gameId = data.resultSets[1].rowSet[2 * index][2];

  gameSummary.gameStatus = {
    startTime: data.resultSets[0].rowSet[index][4],
    hasStarted: data.resultSets[0].rowSet[index][9] !== 0,
    roadScore: data.resultSets[1].rowSet[2 * index][21],
    homeScore: data.resultSets[1].rowSet[2 * index + 1][21],
    isFinal: data.resultSets[0].rowSet[index][4] === 'Final'
  };

  gameSummary.roadTeam = {
    teamName: data.resultSets[1].rowSet[2 * index][4],
    isEligible: true,
    isChosen: false,
    isWinner: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] > data.resultSets[1].rowSet[2 * index + 1][21],
    isLoser: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] < data.resultSets[1].rowSet[2 * index + 1][21]
  };

  gameSummary.homeTeam = {
    teamName: data.resultSets[1].rowSet[2 * index + 1][4],
    isEligible: true,
    isChosen: false,
    isWinner: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] < data.resultSets[1].rowSet[2 * index + 1][21],
    isLoser: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] > data.resultSets[1].rowSet[2 * index + 1][21]
  };

  return gameSummary;
};

var api = function api(dataString) {
  var data = JSON.parse(dataString);
  var gamesArray = [];
  var gameCount = data.resultSets[0].rowSet.length;
  for (var i = 0; i < gameCount; i++) {
    gamesArray.push(processSingleGame(data, i));
  }
  return gamesArray;
};

exports.default = api;

},{}],18:[function(require,module,exports){
// State shape:

// {
//   selectedDate: string
//   gamesByDay: [
//     singleDayGameList: [
//       singleGame: {
//         gameId: string,
//         homeTeam: {...},
//         roadTeam: {...},
//         gameStatus: {...}
//       }
//     ]
//   ]  
// }

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _processGames = require('./process-games.jsx');

var _processGames2 = _interopRequireDefault(_processGames);

var _ = require('./data/2015-12-09.js');

var _2 = _interopRequireDefault(_);

var _3 = require('./data/2015-12-10.js');

var _4 = _interopRequireDefault(_3);

var _5 = require('./data/2015-12-11.js');

var _6 = _interopRequireDefault(_5);

var _7 = require('./data/2016-11-01.js');

var _8 = _interopRequireDefault(_7);

var _9 = require('./data/2016-11-02.js');

var _10 = _interopRequireDefault(_9);

var _11 = require('./data/2016-11-03.js');

var _12 = _interopRequireDefault(_11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

//Import dummy data:


var selectedDate = function selectedDate() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '2016-11-01' : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'DAY_FORWARD':
      return moment(state).add(1, 'days').format('YYYY-MM-DD');
    case 'DAY_BACK':
      return moment(state).subtract(1, 'days').format('YYYY-MM-DD');
    default:
      return state;
  }
};

var gameId = function gameId() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  }
};

var homeTeam = function homeTeam() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_PREDICTION':
      if (action.winner === 'homeTeam') {
        return _extends({}, state, { isChosen: true });
      } else {
        return _extends({}, state, { isChosen: false });
      }
    case 'REMOVE_PREDICTION':
      return _extends({}, state, { isChosen: false });
    default:
      return state;
  }
};

var roadTeam = function roadTeam() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_PREDICTION':
      if (action.winner === 'roadTeam') {
        return _extends({}, state, { isChosen: true });
      } else {
        return _extends({}, state, { isChosen: false });
      }
    case 'REMOVE_PREDICTION':
      return _extends({}, state, { isChosen: false });
    default:
      return state;
  }
};

var gameStatus = function gameStatus() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  }
};

var singleGame = function singleGame() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];


  //check which game the action belongs to, and only call subreducers in the case of a match:
  if (action.gameId === state.gameId) {
    return {
      gameId: gameId(state.gameId, action),
      homeTeam: homeTeam(state.homeTeam, action),
      roadTeam: roadTeam(state.roadTeam, action),
      gameStatus: gameStatus(state.gameStatus, action)
    };
  } else {
    return state;
  }
};

var singleDayGameList = function singleDayGameList() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_PREDICTION':
      return state.map(function (game) {
        return singleGame(game, action);
      });
    case 'REMOVE_PREDICTION':
      return state.map(function (game) {
        return singleGame(game, action);
      });
    default:
      return state;
  }
};

var gamesByDay = function gamesByDay() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [(0, _processGames2.default)(_8.default), (0, _processGames2.default)(_10.default), (0, _processGames2.default)(_12.default)] : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_PREDICTION':
      return state.map(function (day) {
        return singleDayGameList(day, action);
      });
    case 'REMOVE_PREDICTION':
      return state.map(function (day) {
        return singleDayGameList(day, action);
      });
    default:
      return state;
  }
};

var api = {
  app: Redux.combineReducers({
    selectedDate: selectedDate,
    gamesByDay: gamesByDay
  })
};

exports.default = api;

},{"./data/2015-12-09.js":10,"./data/2015-12-10.js":11,"./data/2015-12-11.js":12,"./data/2016-11-01.js":13,"./data/2016-11-02.js":14,"./data/2016-11-03.js":15,"./process-games.jsx":17,"redux":"redux","redux-thunk":1}]},{},[16]);

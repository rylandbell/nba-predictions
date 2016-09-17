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
  addPrediction: function addPrediction(gameId, teamName, gameDate) {
    return {
      type: 'ADD_PREDICTION',
      teamName: teamName,
      gameDate: gameDate
    };
  },
  removePrediction: function removePrediction(gameId, gameDate) {
    return {
      type: 'REMOVE_PREDICTION',
      gameDate: gameDate
    };
  },
  markIneligible: function markIneligible(teamName) {
    return {
      type: 'MARK_INELIGIBLE',
      teamName: teamName
    };
  },
  markEligible: function markEligible(teamName) {
    return {
      type: 'MARK_ELIGIBLE',
      teamName: teamName
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
          moment(reduxState.selectedDate).format('MMMM D, YYYY')
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
    var isEligible = this.props.eligibleTeams[this.props.teamData.teamName];
    var isChosen = this.props.predictedWinner === this.props.teamData.teamName;
    if ((isEligible || isChosen) && !this.props.gameData.gameStatus.hasStarted) {
      if (isChosen) {
        this.props.removePrediction(this.props.gameData.gameId, this.props.teamData.teamName, this.props.gameData.gameDate);
      } else {
        this.props.addPrediction(this.props.gameData.gameId, this.props.teamData.teamName, this.props.gameData.gameDate);
      }
    }
  },
  render: function render() {
    var isEligible = this.props.eligibleTeams[this.props.teamData.teamName];
    var clickable = isEligible || this.props.predictedWinner === this.props.teamData.teamName;
    return _react2.default.createElement(
      'div',
      { className: 'game-item game-team', onClick: this.handleClick },
      _react2.default.createElement(
        'div',
        { className: 'team-container' },
        _react2.default.createElement(
          'div',
          { className: "team-item team-name " + (clickable ? "eligible-team" : "ineligible-team") },
          _react2.default.createElement(
            'h4',
            null,
            this.props.teamData.teamName
          )
        ),
        this.props.teamData.teamName === this.props.predictedWinner ? _react2.default.createElement(_teamMessage2.default, { teamData: this.props.teamData }) : ''
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
      return _react2.default.createElement(_singleGame2.default, { gameData: gameData, predictedWinner: reduxState.predictedWinners[dayKey + 1], eligibleTeams: reduxState.eligibleTeams, addPrediction: addPrediction, removePrediction: removePrediction, key: index });
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
  var predictedWinner = _ref.predictedWinner;
  var eligibleTeams = _ref.eligibleTeams;
  var addPrediction = _ref.addPrediction;
  var removePrediction = _ref.removePrediction;


  //color the panel border appropriately:
  var panelType = 'panel-default';
  if (gameData.roadTeam.teamName === predictedWinner || gameData.homeTeam.teamName === predictedWinner) {
    panelType = 'panel-primary';
  }
  if (gameData.roadTeam.isWinner && gameData.roadTeam.teamName === predictedWinner || gameData.homeTeam.isWinner && gameData.homeTeam.teamName === predictedWinner) {
    panelType = 'panel-success';
  }
  if (gameData.roadTeam.isLoser && gameData.roadTeam.teamName === predictedWinner || gameData.homeTeam.isLoser && gameData.homeTeam.teamName === predictedWinner) {
    panelType = 'panel-danger';
  }

  return _react2.default.createElement(
    'div',
    { className: 'col-xs-12 col-md-6' },
    _react2.default.createElement(
      'div',
      { className: "panel game-panel " + panelType },
      _react2.default.createElement(
        'div',
        { className: 'panel-body' },
        _react2.default.createElement(
          'div',
          { className: "game-container " + (gameData.gameStatus.hasStarted ? "" : "game-not-started") },
          _react2.default.createElement(_gameTeam2.default, { gameData: gameData, teamData: gameData.roadTeam, predictedWinner: predictedWinner, eligibleTeams: eligibleTeams, homeVsRoad: 'roadTeam', addPrediction: addPrediction, removePrediction: removePrediction }),
          _react2.default.createElement(_gameStatus2.default, { statusData: gameData.gameStatus }),
          _react2.default.createElement(_gameTeam2.default, { gameData: gameData, teamData: gameData.homeTeam, predictedWinner: predictedWinner, eligibleTeams: eligibleTeams, homeVsRoad: 'homeTeam', addPrediction: addPrediction, removePrediction: removePrediction })
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
var api = '{"resource":"scoreboard","parameters":{"GameDate":"11/01/2016","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2016-11-01T00:00:00",1,"0021600046",1,"7:00 pm ET","20161101/ORLPHI",1610612755,1610612753,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",2,"0021600047",1,"7:00 pm ET","20161101/HOUCLE",1610612739,1610612745,"2016",0,"     ","NBA TV","Q0       - NBA TV",0],["2016-11-01T00:00:00",3,"0021600048",1,"7:00 pm ET","20161101/LALIND",1610612754,1610612747,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",4,"0021600049",1,"7:30 pm ET","20161101/SACMIA",1610612748,1610612758,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",5,"0021600050",1,"7:30 pm ET","20161101/NYKDET",1610612765,1610612752,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",6,"0021600051",1,"8:00 pm ET","20161101/MILNOP",1610612740,1610612749,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",7,"0021600052",1,"8:00 pm ET","20161101/MEMMIN",1610612750,1610612763,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",8,"0021600053",1,"8:30 pm ET","20161101/UTASAS",1610612759,1610612762,"2016",0,"     ",null,"Q0       - ",0],["2016-11-01T00:00:00",9,"0021600054",1,"10:00 pm ET","20161101/GSWPOR",1610612757,1610612744,"2016",0,"     ","NBA TV","Q0       - NBA TV",0]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2016-11-01T00:00:00",1,"0021600046",1610612753,"ORL","Orlando","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",1,"0021600046",1610612755,"PHI","Philadelphia","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",2,"0021600047",1610612745,"HOU","Houston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",2,"0021600047",1610612739,"CLE","Cleveland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",3,"0021600048",1610612754,"IND","Indiana","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",3,"0021600048",1610612747,"LAL","Los Angeles","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",4,"0021600049",1610612748,"MIA","Miami","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",4,"0021600049",1610612758,"SAC","Sacramento","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",5,"0021600050",1610612765,"DET","Detroit","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",5,"0021600050",1610612752,"NYK","New York","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",6,"0021600051",1610612740,"NOP","New Orleans","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",6,"0021600051",1610612749,"MIL","Milwaukee","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",7,"0021600052",1610612750,"MIN","Minnesota","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",7,"0021600052",1610612763,"MEM","Memphis","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",8,"0021600053",1610612759,"SAS","San Antonio","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",8,"0021600053",1610612762,"UTA","Utah","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",9,"0021600054",1610612757,"POR","Portland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-01T00:00:00",9,"0021600054",1610612744,"GSW","Golden State","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021600046","0021500881","2016-02-28T00:00:00",1610612755,"Philadelphia","76ers","PHI",116,1610612753,"Orlando","Magic","ORL",130],["0021600047","0021501111","2016-03-29T00:00:00",1610612739,"Cleveland","Cavaliers","CLE",100,1610612745,"Houston","Rockets","HOU",106],["0021600048","0021500776","2016-02-08T00:00:00",1610612754,"Indiana","Pacers","IND",89,1610612747,"Los Angeles","Lakers","LAL",87],["0021600049","0021501135","2016-04-01T00:00:00",1610612748,"Miami","Heat","MIA",112,1610612758,"Sacramento","Kings","SAC",106],["0021600050","0021500923","2016-03-05T00:00:00",1610612765,"Detroit","Pistons","DET",89,1610612752,"New York","Knicks","NYK",102],["0021600051","0021500978","2016-03-12T00:00:00",1610612740,"New Orleans","Pelicans","NOP",92,1610612749,"Milwaukee","Bucks","MIL",103],["0021600052","0021501008","2016-03-16T00:00:00",1610612750,"Minnesota","Timberwolves","MIN",114,1610612763,"Memphis","Grizzlies","MEM",108],["0021600053","0021501161","2016-04-05T00:00:00",1610612759,"San Antonio","Spurs","SAS",88,1610612762,"Utah","Jazz","UTA",86],["0021600054","0041500225","2016-05-11T00:00:00",1610612757,"Portland","Trail Blazers","POR",121,1610612744,"Golden State","Warriors","GSW",125]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22016","11/01/2016","East","Atlanta",0,0,0,0.0,"0-0","0-0"],[1610612738,"00","22016","11/01/2016","East","Boston",0,0,0,0.0,"0-0","0-0"],[1610612751,"00","22016","11/01/2016","East","Brooklyn",0,0,0,0.0,"0-0","0-0"],[1610612766,"00","22016","11/01/2016","East","Charlotte",0,0,0,0.0,"0-0","0-0"],[1610612741,"00","22016","11/01/2016","East","Chicago",0,0,0,0.0,"0-0","0-0"],[1610612739,"00","22016","11/01/2016","East","Cleveland",0,0,0,0.0,"0-0","0-0"],[1610612765,"00","22016","11/01/2016","East","Detroit",0,0,0,0.0,"0-0","0-0"],[1610612754,"00","22016","11/01/2016","East","Indiana",0,0,0,0.0,"0-0","0-0"],[1610612748,"00","22016","11/01/2016","East","Miami",0,0,0,0.0,"0-0","0-0"],[1610612749,"00","22016","11/01/2016","East","Milwaukee",0,0,0,0.0,"0-0","0-0"],[1610612752,"00","22016","11/01/2016","East","New York",0,0,0,0.0,"0-0","0-0"],[1610612753,"00","22016","11/01/2016","East","Orlando",0,0,0,0.0,"0-0","0-0"],[1610612755,"00","22016","11/01/2016","East","Philadelphia",0,0,0,0.0,"0-0","0-0"],[1610612761,"00","22016","11/01/2016","East","Toronto",0,0,0,0.0,"0-0","0-0"],[1610612764,"00","22016","11/01/2016","East","Washington",0,0,0,0.0,"0-0","0-0"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612742,"00","22016","11/01/2016","West","Dallas",0,0,0,0.0,"0-0","0-0"],[1610612743,"00","22016","11/01/2016","West","Denver",0,0,0,0.0,"0-0","0-0"],[1610612744,"00","22016","11/01/2016","West","Golden State",0,0,0,0.0,"0-0","0-0"],[1610612745,"00","22016","11/01/2016","West","Houston",0,0,0,0.0,"0-0","0-0"],[1610612747,"00","22016","11/01/2016","West","L.A. Lakers",0,0,0,0.0,"0-0","0-0"],[1610612746,"00","22016","11/01/2016","West","LA Clippers",0,0,0,0.0,"0-0","0-0"],[1610612763,"00","22016","11/01/2016","West","Memphis",0,0,0,0.0,"0-0","0-0"],[1610612750,"00","22016","11/01/2016","West","Minnesota",0,0,0,0.0,"0-0","0-0"],[1610612740,"00","22016","11/01/2016","West","New Orleans",0,0,0,0.0,"0-0","0-0"],[1610612760,"00","22016","11/01/2016","West","Oklahoma City",0,0,0,0.0,"0-0","0-0"],[1610612756,"00","22016","11/01/2016","West","Phoenix",0,0,0,0.0,"0-0","0-0"],[1610612757,"00","22016","11/01/2016","West","Portland",0,0,0,0.0,"0-0","0-0"],[1610612758,"00","22016","11/01/2016","West","Sacramento",0,0,0,0.0,"0-0","0-0"],[1610612759,"00","22016","11/01/2016","West","San Antonio",0,0,0,0.0,"0-0","0-0"],[1610612762,"00","22016","11/01/2016","West","Utah",0,0,0,0.0,"0-0","0-0"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021600046",0],["0021600047",0],["0021600048",0],["0021600049",0],["0021600050",0],["0021600051",0],["0021600052",0],["0021600053",0],["0021600054",0]]}]}';

exports.default = api;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"11/02/2016","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2016-11-02T00:00:00",1,"0021600055",1,"7:00 pm ET","20161102/TORWAS",1610612764,1610612761,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",2,"0021600056",1,"7:00 pm ET","20161102/PHICHA",1610612766,1610612755,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",3,"0021600057",1,"7:30 pm ET","20161102/DETBKN",1610612751,1610612765,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",4,"0021600058",1,"7:30 pm ET","20161102/HOUNYK",1610612752,1610612745,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",5,"0021600059",1,"7:30 pm ET","20161102/LALATL",1610612737,1610612747,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",6,"0021600060",1,"8:00 pm ET","20161102/NOPMEM",1610612763,1610612740,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",7,"0021600061",1,"8:00 pm ET","20161102/CHIBOS",1610612738,1610612741,"2016",0,"     ","ESPN","Q0       - ESPN",0],["2016-11-02T00:00:00",8,"0021600062",1,"9:00 pm ET","20161102/DALUTA",1610612762,1610612742,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",9,"0021600063",1,"10:00 pm ET","20161102/PORPHX",1610612756,1610612757,"2016",0,"     ",null,"Q0       - ",0],["2016-11-02T00:00:00",10,"0021600064",1,"10:30 pm ET","20161102/OKCLAC",1610612746,1610612760,"2016",0,"     ","ESPN","Q0       - ESPN",0]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2016-11-02T00:00:00",1,"0021600055",1610612761,"TOR","Toronto","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",1,"0021600055",1610612764,"WAS","Washington","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",2,"0021600056",1610612755,"PHI","Philadelphia","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",2,"0021600056",1610612766,"CHA","Charlotte","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",3,"0021600057",1610612765,"DET","Detroit","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",3,"0021600057",1610612751,"BKN","Brooklyn","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",4,"0021600058",1610612745,"HOU","Houston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",4,"0021600058",1610612752,"NYK","New York","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",5,"0021600059",1610612737,"ATL","Atlanta","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",5,"0021600059",1610612747,"LAL","Los Angeles","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",6,"0021600060",1610612763,"MEM","Memphis","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",6,"0021600060",1610612740,"NOP","New Orleans","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",7,"0021600061",1610612738,"BOS","Boston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",7,"0021600061",1610612741,"CHI","Chicago","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",8,"0021600062",1610612762,"UTA","Utah","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",8,"0021600062",1610612742,"DAL","Dallas","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",9,"0021600063",1610612756,"PHX","Phoenix","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",9,"0021600063",1610612757,"POR","Portland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",10,"0021600064",1610612746,"LAC","LA","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-02T00:00:00",10,"0021600064",1610612760,"OKC","Oklahoma City","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021600055","0021500680","2016-01-26T00:00:00",1610612764,"Washington","Wizards","WAS",89,1610612761,"Toronto","Raptors","TOR",106],["0021600056","0021501128","2016-04-01T00:00:00",1610612766,"Charlotte","Hornets","CHA",100,1610612755,"Philadelphia","76ers","PHI",91],["0021600057","0021501030","2016-03-19T00:00:00",1610612751,"Brooklyn","Nets","BKN",103,1610612765,"Detroit","Pistons","DET",115],["0021600058","0021500252","2015-11-29T00:00:00",1610612752,"New York","Knicks","NYK",111,1610612745,"Houston","Rockets","HOU",116],["0021600059","0021500921","2016-03-04T00:00:00",1610612737,"Atlanta","Hawks","ATL",106,1610612747,"Los Angeles","Lakers","LAL",77],["0021600060","0021500967","2016-03-11T00:00:00",1610612763,"Memphis","Grizzlies","MEM",121,1610612740,"New Orleans","Pelicans","NOP",114],["0021600061","0021500646","2016-01-22T00:00:00",1610612738,"Boston","Celtics","BOS",110,1610612741,"Chicago","Bulls","CHI",101],["0021600062","0021501210","2016-04-11T00:00:00",1610612762,"Utah","Jazz","UTA",92,1610612742,"Dallas","Mavericks","DAL",101],["0021600063","0021500343","2015-12-11T00:00:00",1610612756,"Phoenix","Suns","PHX",96,1610612757,"Portland","Trail Blazers","POR",106],["0021600064","0021501126","2016-03-31T00:00:00",1610612746,"LA","Clippers","LAC",117,1610612760,"Oklahoma City","Thunder","OKC",119]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22016","11/02/2016","East","Atlanta",0,0,0,0.0,"0-0","0-0"],[1610612738,"00","22016","11/02/2016","East","Boston",0,0,0,0.0,"0-0","0-0"],[1610612751,"00","22016","11/02/2016","East","Brooklyn",0,0,0,0.0,"0-0","0-0"],[1610612766,"00","22016","11/02/2016","East","Charlotte",0,0,0,0.0,"0-0","0-0"],[1610612741,"00","22016","11/02/2016","East","Chicago",0,0,0,0.0,"0-0","0-0"],[1610612739,"00","22016","11/02/2016","East","Cleveland",0,0,0,0.0,"0-0","0-0"],[1610612765,"00","22016","11/02/2016","East","Detroit",0,0,0,0.0,"0-0","0-0"],[1610612754,"00","22016","11/02/2016","East","Indiana",0,0,0,0.0,"0-0","0-0"],[1610612748,"00","22016","11/02/2016","East","Miami",0,0,0,0.0,"0-0","0-0"],[1610612749,"00","22016","11/02/2016","East","Milwaukee",0,0,0,0.0,"0-0","0-0"],[1610612752,"00","22016","11/02/2016","East","New York",0,0,0,0.0,"0-0","0-0"],[1610612753,"00","22016","11/02/2016","East","Orlando",0,0,0,0.0,"0-0","0-0"],[1610612755,"00","22016","11/02/2016","East","Philadelphia",0,0,0,0.0,"0-0","0-0"],[1610612761,"00","22016","11/02/2016","East","Toronto",0,0,0,0.0,"0-0","0-0"],[1610612764,"00","22016","11/02/2016","East","Washington",0,0,0,0.0,"0-0","0-0"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612742,"00","22016","11/02/2016","West","Dallas",0,0,0,0.0,"0-0","0-0"],[1610612743,"00","22016","11/02/2016","West","Denver",0,0,0,0.0,"0-0","0-0"],[1610612744,"00","22016","11/02/2016","West","Golden State",0,0,0,0.0,"0-0","0-0"],[1610612745,"00","22016","11/02/2016","West","Houston",0,0,0,0.0,"0-0","0-0"],[1610612747,"00","22016","11/02/2016","West","L.A. Lakers",0,0,0,0.0,"0-0","0-0"],[1610612746,"00","22016","11/02/2016","West","LA Clippers",0,0,0,0.0,"0-0","0-0"],[1610612763,"00","22016","11/02/2016","West","Memphis",0,0,0,0.0,"0-0","0-0"],[1610612750,"00","22016","11/02/2016","West","Minnesota",0,0,0,0.0,"0-0","0-0"],[1610612740,"00","22016","11/02/2016","West","New Orleans",0,0,0,0.0,"0-0","0-0"],[1610612760,"00","22016","11/02/2016","West","Oklahoma City",0,0,0,0.0,"0-0","0-0"],[1610612756,"00","22016","11/02/2016","West","Phoenix",0,0,0,0.0,"0-0","0-0"],[1610612757,"00","22016","11/02/2016","West","Portland",0,0,0,0.0,"0-0","0-0"],[1610612758,"00","22016","11/02/2016","West","Sacramento",0,0,0,0.0,"0-0","0-0"],[1610612759,"00","22016","11/02/2016","West","San Antonio",0,0,0,0.0,"0-0","0-0"],[1610612762,"00","22016","11/02/2016","West","Utah",0,0,0,0.0,"0-0","0-0"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021600055",0],["0021600056",0],["0021600057",0],["0021600058",0],["0021600059",0],["0021600060",0],["0021600062",0],["0021600063",0],["0021600061",0],["0021600064",0]]}]}';

exports.default = api;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"11/03/2016","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2016-11-03T00:00:00",1,"0021600065",1,"7:00 pm ET","20161103/SACORL",1610612753,1610612758,"2016",0,"     ",null,"Q0       - ",0],["2016-11-03T00:00:00",2,"0021600066",1,"8:00 pm ET","20161103/INDMIL",1610612749,1610612754,"2016",0,"     ",null,"Q0       - ",0],["2016-11-03T00:00:00",3,"0021600067",1,"8:00 pm ET","20161103/DENMIN",1610612750,1610612743,"2016",0,"     ",null,"Q0       - ",0],["2016-11-03T00:00:00",4,"0021600068",1,"8:00 pm ET","20161103/BOSCLE",1610612739,1610612738,"2016",0,"     ","TNT","Q0       - TNT",0],["2016-11-03T00:00:00",5,"0021600069",1,"10:30 pm ET","20161103/OKCGSW",1610612744,1610612760,"2016",0,"     ","TNT","Q0       - TNT",0]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2016-11-03T00:00:00",1,"0021600065",1610612753,"ORL","Orlando","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",1,"0021600065",1610612758,"SAC","Sacramento","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",2,"0021600066",1610612749,"MIL","Milwaukee","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",2,"0021600066",1610612754,"IND","Indiana","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",3,"0021600067",1610612750,"MIN","Minnesota","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",3,"0021600067",1610612743,"DEN","Denver","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",4,"0021600068",1610612739,"CLE","Cleveland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",4,"0021600068",1610612738,"BOS","Boston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",5,"0021600069",1610612744,"GSW","Golden State","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-11-03T00:00:00",5,"0021600069",1610612760,"OKC","Oklahoma City","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021600065","0021500970","2016-03-11T00:00:00",1610612753,"Orlando","Magic","ORL",107,1610612758,"Sacramento","Kings","SAC",100],["0021600066","0021501225","2016-04-13T00:00:00",1610612749,"Milwaukee","Bucks","MIL",92,1610612754,"Indiana","Pacers","IND",97],["0021600067","0021500530","2016-01-06T00:00:00",1610612750,"Minnesota","Timberwolves","MIN",74,1610612743,"Denver","Nuggets","DEN",78],["0021600068","0021500922","2016-03-05T00:00:00",1610612739,"Cleveland","Cavaliers","CLE",120,1610612738,"Boston","Celtics","BOS",103],["0021600069","0041500317","2016-05-30T00:00:00",1610612744,"Golden State","Warriors","GSW",96,1610612760,"Oklahoma City","Thunder","OKC",88]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22016","11/03/2016","East","Atlanta",0,0,0,0.0,"0-0","0-0"],[1610612738,"00","22016","11/03/2016","East","Boston",0,0,0,0.0,"0-0","0-0"],[1610612751,"00","22016","11/03/2016","East","Brooklyn",0,0,0,0.0,"0-0","0-0"],[1610612766,"00","22016","11/03/2016","East","Charlotte",0,0,0,0.0,"0-0","0-0"],[1610612741,"00","22016","11/03/2016","East","Chicago",0,0,0,0.0,"0-0","0-0"],[1610612739,"00","22016","11/03/2016","East","Cleveland",0,0,0,0.0,"0-0","0-0"],[1610612765,"00","22016","11/03/2016","East","Detroit",0,0,0,0.0,"0-0","0-0"],[1610612754,"00","22016","11/03/2016","East","Indiana",0,0,0,0.0,"0-0","0-0"],[1610612748,"00","22016","11/03/2016","East","Miami",0,0,0,0.0,"0-0","0-0"],[1610612749,"00","22016","11/03/2016","East","Milwaukee",0,0,0,0.0,"0-0","0-0"],[1610612752,"00","22016","11/03/2016","East","New York",0,0,0,0.0,"0-0","0-0"],[1610612753,"00","22016","11/03/2016","East","Orlando",0,0,0,0.0,"0-0","0-0"],[1610612755,"00","22016","11/03/2016","East","Philadelphia",0,0,0,0.0,"0-0","0-0"],[1610612761,"00","22016","11/03/2016","East","Toronto",0,0,0,0.0,"0-0","0-0"],[1610612764,"00","22016","11/03/2016","East","Washington",0,0,0,0.0,"0-0","0-0"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612742,"00","22016","11/03/2016","West","Dallas",0,0,0,0.0,"0-0","0-0"],[1610612743,"00","22016","11/03/2016","West","Denver",0,0,0,0.0,"0-0","0-0"],[1610612744,"00","22016","11/03/2016","West","Golden State",0,0,0,0.0,"0-0","0-0"],[1610612745,"00","22016","11/03/2016","West","Houston",0,0,0,0.0,"0-0","0-0"],[1610612747,"00","22016","11/03/2016","West","L.A. Lakers",0,0,0,0.0,"0-0","0-0"],[1610612746,"00","22016","11/03/2016","West","LA Clippers",0,0,0,0.0,"0-0","0-0"],[1610612763,"00","22016","11/03/2016","West","Memphis",0,0,0,0.0,"0-0","0-0"],[1610612750,"00","22016","11/03/2016","West","Minnesota",0,0,0,0.0,"0-0","0-0"],[1610612740,"00","22016","11/03/2016","West","New Orleans",0,0,0,0.0,"0-0","0-0"],[1610612760,"00","22016","11/03/2016","West","Oklahoma City",0,0,0,0.0,"0-0","0-0"],[1610612756,"00","22016","11/03/2016","West","Phoenix",0,0,0,0.0,"0-0","0-0"],[1610612757,"00","22016","11/03/2016","West","Portland",0,0,0,0.0,"0-0","0-0"],[1610612758,"00","22016","11/03/2016","West","Sacramento",0,0,0,0.0,"0-0","0-0"],[1610612759,"00","22016","11/03/2016","West","San Antonio",0,0,0,0.0,"0-0","0-0"],[1610612762,"00","22016","11/03/2016","West","Utah",0,0,0,0.0,"0-0","0-0"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021600065",0],["0021600066",0],["0021600067",0],["0021600068",0],["0021600069",0]]}]}';

exports.default = api;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//team: is available to choose this month

var api = {
  ATL: true,
  BKN: true,
  BOS: true,
  CHA: true,
  CHI: true,
  CLE: true,
  DAL: true,
  DEN: true,
  DET: true,
  GSW: true,
  HOU: true,
  IND: true,
  LAC: true,
  LAL: true,
  MEM: true,
  MIA: true,
  MIL: true,
  MIN: true,
  NOP: true,
  NYK: true,
  OKC: true,
  ORL: true,
  PHI: true,
  PHX: true,
  POR: true,
  SAC: true,
  SAS: true,
  TOR: true,
  UTA: true,
  WAS: true
};

exports.default = api;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//dayOfMonth: predictedWinner

var api = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: null,
  11: null,
  12: null,
  13: null,
  14: null,
  15: null,
  16: null,
  17: null,
  18: null,
  19: null,
  20: null,
  21: null,
  22: null,
  23: null,
  24: null,
  25: null,
  26: null,
  27: null,
  28: null,
  29: null,
  30: null,
  31: null
};

exports.default = api;

},{}],15:[function(require,module,exports){
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
    addPrediction: function addPrediction(gameId, teamName, gameDate) {

      //mark previous selection for that day eligible:
      var gameDay = moment(gameDate).format('D');
      var oldPrediction = store.getState().predictedWinners[gameDay];
      store.dispatch(_actionCreators2.default.markEligible(oldPrediction));

      //add new prediction, then mark that team ineligible for rest of month:
      store.dispatch(_actionCreators2.default.addPrediction(gameId, teamName, gameDate));
      store.dispatch(_actionCreators2.default.markIneligible(teamName));
    },
    removePrediction: function removePrediction(gameId, teamName, gameDate) {
      store.dispatch(_actionCreators2.default.removePrediction(gameId, gameDate));
      store.dispatch(_actionCreators2.default.markEligible(teamName));
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

},{"./action-creators.jsx":2,"./components/games-viewer.jsx":6,"./reducers.jsx":17,"babel-polyfill":"babel-polyfill","react":"react","react-dom":"react-dom","react-redux":"react-redux","redux":"redux","redux-thunk":1}],16:[function(require,module,exports){
'use strict';

//translates nba.com JSON into format that I need. eventually, this should be done once on the backend, saved, and then served to the browser in pre-digested form

// (NBA daily data, index of individual game) => my format for game data

Object.defineProperty(exports, "__esModule", {
  value: true
});
var processSingleGame = function processSingleGame(data, index) {
  var gameSummary = {};

  gameSummary.gameId = data.resultSets[1].rowSet[2 * index][2];
  gameSummary.gameDate = data.resultSets[0].rowSet[index][0].substring(0, 10);

  gameSummary.gameStatus = {
    startTime: data.resultSets[0].rowSet[index][4],
    hasStarted: data.resultSets[0].rowSet[index][9] !== 0,
    roadScore: data.resultSets[1].rowSet[2 * index][21],
    homeScore: data.resultSets[1].rowSet[2 * index + 1][21],
    isFinal: data.resultSets[0].rowSet[index][4] === 'Final'
  };

  gameSummary.roadTeam = {
    teamName: data.resultSets[1].rowSet[2 * index][4],
    isWinner: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] > data.resultSets[1].rowSet[2 * index + 1][21],
    isLoser: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] < data.resultSets[1].rowSet[2 * index + 1][21]
  };

  gameSummary.homeTeam = {
    teamName: data.resultSets[1].rowSet[2 * index + 1][4],
    isWinner: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] < data.resultSets[1].rowSet[2 * index + 1][21],
    isLoser: data.resultSets[0].rowSet[index][4] === 'Final' && data.resultSets[1].rowSet[2 * index][21] > data.resultSets[1].rowSet[2 * index + 1][21]
  };

  return gameSummary;
};

//NBA full-day of JSON => array of game objects in my format
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

},{}],17:[function(require,module,exports){
// (State shape at bottom of file)

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _processGames = require('./process-games.jsx');

var _processGames2 = _interopRequireDefault(_processGames);

var _ = require('./data/2016-11-01.js');

var _2 = _interopRequireDefault(_);

var _3 = require('./data/2016-11-02.js');

var _4 = _interopRequireDefault(_3);

var _5 = require('./data/2016-11-03.js');

var _6 = _interopRequireDefault(_5);

var _eligibilityFudge = require('./data/eligibility-fudge.js');

var _eligibilityFudge2 = _interopRequireDefault(_eligibilityFudge);

var _predictionFudge = require('./data/prediction-fudge.js');

var _predictionFudge2 = _interopRequireDefault(_predictionFudge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redux = require('redux');

//Import dummy data:
// import oldData_9 from './data/2015-12-09.js';
// import oldData_10 from './data/2015-12-10.js';
// import oldData_11 from './data/2015-12-11.js';

var initGameData = [(0, _processGames2.default)(_2.default), (0, _processGames2.default)(_4.default), (0, _processGames2.default)(_6.default)];

//user-selected date:
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

var eligibleTeams = function eligibleTeams() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? _eligibilityFudge2.default : arguments[0];
  var action = arguments[1];

  var update = {};
  switch (action.type) {
    case 'MARK_ELIGIBLE':
      update[action.teamName] = true;
      return _extends({}, state, update);
    case 'MARK_INELIGIBLE':
      update[action.teamName] = false;
      return _extends({}, state, update);
    default:
      return state;
  }
};

var predictedWinners = function predictedWinners() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? _predictionFudge2.default : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_PREDICTION':
      {
        var date = moment(action.gameDate).format('D');
        var team = action.teamName;
        var update = {};
        update[date] = team;
        return _extends({}, state, update);
      }
    case 'REMOVE_PREDICTION':
      {
        var _date = moment(action.gameDate).format('D');
        var _update = {};
        _update[_date] = null;
        return _extends({}, state, _update);
      }
    default:
      return state;
  }
};

var gamesByDay = function gamesByDay() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initGameData : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    default:
      return state;
  }
};

var api = {
  app: Redux.combineReducers({
    selectedDate: selectedDate,
    eligibleTeams: eligibleTeams,
    predictedWinners: predictedWinners,
    gamesByDay: gamesByDay
  })
};

exports.default = api;

// {
//   selectedDate: string,
//   eligibleTeams: {
//     ATL: false,
//     BOS: false,...
//   },
//   predictedWinners: {
//     1: 'POR',
//     2: 'NYK',...
//   },
//   gamesByDay: []
// }

},{"./data/2016-11-01.js":10,"./data/2016-11-02.js":11,"./data/2016-11-03.js":12,"./data/eligibility-fudge.js":13,"./data/prediction-fudge.js":14,"./process-games.jsx":16,"redux":"redux"}]},{},[15]);

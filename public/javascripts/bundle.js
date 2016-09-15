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
var api = '{"resource":"scoreboard","parameters":{"GameDate":"12/09/2015","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2015-12-09T00:00:00",1,"0021500319",3,"Final","20151209/CHIBOS",1610612738,1610612741,"2015",4,"     ","ESPN","Q4       - ESPN",1],["2015-12-09T00:00:00",2,"0021500320",3,"Final","20151209/MIACHA",1610612766,1610612748,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",3,"0021500321",3,"Final","20151209/HOUWAS",1610612764,1610612745,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",4,"0021500322",3,"Final","20151209/MEMDET",1610612765,1610612763,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",5,"0021500323",3,"Final","20151209/SASTOR",1610612761,1610612759,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",6,"0021500324",3,"Final","20151209/LACMIL",1610612749,1610612746,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",7,"0021500325",3,"Final","20151209/LALMIN",1610612750,1610612747,"2015",5,"     ",null,"Q5       - ",1],["2015-12-09T00:00:00",8,"0021500326",3,"Final","20151209/ORLPHX",1610612756,1610612753,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",9,"0021500327",3,"Final","20151209/NYKUTA",1610612762,1610612752,"2015",4,"     ",null,"Q4       - ",1],["2015-12-09T00:00:00",10,"0021500328",3,"Final","20151209/ATLDAL",1610612742,1610612737,"2015",4,"     ","ESPN","Q4       - ESPN",1]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2015-12-09T00:00:00",1,"0021500319",1610612741,"CHI","Chicago","11-8",24,30,21,25,0,0,0,0,0,0,0,0,0,0,100,0.429,0.696,0.286,22,50,16],["2015-12-09T00:00:00",1,"0021500319",1610612738,"BOS","Boston","13-9",24,27,24,30,0,0,0,0,0,0,0,0,0,0,105,0.413,0.857,0.217,22,45,12],["2015-12-09T00:00:00",2,"0021500320",1610612748,"MIA","Miami","12-8",17,19,18,27,0,0,0,0,0,0,0,0,0,0,81,0.387,0.708,0.286,17,43,17],["2015-12-09T00:00:00",2,"0021500320",1610612766,"CHA","Charlotte","13-8",27,29,24,19,0,0,0,0,0,0,0,0,0,0,99,0.494,0.471,0.407,27,40,10],["2015-12-09T00:00:00",3,"0021500321",1610612745,"HOU","Houston","11-12",30,26,26,27,0,0,0,0,0,0,0,0,0,0,109,0.482,0.680,0.364,23,42,19],["2015-12-09T00:00:00",3,"0021500321",1610612764,"WAS","Washington","9-11",17,30,36,20,0,0,0,0,0,0,0,0,0,0,103,0.438,0.833,0.200,20,47,18],["2015-12-09T00:00:00",4,"0021500322",1610612763,"MEM","Memphis","13-10",24,19,24,26,0,0,0,0,0,0,0,0,0,0,93,0.466,0.538,0.267,23,53,17],["2015-12-09T00:00:00",4,"0021500322",1610612765,"DET","Detroit","12-11",17,30,27,18,0,0,0,0,0,0,0,0,0,0,92,0.425,0.667,0.276,17,43,12],["2015-12-09T00:00:00",5,"0021500323",1610612759,"SAS","San Antonio","18-5",21,25,16,32,0,0,0,0,0,0,0,0,0,0,94,0.447,0.792,0.280,23,35,17],["2015-12-09T00:00:00",5,"0021500323",1610612761,"TOR","Toronto","14-9",27,26,20,24,0,0,0,0,0,0,0,0,0,0,97,0.578,0.909,0.300,23,34,20],["2015-12-09T00:00:00",6,"0021500324",1610612746,"LAC","LA","13-9",25,22,28,34,0,0,0,0,0,0,0,0,0,0,109,0.469,0.583,0.429,27,51,14],["2015-12-09T00:00:00",6,"0021500324",1610612749,"MIL","Milwaukee","9-14",26,22,20,27,0,0,0,0,0,0,0,0,0,0,95,0.467,0.750,0.200,26,40,11],["2015-12-09T00:00:00",7,"0021500325",1610612747,"LAL","Los Angeles","3-19",32,25,24,33,8,0,0,0,0,0,0,0,0,0,122,0.516,0.630,0.391,19,40,9],["2015-12-09T00:00:00",7,"0021500325",1610612750,"MIN","Minnesota","9-12",35,24,25,30,9,0,0,0,0,0,0,0,0,0,123,0.495,0.774,0.368,30,47,14],["2015-12-09T00:00:00",8,"0021500326",1610612753,"ORL","Orlando","12-10",24,23,26,31,0,0,0,0,0,0,0,0,0,0,104,0.471,0.750,0.480,28,32,16],["2015-12-09T00:00:00",8,"0021500326",1610612756,"PHX","Phoenix","10-13",21,28,35,23,0,0,0,0,0,0,0,0,0,0,107,0.513,0.704,0.250,23,44,18],["2015-12-09T00:00:00",9,"0021500327",1610612752,"NYK","New York","10-13",11,24,24,26,0,0,0,0,0,0,0,0,0,0,85,0.397,0.556,0.381,20,36,10],["2015-12-09T00:00:00",9,"0021500327",1610612762,"UTA","Utah","10-10",29,31,22,24,0,0,0,0,0,0,0,0,0,0,106,0.488,0.826,0.429,26,51,14],["2015-12-09T00:00:00",10,"0021500328",1610612737,"ATL","Atlanta","14-9",22,27,27,22,0,0,0,0,0,0,0,0,0,0,98,0.481,0.778,0.300,26,47,14],["2015-12-09T00:00:00",10,"0021500328",1610612742,"DAL","Dallas","13-10",23,21,28,23,0,0,0,0,0,0,0,0,0,0,95,0.360,0.842,0.226,18,51,9]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[["0021500326",1610612756,1610612753,"2015-12-09T00:00:00",2,0,"Phoenix"],["0021500325",1610612750,1610612747,"2015-12-09T00:00:00",2,1,"Minnesota"],["0021500323",1610612761,1610612759,"2015-12-09T00:00:00",1,1,"Tied"],["0021500327",1610612762,1610612752,"2015-12-09T00:00:00",1,1,"Tied"],["0021500321",1610612764,1610612745,"2015-12-09T00:00:00",1,1,"Tied"],["0021500320",1610612766,1610612748,"2015-12-09T00:00:00",2,2,"Tied"],["0021500322",1610612765,1610612763,"2015-12-09T00:00:00",0,2,"Memphis"],["0021500324",1610612749,1610612746,"2015-12-09T00:00:00",0,2,"LA Clippers"],["0021500319",1610612738,1610612741,"2015-12-09T00:00:00",2,1,"Boston"],["0021500328",1610612742,1610612737,"2015-12-09T00:00:00",0,2,"Atlanta"]]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021500319","0021400591","2015-01-16T00:00:00",1610612738,"Boston","Celtics","BOS",103,1610612741,"Chicago","Bulls","CHI",119],["0021500320","0021500008","2015-10-28T00:00:00",1610612766,"Charlotte","Hornets","CHA",94,1610612748,"Miami","Heat","MIA",104],["0021500321","0021401097","2015-03-29T00:00:00",1610612764,"Washington","Wizards","WAS",91,1610612745,"Houston","Rockets","HOU",99],["0021500322","0021401000","2015-03-17T00:00:00",1610612765,"Detroit","Pistons","DET",105,1610612763,"Memphis","Grizzlies","MEM",95],["0021500323","0021400949","2015-03-10T00:00:00",1610612761,"Toronto","Raptors","TOR",107,1610612759,"San Antonio","Spurs","SAS",117],["0021500324","0021400399","2014-12-20T00:00:00",1610612749,"Milwaukee","Bucks","MIL",102,1610612746,"LA","Clippers","LAC",106],["0021500325","0021500017","2015-10-28T00:00:00",1610612750,"Minnesota","Timberwolves","MIN",112,1610612747,"Los Angeles","Lakers","LAL",111],["0021500326","0021400897","2015-03-04T00:00:00",1610612756,"Phoenix","Suns","PHX",105,1610612753,"Orlando","Magic","ORL",100],["0021500327","0021400950","2015-03-10T00:00:00",1610612762,"Utah","Jazz","UTA",87,1610612752,"New York","Knicks","NYK",82],["0021500328","0011500068","2015-10-16T00:00:00",1610612742,"Dallas","Mavericks","DAL",84,1610612737,"Atlanta","Hawks","ATL",91]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612739,"00","22015","12/09/2015","East","Cleveland",21,14,7,0.667,"10-1","4-6"],[1610612766,"00","22015","12/09/2015","East","Charlotte",21,13,8,0.619,"10-3","3-5"],[1610612737,"00","22015","12/09/2015","East","Atlanta",23,14,9,0.609,"8-4","6-5"],[1610612761,"00","22015","12/09/2015","East","Toronto",23,14,9,0.609,"6-4","8-5"],[1610612754,"00","22015","12/09/2015","East","Indiana",20,12,8,0.6,"6-3","6-5"],[1610612748,"00","22015","12/09/2015","East","Miami",20,12,8,0.6,"10-4","2-4"],[1610612738,"00","22015","12/09/2015","East","Boston",22,13,9,0.591,"7-4","6-5"],[1610612741,"00","22015","12/09/2015","East","Chicago",19,11,8,0.579,"7-3","4-5"],[1610612753,"00","22015","12/09/2015","East","Orlando",22,12,10,0.545,"7-3","5-7"],[1610612765,"00","22015","12/09/2015","East","Detroit",23,12,11,0.522,"8-3","4-8"],[1610612764,"00","22015","12/09/2015","East","Washington",20,9,11,0.45,"4-7","5-4"],[1610612752,"00","22015","12/09/2015","East","New York",23,10,13,0.435,"5-7","5-6"],[1610612749,"00","22015","12/09/2015","East","Milwaukee",23,9,14,0.391,"7-5","2-9"],[1610612751,"00","22015","12/09/2015","East","Brooklyn",21,6,15,0.286,"5-4","1-11"],[1610612755,"00","22015","12/09/2015","East","Philadelphia",22,1,21,0.045,"1-9","0-12"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612744,"00","22015","12/09/2015","West","Golden State",23,23,0,1.0,"10-0","13-0"],[1610612759,"00","22015","12/09/2015","West","San Antonio",23,18,5,0.783,"11-0","7-5"],[1610612760,"00","22015","12/09/2015","West","Oklahoma City",21,13,8,0.619,"9-3","4-5"],[1610612746,"00","22015","12/09/2015","West","LA Clippers",22,13,9,0.591,"9-5","4-4"],[1610612742,"00","22015","12/09/2015","West","Dallas",23,13,10,0.565,"5-4","8-6"],[1610612763,"00","22015","12/09/2015","West","Memphis",23,13,10,0.565,"7-5","6-5"],[1610612762,"00","22015","12/09/2015","West","Utah",20,10,10,0.5,"5-4","5-6"],[1610612745,"00","22015","12/09/2015","West","Houston",23,11,12,0.478,"6-7","5-5"],[1610612756,"00","22015","12/09/2015","West","Phoenix",23,10,13,0.435,"6-5","4-8"],[1610612750,"00","22015","12/09/2015","West","Minnesota",21,9,12,0.429,"3-9","6-3"],[1610612757,"00","22015","12/09/2015","West","Portland",23,9,14,0.391,"5-5","4-9"],[1610612743,"00","22015","12/09/2015","West","Denver",22,8,14,0.364,"3-7","5-7"],[1610612758,"00","22015","12/09/2015","West","Sacramento",23,8,15,0.348,"6-7","2-8"],[1610612740,"00","22015","12/09/2015","West","New Orleans",21,5,16,0.238,"4-6","1-10"],[1610612747,"00","22015","12/09/2015","West","L.A. Lakers",22,3,19,0.136,"1-6","2-13"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021500319",1],["0021500320",1],["0021500323",1],["0021500321",1],["0021500322",1],["0021500325",1],["0021500324",1],["0021500327",1],["0021500326",1],["0021500328",1]]}]}';

exports.default = api;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = '{"resource":"scoreboard","parameters":{"GameDate":"12/09/2016","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[["2016-12-09T00:00:00",1,"0021600337",1,"7:00 pm ET","20161209/ORLCHA",1610612766,1610612753,"2016",0,"     ",null,"Q0       - ",0],["2016-12-09T00:00:00",2,"0021600338",1,"7:30 pm ET","20161209/MIACLE",1610612739,1610612748,"2016",0,"     ",null,"Q0       - ",0],["2016-12-09T00:00:00",3,"0021600339",1,"7:30 pm ET","20161209/TORBOS",1610612738,1610612761,"2016",0,"     ",null,"Q0       - ",0],["2016-12-09T00:00:00",4,"0021600340",1,"8:00 pm ET","20161209/ATLMIL",1610612749,1610612737,"2016",0,"     ",null,"Q0       - ",0],["2016-12-09T00:00:00",5,"0021600341",1,"8:00 pm ET","20161209/HOUOKC",1610612760,1610612745,"2016",0,"     ","ESPN","Q0       - ESPN",0],["2016-12-09T00:00:00",6,"0021600342",1,"8:00 pm ET","20161209/DETMIN",1610612750,1610612765,"2016",0,"     ",null,"Q0       - ",0],["2016-12-09T00:00:00",7,"0021600343",1,"8:30 pm ET","20161209/INDDAL",1610612742,1610612754,"2016",0,"     ",null,"Q0       - ",0],["2016-12-09T00:00:00",8,"0021600344",1,"10:30 pm ET","20161209/PHXLAL",1610612747,1610612756,"2016",0,"     ","ESPN","Q0       - ESPN",0],["2016-12-09T00:00:00",9,"0021600345",1,"10:30 pm ET","20161209/NYKSAC",1610612758,1610612752,"2016",0,"     ",null,"Q0       - ",0]]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[["2016-12-09T00:00:00",1,"0021600337",1610612766,"CHA","Charlotte","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",1,"0021600337",1610612753,"ORL","Orlando","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",2,"0021600338",1610612739,"CLE","Cleveland","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",2,"0021600338",1610612748,"MIA","Miami","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",3,"0021600339",1610612738,"BOS","Boston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",3,"0021600339",1610612761,"TOR","Toronto","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",4,"0021600340",1610612749,"MIL","Milwaukee","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",4,"0021600340",1610612737,"ATL","Atlanta","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",5,"0021600341",1610612745,"HOU","Houston","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",5,"0021600341",1610612760,"OKC","Oklahoma City","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",6,"0021600342",1610612750,"MIN","Minnesota","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",6,"0021600342",1610612765,"DET","Detroit","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",7,"0021600343",1610612754,"IND","Indiana","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",7,"0021600343",1610612742,"DAL","Dallas","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",8,"0021600344",1610612747,"LAL","Los Angeles","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",8,"0021600344",1610612756,"PHX","Phoenix","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",9,"0021600345",1610612758,"SAC","Sacramento","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],["2016-12-09T00:00:00",9,"0021600345",1610612752,"NYK","New York","0-0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[["0021600337","0021501219","2016-04-13T00:00:00",1610612766,"Charlotte","Hornets","CHA",117,1610612753,"Orlando","Magic","ORL",103],["0021600338","0021501033","2016-03-19T00:00:00",1610612739,"Cleveland","Cavaliers","CLE",101,1610612748,"Miami","Heat","MIA",122],["0021600339","0021501057","2016-03-23T00:00:00",1610612738,"Boston","Celtics","BOS",91,1610612761,"Toronto","Raptors","TOR",79],["0021600340","0021501076","2016-03-25T00:00:00",1610612749,"Milwaukee","Bucks","MIL",90,1610612737,"Atlanta","Hawks","ATL",101],["0021600341","0021501145","2016-04-03T00:00:00",1610612760,"Oklahoma City","Thunder","OKC",110,1610612745,"Houston","Rockets","HOU",118],["0021600342","0021500486","2015-12-31T00:00:00",1610612750,"Minnesota","Timberwolves","MIN",90,1610612765,"Detroit","Pistons","DET",115],["0021600343","0021500973","2016-03-12T00:00:00",1610612742,"Dallas","Mavericks","DAL",105,1610612754,"Indiana","Pacers","IND",112],["0021600344","0021501065","2016-03-23T00:00:00",1610612747,"Los Angeles","Lakers","LAL",107,1610612756,"Phoenix","Suns","PHX",119],["0021600345","0021501042","2016-03-20T00:00:00",1610612758,"Sacramento","Kings","SAC",88,1610612752,"New York","Knicks","NYK",80]]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22016","12/09/2016","East","Atlanta",0,0,0,0.0,"0-0","0-0"],[1610612738,"00","22016","12/09/2016","East","Boston",0,0,0,0.0,"0-0","0-0"],[1610612751,"00","22016","12/09/2016","East","Brooklyn",0,0,0,0.0,"0-0","0-0"],[1610612766,"00","22016","12/09/2016","East","Charlotte",0,0,0,0.0,"0-0","0-0"],[1610612741,"00","22016","12/09/2016","East","Chicago",0,0,0,0.0,"0-0","0-0"],[1610612739,"00","22016","12/09/2016","East","Cleveland",0,0,0,0.0,"0-0","0-0"],[1610612765,"00","22016","12/09/2016","East","Detroit",0,0,0,0.0,"0-0","0-0"],[1610612754,"00","22016","12/09/2016","East","Indiana",0,0,0,0.0,"0-0","0-0"],[1610612748,"00","22016","12/09/2016","East","Miami",0,0,0,0.0,"0-0","0-0"],[1610612749,"00","22016","12/09/2016","East","Milwaukee",0,0,0,0.0,"0-0","0-0"],[1610612752,"00","22016","12/09/2016","East","New York",0,0,0,0.0,"0-0","0-0"],[1610612753,"00","22016","12/09/2016","East","Orlando",0,0,0,0.0,"0-0","0-0"],[1610612755,"00","22016","12/09/2016","East","Philadelphia",0,0,0,0.0,"0-0","0-0"],[1610612761,"00","22016","12/09/2016","East","Toronto",0,0,0,0.0,"0-0","0-0"],[1610612764,"00","22016","12/09/2016","East","Washington",0,0,0,0.0,"0-0","0-0"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612742,"00","22016","12/09/2016","West","Dallas",0,0,0,0.0,"0-0","0-0"],[1610612743,"00","22016","12/09/2016","West","Denver",0,0,0,0.0,"0-0","0-0"],[1610612744,"00","22016","12/09/2016","West","Golden State",0,0,0,0.0,"0-0","0-0"],[1610612745,"00","22016","12/09/2016","West","Houston",0,0,0,0.0,"0-0","0-0"],[1610612747,"00","22016","12/09/2016","West","L.A. Lakers",0,0,0,0.0,"0-0","0-0"],[1610612746,"00","22016","12/09/2016","West","LA Clippers",0,0,0,0.0,"0-0","0-0"],[1610612763,"00","22016","12/09/2016","West","Memphis",0,0,0,0.0,"0-0","0-0"],[1610612750,"00","22016","12/09/2016","West","Minnesota",0,0,0,0.0,"0-0","0-0"],[1610612740,"00","22016","12/09/2016","West","New Orleans",0,0,0,0.0,"0-0","0-0"],[1610612760,"00","22016","12/09/2016","West","Oklahoma City",0,0,0,0.0,"0-0","0-0"],[1610612756,"00","22016","12/09/2016","West","Phoenix",0,0,0,0.0,"0-0","0-0"],[1610612757,"00","22016","12/09/2016","West","Portland",0,0,0,0.0,"0-0","0-0"],[1610612758,"00","22016","12/09/2016","West","Sacramento",0,0,0,0.0,"0-0","0-0"],[1610612759,"00","22016","12/09/2016","West","San Antonio",0,0,0,0.0,"0-0","0-0"],[1610612762,"00","22016","12/09/2016","West","Utah",0,0,0,0.0,"0-0","0-0"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[["0021600337",0],["0021600339",0],["0021600340",0],["0021600342",0],["0021600343",0],["0021600345",0],["0021600338",0],["0021600341",0],["0021600344",0]]}]}';

exports.default = api;

},{}],4:[function(require,module,exports){
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
  }
};

exports.default = api;

},{}],5:[function(require,module,exports){
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
  return _react2.default.createElement(
    'div',
    { className: 'row' },
    reduxState.map(function (gameData, index) {
      return _react2.default.createElement(_singleGame2.default, { gameData: gameData, addPrediction: addPrediction, removePrediction: removePrediction, key: index });
    })
  );
};

exports.default = api;

},{"./single-game.jsx":8,"react":"react"}],6:[function(require,module,exports){
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

},{"react":"react"}],7:[function(require,module,exports){
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

},{"./team-message.jsx":9,"react":"react"}],8:[function(require,module,exports){
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

},{"./game-status.jsx":6,"./game-team.jsx":7,"react":"react"}],9:[function(require,module,exports){
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

var fudge = [{
  gameId: 1,
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
  gameId: 2,
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
  gameId: 3,
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
    startTime: '10:30 pm ET',
    hasStarted: false,
    homeScore: null,
    roadScore: null,
    isFinal: false
  }
}, {
  gameId: 4,
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
  gameId: 5,
  roadTeam: {
    teamName: 'CHI',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'MIA',
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
  gameId: 6,
  roadTeam: {
    teamName: 'OKC',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: 'GSW',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 108,
    roadScore: 47,
    isFinal: false
  }
}, {
  gameId: 7,
  roadTeam: {
    teamName: 'BKN',
    isEligible: true,
    isChosen: false,
    isWinner: true,
    isLoser: false
  },
  homeTeam: {
    teamName: 'BOS',
    isEligible: true,
    isChosen: false,
    isWinner: false,
    isLoser: true
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 90,
    roadScore: 97,
    isFinal: true
  }
}, {
  gameId: 8,
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
    isLoser: true
  },
  gameStatus: {
    startTime: '10:00 pm ET',
    hasStarted: true,
    homeScore: 90,
    roadScore: 97,
    isFinal: true
  }
}, {
  gameId: 9,
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
    isWinner: true,
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

},{}],11:[function(require,module,exports){
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

var _actionCreators = require('./action-creators.jsx');

var _actionCreators2 = _interopRequireDefault(_actionCreators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = Redux.createStore(_reducers2.default.gameList, Redux.applyMiddleware(_reduxThunk2.default));
store.subscribe(render);
render();

function render() {
  _reactDom2.default.render(_react2.default.createElement(_gameList2.default, {
    reduxState: store.getState(),
    addPrediction: function addPrediction(gameId, homeVsRoad) {
      store.dispatch(_actionCreators2.default.addPrediction(gameId, homeVsRoad));
    },
    removePrediction: function removePrediction(gameId) {
      store.dispatch(_actionCreators2.default.removePrediction(gameId));
    }
  }), document.getElementById('app-root'));
}

render();

// GameList
//   SingleGame
//     GameTeam (road team)
//       TeamMessage
//     GameStatus
//     GameTeam (home team)
//       TeamMessage

},{"./action-creators.jsx":4,"./components/game-list.jsx":5,"./reducers.jsx":13,"babel-polyfill":"babel-polyfill","react":"react","react-dom":"react-dom","react-redux":"react-redux","redux":"redux","redux-thunk":1}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ = require('./12-09-2015.js');

var _2 = _interopRequireDefault(_);

var _3 = require('./12-09-2016.js');

var _4 = _interopRequireDefault(_3);

var _processGames = require('./process-games.jsx');

var _processGames2 = _interopRequireDefault(_processGames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

var fudge = require('./fudge.js');


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

var gameList = function gameList() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? (0, _processGames2.default)(_4.default) : arguments[0];
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

var api = {
  gameList: gameList
};

exports.default = api;

},{"./12-09-2015.js":2,"./12-09-2016.js":3,"./fudge.js":10,"./process-games.jsx":12,"redux":"redux","redux-thunk":1}]},{},[11]);

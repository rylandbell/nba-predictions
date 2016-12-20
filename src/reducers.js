// (State shape at bottom of file)

'use strict';

const Redux = require('redux');
import _ from 'lodash';
import moment from 'moment';

const teams = ['ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

const enteredText = (state = '', action) => {
  switch(action.type){
    case 'TEXT_ENTRY':
      return action.enteredText;
    case 'SEND_MESSAGE':
      return '';
    default:
      return state;
  }
}

const messages = (state=[], action) => {
  switch(action.type){
    case 'RECEIVE_MESSAGE_LOG':
      if (action.response && action.response.messages) {
        return action.response.messages.reverse();
      } else {
        return [];
      }
    default:
      return state;
  }
}

const isSendingMessage = (state = false, action) => {
  switch(action.type){
    case 'SEND_MESSAGE':
      return true;
    case 'RECEIVE_MESSAGE_LOG':
      return false;
    default:
      return state;
  }
};

const isFetchingMessageLog = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_MESSAGE_LOG_WAITING':
      return true;
    case 'RECEIVE_MESSAGE_LOG':
      return false;
    case 'REQUEST_MESSAGE_LOG_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingPredictions = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_USER_MONTH_WAITING':
      return true;
    case 'RECEIVE_USER_MONTH':
      return false;
    case 'REQUEST_USER_MONTH_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingGameData = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_GAME_DATA_WAITING':
      return true;
    case 'RECEIVE_GAME_DATA':
      return false;
    case 'REQUEST_GAME_DATA_FAILURE':
      return false;
    default:
      return state;
  }
};

const missingUserMonth = (state = false, action) => {
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      return false;
    case 'REQUEST_USER_MONTH_FAILURE':
      if (action.message && action.message === "No userMonth found") {
        return true;
      } else {
        return false;
      }
    default:
      return state;
  }
};

const isFetchingStandingsData = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_STANDINGS_DATA_WAITING':
      return true;
    case 'RECEIVE_STANDINGS_DATA':
      return false;
    case 'REQUEST_STANDINGS_DATA_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingMonthList = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_MONTH_LIST_WAITING':
      return true;
    case 'RECEIVE_MONTH_LIST':
      return false;
    case 'REQUEST_MONTH_LIST_FAILURE':
      return false;
    default:
      return state;
  }
};

const isSendingPrediction = (state = false, action) => {
  switch(action.type){
    case 'SEND_PREDICTION_WAITING':
      return true;
    case 'SEND_PREDICTION_SUCCESS':
      return false;
    case 'SEND_PREDICTION_FAILURE':
      return false;
    default:
      return state;
  }
};

//format: 'YYYY-MM-DD'
const activeDate = (state = '', action) => {
  switch(action.type){
    case 'SET_ACTIVE_DATE':
      return action.month + '-' + (action.day >= 10 ? action.day : '0' + action.day);
    default:
      return state;
  }
};

//format: 'YYYY-MM'
const activeMonth = (state = '', action) => {
  switch(action.type){
    case 'SET_ACTIVE_DATE':
      return action.month;
    case 'CREATE_USER_MONTH_SUCCESS':
      return action.month;
    default:
      return state;
  }
};

const userMonthId = (state = '', action) => {
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      return Object.assign({},action.response.userMonth._id);
    default:
      return state;
  }
};

const eligibleTeams = (state = [], action) => {
  var chosenTeams;
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      chosenTeams = _.values(action.response.userMonth.predictedWinners).map(obj=>obj.teamName);
      return _.difference(teams, chosenTeams).sort();
    case 'SEND_PREDICTION_SUCCESS':
      chosenTeams = _.values(action.response.predictedWinners).map(obj=>obj.teamName);
      return _.difference(teams, chosenTeams).sort();
    default:
      return state;
  }
}

const predictedWinners = (state = {}, action) => {
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      return Object.assign({},action.response.userMonth.predictedWinners);
    case 'SEND_PREDICTION_SUCCESS':
      return Object.assign({}, action.response.predictedWinners);
    default:
      return state;
  }
};

const userMonth = Redux.combineReducers({
  userMonthId,
  eligibleTeams,
  predictedWinners
});

const gamesByDay = (state = [], action) => {
  switch(action.type) {
    case 'RECEIVE_GAME_DATA':
      return _.sortBy(action.response, [function(obj) { return obj.date; }])
    default:
      return state;
  }
};

const standingsData = (state=[], action) => {
  switch(action.type) {
    case 'RECEIVE_STANDINGS_DATA':
      return _.sortBy(action.response, [function(obj) { return obj.standingsData.winCount; }])
        .reverse();
    default:
      return state;
  }
};

const selectedStandingsMonth = (state=moment().format('YYYY-MM'), action) => {
  switch(action.type) {
    case 'SET_STANDINGS_MONTH':
      return action.month
    default:
      return state;
  }
}

//List of months for which the current user has participated. Always includes current month.
const monthList = (state=[], action) => {
  switch(action.type) {
    case 'RECEIVE_MONTH_LIST':
      return action.list;
    default:
      return state;
  }
};

const api = {
  app: Redux.combineReducers({
    enteredText,
    messages,
    monthList,
    selectedStandingsMonth,
    standingsData,
    isFetchingGameData,
    isFetchingStandingsData,
    isFetchingMonthList,
    isFetchingPredictions,
    isFetchingMessageLog,
    isSendingPrediction,
    isSendingMessage,
    missingUserMonth,
    activeMonth,
    activeDate,
    userMonth,
    gamesByDay
  })
};

export default api;

// {
//   isFetchingGameData,
//   isFetchingPredictions,
//   isSendingPrediction,
//   activeDate: string,
//   activeMonth: '2016-11',
//   userMonth: {
//     userMonthId: string
//     eligibleTeams: {
//       ATL: false,
//       BOS: false,...
//     },
//     predictedWinners: {
//       1: 'POR',
//       2: 'NYK',...
//     }
//   },
//   gamesByDay: []
// }
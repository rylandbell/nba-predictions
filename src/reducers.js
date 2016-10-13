// (State shape at bottom of file)

'use strict';

const Redux = require('redux');
import _ from 'lodash';

const teams = ['ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

const showError = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_USER_MONTH_FAILURE':
      return true;
    case 'REQUEST_GAME_DATA_FAILURE':
      return true;
    case 'SEND_PREDICTION_FAILURE':
      return true;
    default:
      return state;
  }
};

const message = (state = '', action) => {
  switch(action.type){
    case 'REQUEST_USER_MONTH_FAILURE':
      return 'Invalid month: Unable to find userMonth object.';
    case 'REQUEST_GAME_DATA_FAILURE':
      return 'Invalid month: Unable to find gameData object.';
    case 'SEND_PREDICTION_FAILURE':
      return 'Latest prediction was not successfully sent.'
    default:
      return state;
  }
};

const errorMessage = Redux.combineReducers({
  showError,
  message
});

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

//user-selected date:
const visibleDate = (state = '', action) => {
  switch(action.type){
    case 'SET_ACTIVE_MONTH':
      return action.month+'-01';
    case 'GO_TO_DATE':
      return action.date;
    case 'DAY_FORWARD':
      var nextDay = moment(state).add(1, 'days').format('YYYY-MM-DD');
      if (moment(nextDay).format('MM') === moment(state).format('MM')){
        return nextDay;
      } else {
        return state
      }
    case 'DAY_BACK':
      var previousDay = moment(state).subtract(1, 'days').format('YYYY-MM-DD');
      if (moment(previousDay).format('MM') === moment(state).format('MM')){
        return previousDay;
      } else {
        return state
      }
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

const activeMonth = (state = '', action) => {
  switch(action.type){
    case 'SET_ACTIVE_MONTH':
      return action.month;
    default:
      return state;
  }
};

const eligibleTeams = (state = [], action) => {
  var chosenTeams;
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      chosenTeams = _.values(action.response.userMonth.predictedWinners);
      return _.difference(teams, chosenTeams).sort();
    case 'MARK_ELIGIBLE':
      if(action.teamName){
        return state.concat([action.teamName]).sort();
      } else {
        return state;
      }
    case 'MARK_INELIGIBLE':
      return _.without(state,action.teamName).sort();
    default:
      return state;
  }
}

const predictedWinners = (state = {}, action) => {
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      return Object.assign({},action.response.userMonth.predictedWinners);
    case 'ADD_PREDICTION': {
      const date = moment(action.gameDate).format('D');
      const team = action.teamName;
      const update = {};
      update[date] = team;
      return Object.assign({}, state, update);
    }
    case 'REMOVE_PREDICTION': {
      const date = moment(action.gameDate).format('D');
      const update = {};
      update[date] = null;
      return Object.assign({}, state, update);
    }
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

const api = {
  app: Redux.combineReducers({
    errorMessage,
    isFetchingGameData,
    isFetchingPredictions,
    isSendingPrediction,
    activeMonth,
    visibleDate,
    userMonth,
    gamesByDay
  })
};

export default api;

// {
//   isFetchingGameData,
//   isFetchingPredictions,
//   isSendingPrediction,
//   visibleDate: string,
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
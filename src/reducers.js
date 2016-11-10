// (State shape at bottom of file)

'use strict';

const Redux = require('redux');
import _ from 'lodash';

const teams = ['ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

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
    // case 'MARK_ELIGIBLE':
    //   if(action.teamName){
    //     return state.concat([action.teamName]).sort();
    //   } else {
    //     return state;
    //   }
    // case 'MARK_INELIGIBLE':
    //   return _.without(state,action.teamName).sort();
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
    // case 'ADD_PREDICTION': {
    //   const date = moment(action.gameDate).format('D');
    //   const team = action.teamName;
    //   const update = {};
    //   update[date] = Object.assign({}, state[date], {teamName: team});
    //   return Object.assign({}, state, update);
    // }
    // case 'REMOVE_PREDICTION': {
    //   const date = moment(action.gameDate).format('D');
    //   const update = {};
    //   update[date] = Object.assign({}, state[date], {teamName: null});
    //   return Object.assign({}, state, update);
    // }
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
      // return action.response;
      return _.sortBy(action.response, [function(obj) { return obj.standingsData.winCount; }])
        .reverse();
    default:
      return state;
  }
}

const api = {
  app: Redux.combineReducers({
    standingsData,
    isFetchingGameData,
    isFetchingStandingsData,
    isFetchingPredictions,
    isSendingPrediction,
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
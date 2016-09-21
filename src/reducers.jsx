// (State shape at bottom of file)

'use strict';

var Redux = require('redux');
import _ from 'lodash';

import processGames from './process-games.jsx';

//Import dummy data:
// import oldData_9 from './data/2015-12-09.jsx';
// import oldData_10 from './data/2015-12-10.jsx';
// import oldData_11 from './data/2015-12-11.jsx';
import freshData_1 from './data/2016-11-01.jsx';
import freshData_2 from './data/2016-11-02.jsx';
import freshData_3 from './data/2016-11-03.jsx';
const initGameData = [
  processGames(freshData_1),
  processGames(freshData_2),
  processGames(freshData_3)
];

const teams = ['ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

//user-selected date:
const visibleDate = (state = '2016-11-01', action) => {
  switch(action.type){
    case 'DAY_FORWARD':
      return moment(state).add(1, 'days').format('YYYY-MM-DD');
    case 'DAY_BACK':
      return moment(state).subtract(1, 'days').format('YYYY-MM-DD');
    default:
      return state;
  }
};

const month = (state = '', action) => {
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      return action.response.userMonth.month;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
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
      return action.response.userMonth.predictedWinners;
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
  month,
  isFetching,
  eligibleTeams,
  predictedWinners
});

const gamesByDay = (state = initGameData, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const api = {
  app: Redux.combineReducers({
    visibleDate,
    userMonth,
    gamesByDay
  })
};

export default api;

// {
//   visibleDate: string,
//   userMonth: {
//     isFetching: false,
//     month: '2016_09',
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
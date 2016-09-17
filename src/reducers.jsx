// (State shape at bottom of file)

'use strict';

var Redux = require('redux');

import processGames from './process-games.jsx';

//Import dummy data:
// import oldData_9 from './data/2015-12-09.jsx';
// import oldData_10 from './data/2015-12-10.jsx';
// import oldData_11 from './data/2015-12-11.jsx';
import freshData_1 from './data/2016-11-01.jsx';
import freshData_2 from './data/2016-11-02.jsx';
import freshData_3 from './data/2016-11-03.jsx';
import eligibilityFudge from './data/eligibility-fudge.jsx';
import predictionFudge from './data/prediction-fudge.jsx';
const initGameData = [
  processGames(freshData_1),
  processGames(freshData_2),
  processGames(freshData_3)
];

//user-selected date:
const selectedDate = (state = '2016-11-01', action) => {
  switch(action.type){
    case 'DAY_FORWARD':
      return moment(state).add(1, 'days').format('YYYY-MM-DD');
    case 'DAY_BACK':
      return moment(state).subtract(1, 'days').format('YYYY-MM-DD');
    default:
      return state;
  }
};

const eligibleTeams = (state = eligibilityFudge, action) => {
  const update = {};
  switch(action.type){
    case 'MARK_ELIGIBLE':
      update[action.teamName] = true;
      return Object.assign({}, state, update);
    case 'MARK_INELIGIBLE':
      update[action.teamName] = false;
      return Object.assign({}, state, update);
    default:
      return state;
  }
};

const predictedWinners = (state = predictionFudge, action) => {
  switch(action.type){
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

const gamesByDay = (state = initGameData, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const api = {
  app: Redux.combineReducers({
    selectedDate,
    eligibleTeams,
    predictedWinners,
    gamesByDay
  })
};

export default api;

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
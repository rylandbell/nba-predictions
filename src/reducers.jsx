// State shape:

// {
//   selectedDate: string,
//   eligibleTeams: {
//     'ATL': false,
//     'BOS': false,...
//   },
//   predictedWinners: {
//     1: 'POR',
//     2: 'NYK',...
//   },
//   gamesByDay: [
//     singleDayGameList: [
//       singleGame: {
//         gameDate: string
//         gameId: string,
//         homeTeam: {...},
//         roadTeam: {...},
//         gameStatus: {...}
//       }
//     ]
//   ]  
// }

'use strict';

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

import processGames from './process-games.jsx';

//Import dummy data:
import oldData_9 from './data/2015-12-09.js';
import oldData_10 from './data/2015-12-10.js';
import oldData_11 from './data/2015-12-11.js';
import freshData_1 from './data/2016-11-01.js';
import freshData_2 from './data/2016-11-02.js';
import freshData_3 from './data/2016-11-03.js';
import eligibilityFudge from './data/eligibility-fudge.js';
import predictionFudge from './data/prediction-fudge.js';

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
}

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
}

const predictedWinners = (state = predictionFudge, action) => {
  const date = moment(action.gameDate).format('D');
  const team = action.predictedWinner;
  const update = {};
  switch(action.type){
    case 'ADD_PREDICTION':
      update[date] = team;
      return Object.assign({}, state, update);
    case 'REMOVE_PREDICTION':
      update[date] = null;
      return Object.assign({}, state, update);
    default:
      return state;
  }
}

//~~~~~~~~~~~BEGIN single-game data~~~~~~~~~~~
const gameId = (state = null, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const gameDate = (state = null, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const homeTeam = (state = {}, action) => {
  switch(action.type){
    // case 'ADD_PREDICTION':
    //   if(action.predictedWinner===state.teamName){
    //     return Object.assign({}, state, {isChosen:true});
    //   } else {
    //     return Object.assign({}, state, {isChosen:false});
    //   }
    // case 'REMOVE_PREDICTION':
    //   return Object.assign({}, state, {isChosen:false});
    default:
      return state;
  }
}

const roadTeam = (state = {}, action) => {
  switch(action.type){
    // case 'ADD_PREDICTION':  
    //   if(action.predictedWinner===state.teamName){
    //     return Object.assign({}, state, {isChosen:true});
    //   } else {
    //     return Object.assign({}, state, {isChosen:false});
    //   }
    // case 'REMOVE_PREDICTION':
    //   return Object.assign({}, state, {isChosen:false});
    default:
      return state;
  }
}

const gameStatus = (state = {}, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const singleGame = Redux.combineReducers({
  gameDate,
  gameId,
  homeTeam,
  roadTeam,
  gameStatus
});

//~~~~~~~~~~~~~~END single-game data~~~~~~~~~~~~~~~~

const singleDayGameList = (state = {}, action) => {
  switch(action.type){
    // case 'ADD_PREDICTION':
    //   return state.map(game => singleGame(game,action));
    // case 'REMOVE_PREDICTION':
    //   return state.map(game => singleGame(game,action));
    default:
      return state;
  }
}

const gamesByDay = (state = [
  processGames(freshData_1),
  processGames(freshData_2),
  processGames(freshData_3)
], action) => {
  switch(action.type) {

    //*_PREDICTION actions are only passed along to the day of the prediction
    // case 'ADD_PREDICTION':
    //   return state.map(day => {
    //     if(action.gameDate === day[0].gameDate){
    //       return singleDayGameList(day, action);
    //     } else {
    //       return day;
    //     }
    //   });
    // case 'REMOVE_PREDICTION':
    //   return state.map(day => {
    //     if(action.gameDate === day[0].gameDate){
    //       return singleDayGameList(day, action);
    //     } else {
    //       return day;
    //     }
    //   });
    default:
      return state;
  }
}

const api = {
  app: Redux.combineReducers({
    selectedDate,
    eligibleTeams,
    predictedWinners,
    gamesByDay
  })
}

export default api;
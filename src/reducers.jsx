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

const gameId = (state = null, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const homeTeam = (state = {}, action) => {
  switch(action.type){
    case 'ADD_PREDICTION':
      if(action.winner==='homeTeam'){
        return Object.assign({}, state, {isChosen:true});
      } else {
        return Object.assign({}, state, {isChosen:false});
      }
    case 'REMOVE_PREDICTION':
      return Object.assign({}, state, {isChosen:false});
    default:
      return state;
  }
}

const roadTeam = (state = {}, action) => {
  switch(action.type){
    case 'ADD_PREDICTION':  
      if(action.winner==='roadTeam'){
        return Object.assign({}, state, {isChosen:true});
      } else {
        return Object.assign({}, state, {isChosen:false});
      }
    case 'REMOVE_PREDICTION':
      return Object.assign({}, state, {isChosen:false});
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

const singleGame = (state = {}, action) => {

  //check which game the action belongs to, and only call subreducers in the case of a match:
  if (action.gameId===state.gameId){
    return {
      gameId: gameId(state.gameId, action),
      homeTeam: homeTeam(state.homeTeam, action),
      roadTeam: roadTeam(state.roadTeam, action),
      gameStatus: gameStatus(state.gameStatus, action)
    }
  } else {
    return state;
  }
}

const singleDayGameList = (state = {}, action) => {
  switch(action.type){
    case 'ADD_PREDICTION':
      return state.map(game => singleGame(game,action));
    case 'REMOVE_PREDICTION':
      return state.map(game => singleGame(game,action));
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
    case 'ADD_PREDICTION':
      return state.map(day => singleDayGameList(day, action));
    case 'REMOVE_PREDICTION':
      return state.map(day => singleDayGameList(day, action));
    default:
      return state;
  }
}

const api = {
  app: Redux.combineReducers({
    selectedDate,
    gamesByDay
  })
}

export default api;
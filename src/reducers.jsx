'use strict';

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

var fudge = require('./data/fudge.js');
import oldData from './data/2015-12-09.js';
import futureData from './data/2016-12-09.js';
import processGames from './process-games.jsx';

const selectedDate = (state = '2015-12-09', action) => {
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

const gameList = (state = processGames(futureData), action) => {
  switch(action.type){
    case 'ADD_PREDICTION':
      return state.map(game => singleGame(game,action));
    case 'REMOVE_PREDICTION':
      return state.map(game => singleGame(game,action));
    default:
      return state;
  }
}

const api = {
  app: Redux.combineReducers({
    gameList,
    selectedDate
  })
}

export default api;
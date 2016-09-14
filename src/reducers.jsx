'use strict';

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

var fudge = require('./fudge.js');

const homeTeam = (state = fudge.homeTeam, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const roadTeam = (state = fudge.roadTeam, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const gameStatus = (state = fudge.gameStatus, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const api = {
  singleGame: Redux.combineReducers({
    homeTeam: homeTeam,
    roadTeam: roadTeam,
    gameStatus: gameStatus
  })
}

export default api;
'use strict';

var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

var fudge = require('./fudge.js');

const homeTeam = (state, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const roadTeam = (state, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const gameStatus = (state, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const singleGame = Redux.combineReducers({
  homeTeam: homeTeam,
  roadTeam: roadTeam,
  gameStatus: gameStatus
});

const gameList = (state = fudge, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const api = {
  gameList: gameList
}

export default api;
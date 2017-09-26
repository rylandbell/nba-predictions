'use strict';

const Redux = require('redux');

const isSendingMessage = (state = false, action) => {
  switch(action.type){
    case 'SEND_MESSAGE_PENDING':
      return true;
    case 'SEND_MESSAGE_SUCCESS':
      return false;
    case 'SEND_MESSAGE_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingMessageLog = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_MESSAGE_LOG_PENDING':
      return true;
    case 'REQUEST_MESSAGE_LOG_SUCCESS':
      return false;
    case 'REQUEST_MESSAGE_LOG_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingUserData = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_USER_DATA_PENDING':
      return true;
    case 'REQUEST_USER_DATA_SUCCESS':
      return false;
    case 'REQUEST_USER_DATA_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingUserMonthData = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_USER_MONTH_DATA_PENDING':
      return true;
    case 'REQUEST_USER_MONTH_DATA_SUCCESS':
      return false;
    case 'REQUEST_USER_MONTH_DATA_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingGameData = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_GAME_DATA_PENDING':
      return true;
    case 'REQUEST_GAME_DATA_SUCCESS':
      return false;
    case 'REQUEST_GAME_DATA_FAILURE':
      return false;
    default:
      return state;
  }
};

const missingUserMonth = (state = false, action) => {
  switch(action.type){
    case 'CREATE_USER_MONTH_SUCCESS':
      return false;
    case 'REQUEST_USER_MONTH_DATA_SUCCESS':
      return false;
    case 'REQUEST_USER_MONTH_DATA_FAILURE':
      if (action.payload && action.payload.message === "No userMonth found") {
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
    case 'REQUEST_STANDINGS_DATA_PENDING':
      return true;
    case 'REQUEST_STANDINGS_DATA_SUCCESS':
      return false;
    case 'REQUEST_STANDINGS_DATA_FAILURE':
      return false;
    default:
      return state;
  }
};

const isFetchingMonthList = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_MONTH_LIST_PENDING':
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
    case 'SEND_PREDICTION_PENDING':
      return true;
    case 'SEND_PREDICTION_SUCCESS':
      return false;
    case 'SEND_PREDICTION_FAILURE':
      return false;
    default:
      return state;
  }
};

const isSendingCreateLeague = (state = false, action) => {
  switch(action.type){
    case 'CREATE_LEAGUE_PENDING':
      return true;
    case 'CREATE_LEAGUE_SUCCESS':
      return false;
    case 'CREATE_LEAGUE_FAILURE':
      return false;
    default:
      return state;
  }
};

const isSendingJoinLeague = (state = false, action) => {
  switch(action.type){
    case 'JOIN_LEAGUE_PENDING':
      return true;
    case 'JOIN_LEAGUE_SUCCESS':
      return false;
    case 'JOIN_LEAGUE_FAILURE':
      return false;
    default:
      return state;
  }
};

const fetchStatus = Redux.combineReducers({
  isFetchingUserData,
  isFetchingUserMonthData,
  isSendingPrediction,
  isSendingMessage,
  isFetchingGameData,
  isFetchingStandingsData,
  isFetchingMonthList,
  isFetchingMessageLog,
  isSendingCreateLeague,
  isSendingJoinLeague,
  missingUserMonth
});


export default fetchStatus;

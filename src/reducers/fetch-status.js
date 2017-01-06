'use strict';

const Redux = require('redux');

const isSendingMessage = (state = false, action) => {
  switch(action.type){
    case 'SEND_MESSAGE':
      return true;
    case 'RECEIVE_MESSAGE_LOG':
      return false;
    default:
      return state;
  }
};

const isFetchingMessageLog = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_MESSAGE_LOG_WAITING':
      return true;
    case 'RECEIVE_MESSAGE_LOG':
      return false;
    case 'REQUEST_MESSAGE_LOG_FAILURE':
      return false;
    default:
      return state;
  }
};

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

const missingUserMonth = (state = false, action) => {
  switch(action.type){
    case 'RECEIVE_USER_MONTH':
      return false;
    case 'REQUEST_USER_MONTH_FAILURE':
      if (action.message && action.message === "No userMonth found") {
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

const isFetchingMonthList = (state = false, action) => {
  switch(action.type){
    case 'REQUEST_MONTH_LIST_WAITING':
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

const fetchStatus = Redux.combineReducers({
  isFetchingPredictions,
  isSendingPrediction,
  isSendingMessage,
  isFetchingGameData,
  isFetchingStandingsData,
  isFetchingMonthList,
  isFetchingMessageLog,
  missingUserMonth
});


export default fetchStatus;

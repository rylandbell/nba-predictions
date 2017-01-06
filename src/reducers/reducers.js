// (State shape at bottom of file)

'use strict';

const Redux = require('redux');
import _values from 'lodash/values';
import _difference from 'lodash/difference';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';

import fetchStatus from './fetch-status.js';

const teams = ['ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

const enteredText = (state = '', action) => {
  switch(action.type){
    case 'TEXT_ENTRY':
      return action.enteredText;
    case 'SEND_MESSAGE':
      return '';
    default:
      return state;
  }
}

const messages = (state=[], action) => {
  switch(action.type){
    case 'RECEIVE_MESSAGE_LOG':
      if (action.response && action.response.messages) {
        return action.response.messages.reverse();
      } else {
        return [];
      }
    default:
      return state;
  }
}

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
    case 'CREATE_USER_MONTH_SUCCESS':
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
      chosenTeams = _values(action.response.userMonth.predictedWinners).map(obj=>obj.teamName);
      return _difference(teams, chosenTeams).sort();
    case 'SEND_PREDICTION_SUCCESS':
      chosenTeams = _values(action.response.predictedWinners).map(obj=>obj.teamName);
      return _difference(teams, chosenTeams).sort();
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
      return _sortBy(action.response, [function(obj) { return obj.date; }])
    default:
      return state;
  }
};

const standingsData = (state=[], action) => {
  switch(action.type) {
    case 'RECEIVE_STANDINGS_DATA':
      return _sortBy(action.response, [function(obj) { return obj.standingsData.winCount; }])
        .reverse();
    default:
      return state;
  }
};

const selectedStandingsMonth = (state=moment().format('YYYY-MM'), action) => {
  switch(action.type) {
    case 'SET_STANDINGS_MONTH':
      return action.month
    default:
      return state;
  }
}

//List of months for which the current user has participated. Always includes current month.
const monthList = (state=[], action) => {
  switch(action.type) {
    case 'RECEIVE_MONTH_LIST':
      return action.list;
    default:
      return state;
  }
};

const api = {
  app: Redux.combineReducers({
    fetchStatus,
    enteredText,
    messages,
    monthList,
    selectedStandingsMonth,
    standingsData,
    activeMonth,
    activeDate,
    userMonth,
    gamesByDay
  })
};

export default api;

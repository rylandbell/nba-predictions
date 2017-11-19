// (State shape at bottom of file)

'use strict';

const Redux = require('redux');
import _values from 'lodash/values';
import _difference from 'lodash/difference';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';

import fetchStatus from './fetch-status.js';

const teams = ['ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

const enteredChatText = (state = '', action) => {
  switch(action.type){
    case 'CHAT_TEXT_ENTRY':
      return action.enteredChatText;
    case 'SEND_MESSAGE_PENDING':
      return '';
    default:
      return state;
  }
}

const enteredLeagueName = (state = '', action) => {
  switch(action.type){
    case 'LEAGE_NAME_ENTRY':
      return action.payload;
    case 'CREATE_LEAGUE_PENDING':
      return '';
    default:
      return state;
  }
}

const enteredJoinPhrase = (state = '', action) => {
  switch(action.type){
    case 'LEAGUE_ID_ENTRY':
      return action.payload;
    case 'JOIN_LEAGUE_PENDING':
      return '';
    default:
      return state;
  }
}

const user = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_USER_DATA':
      return action.payload;
    default:
      return state;
  }
}

const noLeaguesJoined = (state = false, action) => {
  switch(action.type) {
    case 'ADD_USER_DATA':
      if(action.payload.leagues && action.payload.leagues.length < 1) {
        return true;
      } else {
        return false;
      }
    default:
      return state;
  }
}

const activeLeagueId = (state = '', action) => {
  switch(action.type) {
    case 'SET_ACTIVE_LEAGUE':
      return action.payload;
    default:
      return state;
  }
}

const messages = (state=[], action) => {
  switch(action.type){
    case 'ADD_MESSAGE_LOG':
      if (action.payload && action.payload.messages) {
        return action.payload.messages.reverse();
      } else {
        return [];
      }
    default:
      return state;
  }
}

//format: 'YYYY-MM-DD'
const activeDate = (state = moment().format('YYYY-MM-DD'), action) => {
  switch(action.type){
    case 'SET_ACTIVE_DATE':
      return action.date;
    default:
      return state;
  }
};

//format: 'YYYY-MM'
const activeMonth = (state = moment().format('YYYY-MM'), action) => {
  switch(action.type){
    case 'SET_ACTIVE_DATE':
      return action.date.substring(0,7);
    case 'SET_ACTIVE_MONTH':
      return action.month;
    default:
      return state;
  }
};

const currentDate = (state = moment().format('YYYY-MM-DD')) => {
  return state;
}

const currentMonth = (state = moment().format('YYYY-MM')) => {
  return state;
}

// User months:

// store all userMonths for active league
const userMonthsData = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER_MONTH_DATA':
      return action.payload;
    default:
      return state;
  }
}

const userMonthId = (state = '', action) => {
  switch(action.type){
    case 'ADD_USER_MONTH_DATA':
      return action.payload[0]._id;
    default:
      return state;
  }
};

const eligibleTeams = (state = [], action) => {
  var chosenTeams;
  switch(action.type){
    case 'ADD_USER_MONTH_DATA':
      chosenTeams = _values(action.payload[0].predictedWinners).map(obj=>obj.teamName);
      return _difference(teams, chosenTeams).sort();
    case 'SEND_PREDICTION_SUCCESS':
      chosenTeams = _values(action.payload.predictedWinners).map(obj=>obj.teamName);
      return _difference(teams, chosenTeams).sort();
    default:
      return state;
  }
}

const predictedWinners = (state = {}, action) => {
  switch(action.type){
    case 'ADD_USER_MONTH_DATA':
      return Object.assign({},action.payload[0].predictedWinners);
    case 'SEND_PREDICTION_SUCCESS':
      return Object.assign({}, action.payload.predictedWinners);
    default:
      return state;
  }
};

const activeUserMonth = Redux.combineReducers({
  userMonthId,
  eligibleTeams,
  predictedWinners
});

const gamesByDay = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GAME_DATA':
      return _sortBy(action.payload, [function(obj) { return obj.date; }])
    default:
      return state;
  }
};

const standingsData = (state=[], action) => {
  switch(action.type) {
    case 'ADD_STANDINGS_DATA':
      return _sortBy(action.payload, [function(obj) { return obj.standingsData.winCount; }])
        .reverse();
    default:
      return state;
  }
};

//List of months for which the current user has participated. Always includes current month.
const monthList = (state=[], action) => {
  switch(action.type) {
    case 'RECEIVE_MONTH_LIST':
      return action.list;
    default:
      return state;
  }
};

const showDashboardTour = (state = false, action) => {
  switch(action.type) {
    case 'ENABLE_DASHBOARD_TOUR':
      return true;
    case 'DISABLE_DASHBOARD_TOUR':
      return false;
    default:
      return state;
  }
}

const showPicksTour = (state = false, action) => {
  switch(action.type) {
    case 'ENABLE_PICKS_TOUR':
      return true;
    case 'DISABLE_PICKS_TOUR':
      return false;
    default:
      return state;
  }
}

const api = {
  app: Redux.combineReducers({
    fetchStatus,
    userMonthsData,
    activeUserMonth,
    enteredChatText,
    enteredLeagueName,
    enteredJoinPhrase,
    user,
    noLeaguesJoined,
    activeLeagueId,
    messages,
    monthList,
    standingsData,
    activeMonth,
    activeDate,
    currentMonth,
    currentDate,
    gamesByDay,
    showDashboardTour,
    showPicksTour
  })
};

export default api;

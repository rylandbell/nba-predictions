"use strict";

import { combineReducers } from 'redux';
import _sortBy from "lodash/sortBy";

import * as fetchStatusReducers from "./fetch-status.js";
import * as uiReducers from './ui';
import * as dateReducers from './dates';

const ui = combineReducers(uiReducers);
const dates = combineReducers(dateReducers);
const fetchStatus = combineReducers(fetchStatusReducers);

const user = (state = {}, action) => {
  switch (action.type) {
    case "ADD_USER_DATA":
      return action.payload;
    default:
      return state;
  }
};

const noLeaguesJoined = (state = false, action) => {
  switch (action.type) {
    case "ADD_USER_DATA":
      if (action.payload.leagues && action.payload.leagues.length < 1) {
        return true;
      } else {
        return false;
      }
    default:
      return state;
  }
};

const activeLeagueId = (state = "", action) => {
  switch (action.type) {
    case "SET_ACTIVE_LEAGUE":
      return action.payload;
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case "ADD_MESSAGE_LOG":
      if (action.payload && action.payload.messages) {
        return action.payload.messages.reverse();
      } else {
        return [];
      }
    default:
      return state;
  }
};



// store all userMonths for active league
const userMonthsData = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER_MONTH_DATA":
      return action.payload;
    case "SEND_PREDICTION_SUCCESS":
      return state.map(
        userMonth =>
          userMonth._id === action.payload._id ? action.payload : userMonth
      );
    default:
      return state;
  }
};

const gamesByDay = (state = [], action) => {
  switch (action.type) {
    case "ADD_GAME_DATA":
      return _sortBy(action.payload, [
        function(obj) {
          return obj.date;
        }
      ]);
    default:
      return state;
  }
};

const standingsData = (state = [], action) => {
  switch (action.type) {
    case "ADD_STANDINGS_DATA":
      return _sortBy(action.payload, [
        function(obj) {
          return obj.standingsData.winCount;
        }
      ]).reverse();
    default:
      return state;
  }
};

//List of months for which the current user has participated. Always includes current month.
const monthList = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_MONTH_LIST":
      return action.list;
    default:
      return state;
  }
};

const api = {
  app: combineReducers({
    ui,
    dates,
    fetchStatus,
    userMonthsData,
    user,
    noLeaguesJoined,
    activeLeagueId,
    messages,
    monthList,
    standingsData,
    gamesByDay
  })
};

export default api;

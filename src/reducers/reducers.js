"use strict";

import { combineReducers } from 'redux';

import * as fetchStatusReducers from "./fetch-status.js";
import * as uiReducers from './ui';
import * as dateReducers from './dates';
import * as apiDataReducers from './api-data';

const ui = combineReducers(uiReducers);
const dates = combineReducers(dateReducers);
const fetchStatus = combineReducers(fetchStatusReducers);
const apiData = combineReducers(apiDataReducers);

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
    apiData,
    noLeaguesJoined,
    activeLeagueId,
    monthList,
  })
};

export default api;

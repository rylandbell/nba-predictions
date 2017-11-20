"use strict";

import { combineReducers } from 'redux';

import * as fetchStatusReducers from "./fetch-status.js";
import * as uiReducers from './ui';
import * as dateReducers from './dates';
import * as apiDataReducers from './api-data';

export const ui = combineReducers(uiReducers);
export const dates = combineReducers(dateReducers);
export const fetchStatus = combineReducers(fetchStatusReducers);
export const apiData = combineReducers(apiDataReducers);

export const noLeaguesJoined = (state = false, action) => {
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

export const activeLeagueId = (state = "", action) => {
  switch (action.type) {
    case "SET_ACTIVE_LEAGUE":
      return action.payload;
    default:
      return state;
  }
};

// const api = {
//   app: combineReducers({
//     ui,
//     dates,
//     fetchStatus,
//     apiData,
//     noLeaguesJoined,
//     activeLeagueId,
//     monthList,
//   })
// };

// export default api;

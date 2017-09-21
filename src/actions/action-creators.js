'use strict';

export const requestUserData = () => ({
  type: 'API',
  payload: {
    url: '/api/league',
    method: 'GET',
    success: 'REQUEST_USER_DATA_SUCCESS',
    failure: 'REQUEST_USER_DATA_FAILURE',
    pending: 'REQUEST_USER_DATA_PENDING'
  }
});

export const addUserData = (data) => ({
  type: 'ADD_USER_DATA',
  payload: data
});

export const requestStandingsData = (month) => ({
  type: 'API',
  payload: {
    url: `/api/userMonth/all-public/${month}`,
    method: 'GET',
    success: 'REQUEST_STANDINGS_DATA_SUCCESS',
    failure: 'REQUEST_STANDINGS_DATA_FAILURE',
    pending: 'REQUEST_STANDINGS_DATA_PENDING'
  }
});

export const addStandingsData = (data) => ({
  type: 'ADD_STANDINGS_DATA',
  payload: data
});

export const requestUserMonthData = (month) => ({
  type: 'API',
  payload: {
    url: `/api/userMonth/${month}`,
    method: 'GET',
    success: 'REQUEST_USER_MONTH_DATA_SUCCESS',
    failure: 'REQUEST_USER_MONTH_DATA_FAILURE',
    pending: 'REQUEST_USER_MONTH_DATA_PENDING'
  }
});

export const addUserMonthData = (data) => ({
  type: 'ADD_USER_MONTH_DATA',
  payload: data
});

export const requestGameData = (month) => ({
  type: 'API',
  payload: {
    url: `/api/dailyGamesData/${month}`,
    method: 'GET',
    success: 'REQUEST_GAME_DATA_SUCCESS',
    failure: 'REQUEST_GAME_DATA_FAILURE',
    pending: 'REQUEST_GAME_DATA_PENDING'
  }
});

export const addGameData = (data) => ({
  type: 'ADD_GAME_DATA',
  payload: data
});

const api = {
  requestMessageLogWaiting: () => (
    {
      type: 'REQUEST_MESSAGE_LOG_PENDING'
    }
  ),

  receiveMessageLog: (response) => (
    { 
      type: 'RECEIVE_MESSAGE_LOG',
      response: response
    }
  ),

  requestMessageLogFailure: (message) => (
    {
      type: 'REQUEST_MESSAGE_LOG_FAILURE',
      message: message
    }
  ),

  //GET NBA game schedule/results data

  requestGameDataWaiting: () => (
    {
      type: 'REQUEST_GAME_DATA_PENDING'
    }
  ),

  receiveGameData: (response) => (
    { 
      type: 'RECEIVE_GAME_DATA',
      response: response
    }
  ),

  requestGameDataFailure: () => (
    {
      type: 'REQUEST_GAME_DATA_FAILURE'
    }
  ),

  //Set standings month from pulldown menu
  setStandingsMonth: month => (
    {
      type: 'SET_STANDINGS_MONTH',
      month: month
    }
  ),

  //GET list of months for standings month-selector
  requestMonthListWaiting: () => (
    {
      type: 'REQUEST_MONTH_LIST_PENDING'
    }
  ),

  receiveMonthList: (list) => (
    { 
      type: 'RECEIVE_MONTH_LIST',
      list: list
    }
  ),

  requestMonthList: () => (
    {
      type: 'REQUEST_MONTH_LIST_FAILURE'
    }
  ),

  //PUT send game prediction:
  sendPredictionWaiting: () => (
    {
      type: 'SEND_PREDICTION_PENDING'
    }
  ),

  sendPredictionSuccess: (response) => (
    {
      response: response,
      type: 'SEND_PREDICTION_SUCCESS'
    }
  ),

  sendPredictionFailure: () => (
    {
      type: 'SEND_PREDICTION_FAILURE'
    }
  ),

  //POST create new userMonth at user request:
  createUserMonthWaiting: () => (
    {
      type: 'CREATE_USER_MONTH_PENDING'
    }
  ),

  createUserMonthSuccess: (month) => (
    { 
      type: 'CREATE_USER_MONTH_SUCCESS',
      month: month
    }
  ),

  createUserMonthFailure: (message) => (
    {
      type: 'CREATE_USER_MONTH_FAILURE',
      message: message
    }
  ),

  //POST create new league request:
  createLeagueWaiting: () => (
    {
      type: 'CREATE_LEAGUE_PENDING'
    }
  ),

  createLeagueSuccess: (month) => (
    { 
      type: 'CREATE_LEAGUE_SUCCESS',
      month: month
    }
  ),

  createLeagueFailure: (message) => (
    {
      type: 'CREATE_LEAGUE_FAILURE',
      message: message
    }
  ),

  //POST create join league request:
  joinLeagueWaiting: () => (
    {
      type: 'JOIN_LEAGUE_PENDING'
    }
  ),

  joinLeagueSuccess: (month) => (
    { 
      type: 'JOIN_LEAGUE_SUCCESS',
      month: month
    }
  ),

  joinLeagueFailure: (message) => (
    {
      type: 'JOIN_LEAGUE_FAILURE',
      message: message
    }
  ),

  //User actions:
  addPrediction: (gameId, teamName, gameDate) => (
    {
      type: 'ADD_PREDICTION',
      teamName: teamName,
      gameDate: gameDate
    }    
  ),
  removePrediction: (gameId, gameDate) => (
    {
      type: 'REMOVE_PREDICTION',
      gameDate: gameDate
    }
  ),
  markIneligible: (teamName) => (
    {
      type: 'MARK_INELIGIBLE',
      teamName: teamName
    }
  ),
  markEligible: (teamName) => (
    {
      type: 'MARK_ELIGIBLE',
      teamName: teamName
    }
  ),
  setActiveDate: (month, day) => (
    {
      type: 'SET_ACTIVE_DATE',
      month: month,
      day: day
    }
  ),
  setActiveMonth: (month) => (
    {
      type: 'SET_ACTIVE_MONTH',
      month: month,
    }
  ),
  leagueNameEntry: (text) => (
    {
      type: 'LEAGE_NAME_ENTRY',
      payload: text
    }    
  ),
  leagueIdEntry: (text) => (
    {
      type: 'LEAGUE_ID_ENTRY',
      payload: text
    }    
  ),
  //~~~~~~~CHAT~~~~~~~~
  chatTextEntry: (text) => (
    {
      type: 'CHAT_TEXT_ENTRY',
      enteredChatText: text
    }    
  ),
  sendMessage: (newMessageObject) => (
    {
      type: 'SEND_MESSAGE',
      newMessage: newMessageObject
    }
  )
};

export default api;
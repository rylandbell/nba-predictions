'use strict';

const api = {
  //GET user data:
  requestUserDataWaiting: () => (
    {
      type: 'REQUEST_USER_DATA_WAITING'
    }
  ),

  receiveUserData: (response) => (
    { 
      type: 'RECEIVE_USER_DATA',
      payload: response
    }
  ),

  requestUserDataFailure: (message) => (
    {
      type: 'REQUEST_USER_DATA_FAILURE',
      message: message
    }
  ),

  //GET messageLog:
  requestMessageLogWaiting: () => (
    {
      type: 'REQUEST_MESSAGE_LOG_WAITING'
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

  //GET initial monthly picks data:
  requestUserMonthWaiting: () => (
    {
      type: 'REQUEST_USER_MONTH_WAITING'
    }
  ),

  receiveUserMonth: (response) => (
    { 
      type: 'RECEIVE_USER_MONTH',
      response: response
    }
  ),

  requestUserMonthFailure: (message) => (
    {
      type: 'REQUEST_USER_MONTH_FAILURE',
      message: message
    }
  ),

  //GET NBA game schedule/results data

  requestGameDataWaiting: () => (
    {
      type: 'REQUEST_GAME_DATA_WAITING'
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

  //GET standings data
  requestStandingsDataWaiting: () => (
    {
      type: 'REQUEST_STANDINGS_DATA_WAITING'
    }
  ),

  receiveStandingsData: (response) => (
    { 
      type: 'RECEIVE_STANDINGS_DATA',
      response: response
    }
  ),

  requestStandingsDataFailure: () => (
    {
      type: 'REQUEST_STANDINGS_DATA_FAILURE'
    }
  ),

  //GET list of months for standings month-selector
  requestMonthListWaiting: () => (
    {
      type: 'REQUEST_MONTH_LIST_WAITING'
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
      type: 'SEND_PREDICTION_WAITING'
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
      type: 'CREATE_USER_MONTH_WAITING'
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
      type: 'CREATE_LEAGUE_WAITING'
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
      type: 'JOIN_LEAGUE_WAITING'
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
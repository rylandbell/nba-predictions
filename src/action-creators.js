'use strict';

const api = {

  //GET initial data:
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

  requestUserMonthFailure: () => (
    {
      type: 'REQUEST_USER_MONTH_FAILURE'
    }
  ),

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
  goToDate: (date) => (
    {
      type: 'GO_TO_DATE',
      date: date
    }
  ),
  dayForward: () => (
    {
      type: 'DAY_FORWARD'
    }
  ),
  dayBack: () => (
    {
      type: 'DAY_BACK'
    }
  )
};

export default api;
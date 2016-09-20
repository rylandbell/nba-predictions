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

  //PUT send game prediction:
  sendPredictionWaiting: () => (
    {
      type: 'SEND_PREDICTION_WAITING'
    }
  ),

  sendPredictionSuccess: () => (
    {
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
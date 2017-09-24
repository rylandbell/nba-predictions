'use strict';

const api = {

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
  setActiveDate: (date) => (
    {
      type: 'SET_ACTIVE_DATE',
      date: date
    }
  ),
  setActiveMonth: (month) => (
    {
      type: 'SET_ACTIVE_MONTH',
      month: month,
    }
  ),
  setActiveLeague: (league) => (
    {
      type: 'SET_ACTIVE_LEAGUE',
      payload: league
    }
  ),
  // Text Entry
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
  chatTextEntry: (text) => (
    {
      type: 'CHAT_TEXT_ENTRY',
      enteredChatText: text
    }    
  )
};

export default api;
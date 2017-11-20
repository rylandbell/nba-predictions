'use strict';

const api = {

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
  setActiveLeague: (leagueId) => (
    {
      type: 'SET_ACTIVE_LEAGUE',
      payload: leagueId
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
  ),
  // Intro.js Tours
  enableDashboardTour: () => (
    {
      type: 'ENABLE_DASHBOARD_TOUR'
    }
  ),
  disableDashboardTour: () => (
    {
      type: 'DISABLE_DASHBOARD_TOUR'
    }
  ),
  enablePicksTour: () => (
    {
      type: 'ENABLE_PICKS_TOUR'
    }
  ),
  disablePicksTour: () => (
    {
      type: 'DISABLE_PICKS_TOUR'
    }
  )
};

export default api;
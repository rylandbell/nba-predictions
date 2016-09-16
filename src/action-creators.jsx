'use strict';

const api = {
  addPrediction: (gameId, predictedWinner, gameDate) => (
    {
      type: 'ADD_PREDICTION',
      predictedWinner: predictedWinner,
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
      type: 'DAY_FORWARD',
    }
  ),
  dayBack: () => (
    {
      type: 'DAY_BACK'
    }
  )
}

export default api;
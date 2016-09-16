'use strict';

const api = {
  addPrediction: (gameId, predictedWinner, gameDate) => (
    {
      type: 'ADD_PREDICTION',
      gameId: gameId,
      predictedWinner: predictedWinner,
      gameDate: gameDate
    }    
  ),
  removePrediction: (gameId, gameDate) => (
    {
      type: 'REMOVE_PREDICTION',
      gameId: gameId,
      gameDate: gameDate
    }
  ),
  // markIneligible: (teamName, gameDate) => (
  //   {
  //     type: 'MARK_INELIGIBLE',
  //     teamName: teamName,
  //     gameDate: gameDate
  //   }
  // ),
  // markEligible: (teamName, gameDate) => (
  //   {
  //     type: 'MARK_ELIGIBLE',
  //     teamName: teamName,
  //     gameDate: gameDate
  //   }
  // ),
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
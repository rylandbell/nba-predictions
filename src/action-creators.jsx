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
  removePrediction: (gameId) => (
    {
      type: 'REMOVE_PREDICTION',
      gameId: gameId
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
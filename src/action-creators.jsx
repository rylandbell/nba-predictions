'use strict';

const api = {
  addPrediction: (gameId, winner) => (
    {
      type: 'ADD_PREDICTION',
      gameId: gameId,
      winner: winner
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
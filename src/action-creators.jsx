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
  )
}

export default api;
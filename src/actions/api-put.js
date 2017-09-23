export const sendMessage = (enteredChatText) => ({
  type: 'API',
  payload: {
    url: '/api/messages',
    method: 'PUT',
    body: {content: enteredChatText},
    success: 'SEND_MESSAGE_SUCCESS',
    failure: 'SEND_MESSAGE_FAILURE',
    pending: 'SEND_MESSAGE_PENDING'
  }
});

export const sendPrediction = (activeMonth, body) => ({
  type: 'API',
  payload: {
    url: `/api/userMonth/${activeMonth}/predictedWinners`,
    method: 'PUT',
    body: body,
    success: 'SEND_PREDICTION_SUCCESS',
    failure: 'SEND_PREDICTION_FAILURE',
    pending: 'SEND_PREDICTION_PENDING'
  }
});
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

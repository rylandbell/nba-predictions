// current user data (includes leagues data):
export const requestUserData = () => ({
  type: "API",
  payload: {
    url: "/api/league",
    method: "GET",
    success: "REQUEST_USER_DATA_SUCCESS",
    failure: "REQUEST_USER_DATA_FAILURE",
    pending: "REQUEST_USER_DATA_PENDING"
  }
});

export const addUserData = data => ({
  type: "ADD_USER_DATA",
  payload: data
});

// standings data:
export const requestStandingsData = (month, leagueId) => ({
  type: "API",
  payload: {
    url: `/api/userMonth/all-public/${month}?leagueId=${leagueId}`,
    method: "GET",
    success: "REQUEST_STANDINGS_DATA_SUCCESS",
    failure: "REQUEST_STANDINGS_DATA_FAILURE",
    pending: "REQUEST_STANDINGS_DATA_PENDING"
  }
});

export const addStandingsData = data => ({
  type: "ADD_STANDINGS_DATA",
  payload: data
});

// userMonth data:
export const requestUserMonthData = (month, leagueId) => ({
  type: "API",
  payload: {
    url: `/api/userMonth/?leagueId=${leagueId}`,
    method: "GET",
    success: "REQUEST_USER_MONTH_DATA_SUCCESS",
    failure: "REQUEST_USER_MONTH_DATA_FAILURE",
    pending: "REQUEST_USER_MONTH_DATA_PENDING"
  }
});

export const addUserMonthData = data => ({
  type: "ADD_USER_MONTH_DATA",
  payload: data
});

// Game schedule/scores data
export const requestGameData = month => ({
  type: "API",
  payload: {
    url: `/api/dailyGamesData/${month}`,
    method: "GET",
    success: "REQUEST_GAME_DATA_SUCCESS",
    failure: "REQUEST_GAME_DATA_FAILURE",
    pending: "REQUEST_GAME_DATA_PENDING"
  }
});

export const addGameData = data => ({
  type: "ADD_GAME_DATA",
  payload: data
});

//Messages
export const requestMessageLog = leagueId => ({
  type: "API",
  payload: {
    url: `/api/messages/${leagueId}`,
    method: "GET",
    success: "REQUEST_MESSAGE_LOG_SUCCESS",
    failure: "REQUEST_MESSAGE_LOG_FAILURE",
    pending: "REQUEST_MESSAGE_LOG_PENDING"
  }
});

export const addMessageLog = data => ({
  type: "ADD_MESSAGE_LOG",
  payload: data
});

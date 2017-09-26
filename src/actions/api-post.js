export const createLeague = (leagueName) => ({
  type: 'API',
  payload: {
    url: '/api/league',
    method: 'POST',
    body: {name: leagueName},
    success: 'CREATE_LEAGUE_SUCCESS',
    failure: 'CREATE_LEAGUE_FAILURE',
    pending: 'CREATE_LEAGUE_PENDING'
  }
});

export const joinLeague = (leagueId) => ({
  type: 'API',
  payload: {
    url: `/api/league/${leagueId}`,
    method: 'POST',
    body: {},
    success: 'JOIN_LEAGUE_SUCCESS',
    failure: 'JOIN_LEAGUE_FAILURE',
    pending: 'JOIN_LEAGUE_PENDING'
  }
});

export const createUserMonth = (month, leagueId) => ({
  type: 'API',
  payload: {
    url: '/api/userMonth/',
    method: 'POST',
    body: {month: month, leagueId: leagueId},
    success: 'CREATE_USER_MONTH_SUCCESS',
    failure: 'CREATE_USER_MONTH_FAILURE',
    pending: 'CREATE_USER_MONTH_PENDING'
  }
});
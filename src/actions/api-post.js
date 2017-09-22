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
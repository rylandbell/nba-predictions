import { createSelector } from "reselect";

const getUser = state => state.apiData.user;

// Should return true if user does NOT have any joined leagues
export const checkNoLeaguesJoined = createSelector([getUser], user => {
  if (user.leagues && user.leagues.length < 1) {
    return true;
  } else {
    return false;
  }
});

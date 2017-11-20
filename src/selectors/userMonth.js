import { createSelector } from "reselect";
import _values from "lodash/values";
import _difference from "lodash/difference";

const getActiveMonth = state => state.dates.activeMonth;
const getUserMonthsData = state => state.apiData.userMonthsData;

const teamsList = [
  "ATL",
  "BKN",
  "BOS",
  "CHA",
  "CHI",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GSW",
  "HOU",
  "IND",
  "LAC",
  "LAL",
  "MEM",
  "MIA",
  "MIL",
  "MIN",
  "NOP",
  "NYK",
  "OKC",
  "ORL",
  "PHI",
  "PHX",
  "POR",
  "SAC",
  "SAS",
  "TOR",
  "UTA",
  "WAS"
];

// combine userMonthsData and activeMonth from state to get activeUserMonthId, eligibleTeams, and predictedWinners
export const getActiveUserMonth = createSelector(
  [getActiveMonth, getUserMonthsData],
  (activeMonth, userMonthsData) => {
    if (userMonthsData.length > 0) {
      //Find the userMonth for the active month:
      const activeUserMonth = userMonthsData.find(
        userMonth => userMonth.month === activeMonth
      );

      if (!activeUserMonth) {
        return { userMonthId: "", eligibleTeams: [], predictedWinners: {} };
      }

      const userMonthId = activeUserMonth._id;

      //Use a list of all teams chosen so far to compute a list of remaining teams
      const chosenTeams = _values(activeUserMonth.predictedWinners).map(
        obj => obj.teamName
      );
      const eligibleTeams = _difference(teamsList, chosenTeams).sort();

      const predictedWinners = Object.assign(
        {},
        activeUserMonth.predictedWinners
      );

      return { userMonthId, eligibleTeams, predictedWinners };
    } else {
      return { userMonthId: "", eligibleTeams: [], predictedWinners: {} };
    }
  }
);

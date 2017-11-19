//combine unchanging data about features with their current state

import { createSelector } from "reselect";
import _values from "lodash/values";
import _difference from "lodash/difference";
import _sortBy from "lodash/sortBy";

const getActiveMonth = state => state.activeMonth;
const getUserMonths = state => state.userMonthsData;

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

export const getActiveUserMonth = createSelector(
  [getActiveMonth, getUserMonths],
  (activeMonth, userMonthsData) => {
    const activeUserMonth = userMonthsData.find(
      userMonth => userMonth.month === activeMonth
    );
    const userMonthId = activeUserMonth._id;

    const chosenTeams = _values(activeUserMonth.predictedWinners).map(
      obj => obj.teamName
    );
    const eligibleTeams = _difference(teamsList, chosenTeams).sort();

    const predictedWinners = Object.assign(
      {},
      activeUserMonth.predictedWinners
    );

    return { userMonthId, eligibleTeams, predictedWinners };
  }
);

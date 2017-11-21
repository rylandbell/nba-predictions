import { createSelector } from "reselect";
import _find from "lodash/find";

const getUserMonthsData = state => state.apiData.userMonthsData;
const getActiveMonth = state => state.dates.activeMonth;

// Should return true if the state's userMonth array doesn't contain a
// userMonth with month === the state's activeMonth
export const checkMissingUserMonth = createSelector(
  [getUserMonthsData, getActiveMonth],
  (userMonthsData, activeMonth) => {
    if (!userMonthsData) {
      return true;
    }

    const activeUserMonth = _find(
      userMonthsData,
      userMonth => userMonth.month === activeMonth
    );

    if (activeUserMonth) {
      return false;
    } else {
      return true;
    }
  }
);

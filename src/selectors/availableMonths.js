import { createSelector } from "reselect";
import moment from "moment";
import _uniq from "lodash/uniq";

const getUserMonthsData = state => state.userMonthsData;

// create list of months available to current user for current league
// should include all past months with userMonth data, plus current and subsequent month
// but never June, July, August or September
export const getAvailableMonths = createSelector(
  [getUserMonthsData],
  userMonthsData => {
    // add current, next months:
    const currentMonth = moment().format("YYYY-MM");
    const nextMonth = moment().add(1, "months").format("YYYY-MM");

    const availableMonthsRaw = [currentMonth, nextMonth];

    // add all months with userMonths:
    if (userMonthsData.length > 0) {
      userMonthsData.forEach(userMonth => {
        availableMonthsRaw.push(userMonth.month);
      });
    }

    // remove duplicates and summer months:
    const availableMonths = _uniq(availableMonthsRaw).filter(month => {
      const monthNumber = parseInt(moment(month).format("M"), 10);
      return monthNumber < 6 || monthNumber > 9;
    });

    return availableMonths;
  }
);

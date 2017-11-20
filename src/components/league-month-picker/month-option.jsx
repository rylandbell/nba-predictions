import React from "react";

const MonthOption = ({ month }) =>
  <option value={month}>
    &nbsp;{moment(month).format("MMM YYYY")}&nbsp;
  </option>;

export default MonthOption;

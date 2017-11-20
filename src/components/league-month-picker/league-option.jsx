import React from "react";

const LeagueOption = ({ league }) =>
  <option value={league.id}>
    &nbsp;{league.name}&nbsp;
  </option>;

export default LeagueOption;

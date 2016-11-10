'use strict';

import React from 'react';

const StandingsTableRow = ({game}) => {
  const teamNameClass = game.teamName ? game.teamName.toLowerCase() : '';
  let outcomeClass = '';
  if (game.outcome === 'success') {
    outcomeClass = 'standings-victory-team';
  } else if (game.outcome === 'failure') {
    outcomeClass = 'standings-defeat-team';
  }
  
  return (
    <div className={"standings-team center-block " + outcomeClass}>
      <div className={"center-block " + teamNameClass}></div>
    </div>
  );
}

export default StandingsTableRow;


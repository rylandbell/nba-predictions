'use strict';

import React from 'react';
import StandingsTableGame from './standings-table-game';

const StandingsTableRow = ({player}) => {
  // const todayNumber = moment().format('D');
  const todayNumber = 2;
  return (
    <tr>
      <td className="standings-border-right">
        <h6>{player.ownerDisplayName}</h6>
      </td>
      <td className="text-center">
        <h5>{player.standingsData.winCount + '-' + player.standingsData.lossCount}</h5>
      </td>
      <td>
        <StandingsTableGame game={player.predictedWinners[todayNumber]}/>
      </td>
      <td>
        <StandingsTableGame game={player.predictedWinners[todayNumber-1]||{}}/>
      </td>
    </tr>
  );
}

export default StandingsTableRow;
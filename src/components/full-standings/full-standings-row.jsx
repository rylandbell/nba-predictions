'use strict';

import React from 'react';
import moment from 'moment';

import StandingsTableGame from '../standings/standings-table-game';

const FullStandingsRow = ({player, selectedStandingsMonth}) => {
  const daysArray = [];
  const daysInMonth = moment(selectedStandingsMonth).daysInMonth();
  for (var i = 1; i <= daysInMonth; i++){
    daysArray.push(i);
  }
  return (
      <tr>
        <td className="standings-border-right name-column">
          <h6>{player.ownerDisplayName}</h6>
        </td>
        <td className="text-center w-l-column">
          <h5>{player.standingsData.winCount + '-' + player.standingsData.lossCount}</h5>
        </td>
        {daysArray.map((day, key) => 
          <td key={key}>
            <StandingsTableGame game={player.predictedWinners[day]} />
          </td>
        )}
      </tr>
  );
}

export default FullStandingsRow;

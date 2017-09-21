'use strict';

import React from 'react';
import moment from 'moment';

import StandingsTableGame from '../standings/standings-table-game.jsx';

const FullStandingsRow = ({player, activeMonth}) => {
  const daysArray = [];
  const daysInMonth = moment(activeMonth).daysInMonth();
  for (var i = 1; i <= daysInMonth; i++){
    daysArray.push(i);
  }
  return (
      <tr>
        <td className="standings__player-name-column--full standings__player-name-column-item--full">
          <h6>{player.ownerDisplayName}</h6>
        </td>
        <td className="text-center standings__w-l-column--full standings__w-l-column-item--full">
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

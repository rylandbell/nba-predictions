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
        <td className="standings-border-right">
          <h6>{player.ownerDisplayName}</h6>
        </td>
        <td className="text-center">
          <h5>{player.standingsData.winCount + '-' + player.standingsData.lossCount}</h5>
        </td>
        {daysArray.map((day, key) => 
          <td>
            <StandingsTableGame game={player.predictedWinners[day]} key={key}/>
          </td>
        )}
      </tr>
  );
}

export default FullStandingsRow;

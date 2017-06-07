'use strict';

import React from 'react';
import moment from 'moment';

import StandingsTableGame from './standings-table-game.jsx';

const StandingsTableRow = ({player, selectedStandingsMonth}) => {
  const todayNumber = moment('2017-04-10').format('D');
  return (
    // selectedStandingsMonth === moment().format('YYYY-MM') ? summer mode
    selectedStandingsMonth === '2017-04' ?
      <tr>
        <td>
          <h6>{player.ownerDisplayName}</h6>
        </td>
        <td className="text-center">
          <h5>{player.standingsData.winCount + '-' + player.standingsData.lossCount}</h5>
        </td>
        <td>
          <StandingsTableGame game={player.predictedWinners[todayNumber]}/>
        </td>
        <td className="hidden-xs">
          <StandingsTableGame game={player.predictedWinners[todayNumber-1]||{}}/>
        </td>
      </tr>
    :
      <tr>
        <td>
          <h6>{player.ownerDisplayName}</h6>
        </td>
        <td className="text-center">
          <h5>{player.standingsData.winCount + '-' + player.standingsData.lossCount}</h5>
        </td>
      </tr>
  );
}

export default StandingsTableRow;

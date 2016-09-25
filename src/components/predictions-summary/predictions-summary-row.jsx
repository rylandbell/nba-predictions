'use strict';

import React from 'react';

const api = ({predictedWinners, date}) => {
  // if(predictedWinners[date]){
    return (
      <tr>
        <td className="date-col">{'11/'+date}</td>
        <td className="team-col">{predictedWinners[date]?predictedWinners[date]:'-'}</td>
        <td className="outcome-col"></td>
      </tr>
    );
  // } else {
  //   return null;
  // }
}

export default api;
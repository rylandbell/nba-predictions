'use strict';

import React from 'react';

const api = ({predictedWinners, date}) => {
  // if(predictedWinners[date]){
    return (
      <tr>
        <td className="dateCol">{'11/'+date}</td>
        <td className="teamCol">{predictedWinners[date]}</td>
        <td className="outcomeCol"></td>
      </tr>
    );
  // } else {
  //   return null;
  // }
}

export default api;
'use strict';

import React from 'react';

const FullStandingsHeader = ({activeMonth}) => {
  const daysArray = [];
  const daysInMonth = moment(activeMonth).daysInMonth();
  for (var i = 1; i <= daysInMonth; i++){
    daysArray.push(i);
  }

  return (
    <thead>
      <tr>
        <th className="standings__player-name-column--full standings__player-name-column-header--full">
          Player
        </th>
        <th className="text-center standings__w-l-column--full standings__w-l-column-header--full"> W - L
        </th>
        {daysArray.map( (day, key) =>
          <th className="text-center" key={key}>{activeMonth.substring(5,7)}/{day}</th>
        )}
      </tr>
    </thead>
  );

};

export default FullStandingsHeader;
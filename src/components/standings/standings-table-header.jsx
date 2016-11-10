'use strict';

import React from 'react';

const StandingsTableHeader = () => (
  <thead>
    <tr>
      <th>
        Player Name
      </th>
      <th className="text-center"> W - L
      </th>
      <th className="text-center">
        {moment().format('MMM D')}
      </th>
      <th className="text-center">
        {moment().subtract(1,'days').format('MMM D')}
      </th>
    </tr>
  </thead>
);

export default StandingsTableHeader;
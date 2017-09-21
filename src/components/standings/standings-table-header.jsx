'use strict';

import React from 'react';
import moment from 'moment';

const StandingsTableHeader = ({activeMonth}) => (
  // activeMonth === moment().format('YYYY-MM') ? summer mode
  activeMonth === '2017-04' ?
    <thead>
      <tr>
        <th>
          Player
        </th>
        <th className="text-center standings__w-l-column"> W - L
        </th>
        <th className="text-center">
          {moment('2017-04-10').format('MMM D')}
        </th>
        <th className="text-center hidden-xs">
          {moment('2017-04-10').subtract(1,'days').format('MMM D')}
        </th>
      </tr>
    </thead>
  :
    <thead>
      <tr>
        <th>
          Player
        </th>
        <th className="text-center standings__w-l-column"> W - L
        </th>
      </tr>
    </thead>
);

export default StandingsTableHeader;
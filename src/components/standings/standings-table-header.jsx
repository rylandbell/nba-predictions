'use strict';

import React from 'react';
import moment from 'moment';

const StandingsTableHeader = ({selectedStandingsMonth}) => (
  selectedStandingsMonth === moment().format('YYYY-MM') ?
    <thead>
      <tr>
        <th>
          Player
        </th>
        <th className="text-center standings__w-l-column"> W - L
        </th>
        <th className="text-center">
          {moment().format('MMM D')}
        </th>
        <th className="text-center hidden-xs">
          {moment().subtract(1,'days').format('MMM D')}
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
'use strict';

import React from 'react';

const MyLeaguesTableRow = ({league}) => {
  return (
    <tr>
      <td>{league.name}</td>
      <td>{`http://nba.ryland-bell.com/league/${league.id}`}</td>
    </tr>
  );
};

export default MyLeaguesTableRow;
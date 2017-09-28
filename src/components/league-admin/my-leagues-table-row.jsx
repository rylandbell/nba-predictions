'use strict';

import React from 'react';

const MyLeaguesTableRow = ({league}) => {
  return (
    <tr>
      <td>{league.name}</td>
      <td>{league.id}</td>
    </tr>
  );
};

export default MyLeaguesTableRow;
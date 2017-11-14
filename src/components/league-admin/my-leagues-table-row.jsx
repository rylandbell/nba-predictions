'use strict';

import React from 'react';

const MyLeaguesTableRow = ({league}) => {
  return (
    <tr>
      <td>{league.name}</td>
      <td>{league.joinPhrase}</td>
    </tr>
  );
};

export default MyLeaguesTableRow;
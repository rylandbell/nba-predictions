'use strict';

import React from 'react';

const api = ({teamData}) => {
  var message;
  var statusClass;

  if(teamData.isWinner){
    message = 'Victory!';
    statusClass = 'text-success';
  } else if (teamData.isLoser) {
    message = 'Defeat!';
    statusClass = 'text-danger';
  } else {
    message = 'Selected';
    statusClass = 'text-primary';
  }

  return (
    <div className={'team-item '+statusClass}>
      {message}
    </div>
  );
};

export default api;
'use strict';

import React from 'react';

const api = ({teamData}) => {
var message;
var statusClass;

if(teamData.isWinner){
  message = "Win!";
  statusClass = "text-success";
} else if (teamData.isLoser) {
  message = "Loss!";
  statusClass = "text-danger";
} else {
  message = "Selected";
  statusClass = "text-primary";
}

return (
  <div className={statusClass}>
    {message}
  </div>
)};

export default api;
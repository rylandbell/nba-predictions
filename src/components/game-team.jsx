'use strict';

import React from 'react';

import TeamMessage from './team-message.jsx';

const api = ({teamData}) => (
  <div className={"game-item game-team " + (teamData.isEligible?"eligible-team":"ineligible-team")} >
    <h4>{teamData.teamName}</h4>
    {(teamData.isChosen ? <TeamMessage teamData={teamData}/> : '')}
  </div>
);

export default api;
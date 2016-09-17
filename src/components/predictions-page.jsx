'use strict';

import React from 'react';

import GamesViewerContainer from './containers/games-viewer-container.jsx';
import RemainingTeamsContainer from './containers/remaining-teams-container.jsx'; 

const api = ({reduxState}) => (
  <div className="row">
    <RemainingTeamsContainer reduxState={reduxState}/>
    <GamesViewerContainer reduxState={reduxState}/>
  </div>
);

export default api;
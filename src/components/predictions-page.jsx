'use strict';

import React from 'react';

import GamesViewerContainer from './containers/games-viewer-container.jsx';
import RemainingTeamsContainer from './containers/remaining-teams-container.jsx'; 

const api = React.createClass({
  componentDidMount: function() {
    this.props.getInitialUserMonthData()
    this.props.getGameData()
  },
  render: function() {
    return (
      <div className="row">
        <RemainingTeamsContainer reduxState={this.props.reduxState}/>
        <GamesViewerContainer reduxState={this.props.reduxState}/>
      </div>
    );
  }
});

export default api;
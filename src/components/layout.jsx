'use strict';

import React from 'react';

import Navbar from './navbar.jsx';
import LeagueMonthPickerContainer from './containers/league-month-picker-container.jsx';

const LayoutComponent = React.createClass({
  componentDidMount: function() {
    this.props.getUserMonthData(this.props.reduxState.activeMonth, this.props.reduxState.activeLeagueId);
    this.props.getStandingsData(this.props.reduxState.activeMonth, this.props.reduxState.activeLeagueId);
    this.props.getUserData();
    this.props.getGameData(this.props.reduxState.activeMonth)
  },
  render: function () {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div className="container container-body">
            <div className="row">
              <div className="col-xs-12">
                <LeagueMonthPickerContainer />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default LayoutComponent;
'use strict';

import React from 'react';

import Navbar from './navbar.jsx';
import LeagueMonthPickerContainer from './containers/league-month-picker-container.jsx';

const LayoutComponent = React.createClass({
  componentDidMount: function() {
    this.props.getUserData();
    this.props.getGameData(this.props.reduxState.activeMonth)
  },
  render: function () {
    return (
      <div>
        <Navbar reduxState={this.props.reduxState} />
        <div className="main">
          <div className="league-month-picker__wrapper">
            <LeagueMonthPickerContainer />
          </div>
          <div className="container container-body">
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
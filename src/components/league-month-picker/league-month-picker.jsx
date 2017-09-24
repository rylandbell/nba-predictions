'use strict';

import React from 'react';

import MonthSelect from './month-select.jsx';

const MonthlyPicksPage = React.createClass({
  render: function() {
    return (
      <div>
        <MonthSelect activeMonth = {this.props.activeMonth} currentMonth = {this.props.currentMonth} setActiveMonth = {this.props.setActiveMonth} getUserMonthData={this.props.getUserMonthData} getGameData={this.props.getGameData} getStandingsData={this.props.getStandingsData} />
      </div>
    )
  }
});

export default MonthlyPicksPage;
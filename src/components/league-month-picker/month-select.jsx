'use strict';

import React from 'react';
import moment from 'moment';

const MonthSelect = React.createClass({
  handleChange: function(event) {
    this.props.setActiveMonth(event.target.value);
    this.props.getUserMonthData(event.target.value, this.props.activeLeagueId);
    this.props.getGameData(event.target.value);
    this.props.getStandingsData(event.target.value, this.props.activeLeagueId);
  },
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor="month-select" className="league-month-picker__label">Select a month:&nbsp;</label>
        <select id="month-select" className="form-control league-month-picker__select" onChange={this.handleChange} value={this.props.activeMonth}>
          <option value={this.props.currentMonth}>
            {moment(this.props.currentMonth).format('MMMM YYYY')}
          </option>
          <option value={moment(this.props.currentMonth).add(1,'months').format('YYYY-MM')}>
            {moment(this.props.currentMonth).add(1,'months').format('MMMM YYYY')}
          </option>
        </select>
      </div>
    )
  }
});

export default MonthSelect;
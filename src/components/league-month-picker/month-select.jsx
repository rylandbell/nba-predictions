'use strict';

import React from 'react';
import moment from 'moment';

const MonthlyPicksMonthSelector = React.createClass({
  handleChange: function(event) {
    this.props.setActiveMonth(event.target.value);
    this.props.getUserMonthData(event.target.value);
    this.props.getGameData(event.target.value);
    this.props.getStandingsData(event.target.value);
  },
  render: function() {
    return (
      <div className="panel panel-black panel-default month-selector">
        <div className="panel-heading">
          <div className="panel-title"> Select a month: </div>
        </div>
        <div className="panel-body">
          <form role="form" className="form">
            <fieldset>
              <div className="form-group">
                <select className="form-control" onChange={this.handleChange} value={this.props.activeMonth}>
                  <option value={this.props.currentMonth}>
                    {moment(this.props.currentMonth).format('MMMM YYYY')}
                  </option>
                  <option value={moment(this.props.currentMonth).add(1,'months').format('YYYY-MM')}>
                    {moment(this.props.currentMonth).add(1,'months').format('MMMM YYYY')}
                  </option>
                </select>
              </div>
            </fieldset>
          </form>
          <p className="month-selector__message">
            Hi! You can view and update your picks for the current and upcoming month here. To view results from earlier months, visit the <a href="/standings">Standings</a> page.
          </p>
        </div>
        
      </div>
    )
  }
});

export default MonthlyPicksMonthSelector;
'use strict';

import React from 'react';
import moment from 'moment';

const MonthlyPicksMonthSelector = React.createClass({
  handleChange: function(event) {
    // this.props.getUserMonthData(event.target.value);
    this.props.setPicksMonth(event.target.value);
    this.props.getUserMonthData(event.target.value);
    this.props.getGameData(event.target.value);
  },
  render: function() {
    return (
      <div className="panel panel-black">
        <div className="panel-heading">
          <div className="panel-title"> Select a month: </div>
        </div>
        <div className="panel-body">
          <form role="form" className="form">
            <fieldset>
              <div className="form-group standings-month-selector">
                <select className="form-control standings-month-selector__select" onChange={this.handleChange} value={this.props.selectedPicksMonth}>
                  <option value={moment().format('YYYY-MM')}>
                    {moment().format('MMMM YYYY')}
                  </option>
                  <option value={moment().add(1,'months').format('YYYY-MM')}>
                    {moment().add(1,'months').format('MMMM YYYY')}
                  </option>
                </select>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
});

export default MonthlyPicksMonthSelector;
'use strict';

import React from 'react';
import moment from 'moment';

const MonthSelect = React.createClass({
  handleChange: function(event) {
    this.props.setActiveMonth(event.target.value);
  },
  render: function() {
    return (
      <div className="form-group">
        {/*<label htmlFor="month-select" className="league-month-picker__label">Select a month:&nbsp;</label>*/}
        <select id="month-select" className="form-control league-month-picker__select" onChange={this.handleChange} value={this.props.activeMonth}>
          <option disabled>Active Month: </option>
          <option value={this.props.currentMonth}>
            &nbsp;{moment(this.props.currentMonth).format('MMM YYYY')}&nbsp;
          </option>
          <option value={moment(this.props.currentMonth).add(1,'months').format('YYYY-MM')}>
            &nbsp;{moment(this.props.currentMonth).add(1,'months').format('MMM YYYY')}&nbsp;
          </option>
        </select>
      </div>
    )
  }
});

export default MonthSelect;
'use strict';

import React from 'react';
import moment from 'moment';

const PicksSummaryMonthSelector = React.createClass({
  handleChange: function(event) {
    this.props.getUserMonthData(event.target.value);
    this.props.setActiveMonth(event.target.value);
  },
  render: function() {
    return (
      <form role="form" className="form">
        <fieldset>
          <div className="form-group standings__month-selector">
            <label className="control-label standings__month-selector-label">Select a month:</label>
            <select className="form-control standings__month-selector-input" onChange={this.handleChange} value={this.props.activeMonth}>
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
    )
  }
});

export default PicksSummaryMonthSelector;
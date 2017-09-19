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
              {/*<option value={moment().format('YYYY-MM')}>
                {moment().format('MMMM YYYY')}
              </option>
              <option value={moment().add(1,'months').format('YYYY-MM')}>
                {moment().add(1,'months').format('MMMM YYYY')}
              </option> summer mode*/}
              <option value='2017-04'>
                April 2017
              </option>
              <option value='2017-05'>
                May 2017
              </option>
            </select>
          </div>
        </fieldset>
      </form>
    )
  }
});

export default PicksSummaryMonthSelector;
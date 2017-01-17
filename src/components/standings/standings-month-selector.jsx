'use strict';

import React from 'react';
import moment from 'moment';

const StandingsMonthSelector = React.createClass({
  handleChange: function(event) {
    this.props.getStandingsData(event.target.value);
    this.props.setStandingsMonth(event.target.value);
  },
  render: function() {
    return (
      <form role="form" className="form">
        <fieldset>
          <div className="form-group standings__month-selector">
            <label className="control-label standings__month-selector-label">Select a month:</label>
            <select className="form-control standings__month-selector-input" onChange={this.handleChange} value={this.props.selectedStandingsMonth}>
              {this.props.monthList.map(
                (month,key) => <option value={month} key={key}>{moment(month).format('MMMM YYYY') }</option>)
              }
            </select>
          </div>
        </fieldset>
      </form>
    )
  }
});

export default StandingsMonthSelector;

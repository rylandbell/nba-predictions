'use strict';

import React from 'react';
import moment from 'moment';

const StandingsMonthSelector = React.createClass({
  handleChange: function(event) {
    this.props.setStandingsMonth(event.target.value);
    this.props.getStandingsData(this.props.selectedStandingsMonth);
  },
  render: function() {
    return (
      <form role="form" className="form-horizontal">
        <fieldset>
          <div className="form-group">
            <label className="col-sm-3 col-md-5 col-lg-offset-1 col-lg-4 control-label" id="standings-month-selector__label">Select a month:</label>
            <div className="col-sm-9 col-md-7 col-lg-5">
              <select className="form-control" onChange={this.handleChange}>
                {this.props.monthList.map(
                  (month,key) => <option value={month} key={key}>{moment(month).format('MMMM YYYY')}</option>)
                }
              </select>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
});

export default StandingsMonthSelector;

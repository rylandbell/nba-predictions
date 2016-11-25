'use strict';

import React from 'react';

const StandingsMonthSelector = React.createClass({
  handleChange: function(event) {
    this.props.getStandingsData(event.target.value);
  },
  render: function() {
    return (
      <form role="form" className="form-horizontal">
        <fieldset>
          <div className="form-group">
            <label className="col-sm-3 col-md-5 col-lg-4 control-label">Select a month:</label>
            <div className="col-sm-9 col-md-7 col-lg-8">
              <select className="form-control" onChange={this.handleChange}>
                <option value="2016-11">November 2016</option>
                <option value="2016-10">October 2016</option>
              </select>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
});

export default StandingsMonthSelector;

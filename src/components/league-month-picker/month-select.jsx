'use strict';

import React from 'react';

import MonthOption from './month-option.jsx';

const MonthSelect = React.createClass({
  handleChange: function(event) {
    this.props.setActiveMonth(event.target.value);
  },
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor="month-select" className="league-month-picker__label hidden-sm">Active month:&nbsp;</label>
        <select id="month-select" className="form-control league-month-picker__select" onChange={this.handleChange} value={this.props.activeMonth}>
          {this.props.availableMonths.map(
            (month,key) => <MonthOption month={month} key={key}/>                    
          )}
        </select>
      </div>
    )
  }
});

export default MonthSelect;
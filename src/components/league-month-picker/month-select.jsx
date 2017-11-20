import React, { Component } from "react";

import MonthOption from "./month-option.jsx";

class MonthSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.setActiveMonth(event.target.value);
  }
  render() {
    return (
      <div className="form-group">
        <label
          htmlFor="month-select"
          className="league-month-picker__label hidden-sm"
        >
          Active month:&nbsp;
        </label>
        <select
          id="month-select"
          className="form-control league-month-picker__select"
          onChange={this.handleChange}
          value={this.props.activeMonth}
        >
          {this.props.availableMonths.map((month, key) =>
            <MonthOption month={month} key={key} />
          )}
        </select>
      </div>
    );
  }
}

export default MonthSelect;

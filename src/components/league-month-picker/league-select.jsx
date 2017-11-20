import React, { Component } from "react";
import LeagueOption from "./league-option.jsx";

class LeagueSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.setActiveLeague(e.target.value);
  }
  render() {
    return (
      <div className="form-group">
        <label
          htmlFor="league-select"
          className="league-month-picker__label hidden-sm"
        >
          Active league:&nbsp;
        </label>
        <select
          id="league-select"
          className="form-control league-month-picker__select"
          onChange={this.handleChange}
          value={this.props.activeLeagueId}
        >
          {this.props.user.leagues.map((league, key) =>
            <LeagueOption league={league} key={key} />
          )}
        </select>
      </div>
    );
  }
}

export default LeagueSelect;

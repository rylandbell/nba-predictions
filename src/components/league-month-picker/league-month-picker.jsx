"use strict";

import React from "react";

import MonthSelect from "./month-select.jsx";
import LeagueSelect from "./league-select.jsx";

const LeagueMonthPicker = React.createClass({
  render: function() {
    let panelContent;

    //Display nothing if no leagues joined, waiting message if no user data, and picker component otherwise
    if (this.props.user && this.props.user.leagues) {
      if (this.props.user.leagues.length < 1) {
        panelContent = null;
      } else {
        panelContent = (
          <form className="navbar-form navbar-left league-month-picker">
            <div className="form-group">
              <LeagueSelect
                user={this.props.user}
                activeLeagueId={this.props.activeLeagueId}
                activeMonth={this.props.activeMonth}
                setActiveLeague={this.props.setActiveLeague}
              />
            </div>
            <div className="form-group">
              <MonthSelect
                activeMonth={this.props.activeMonth}
                currentMonth={this.props.currentMonth}
                activeLeagueId={this.props.activeLeagueId}
                setActiveMonth={this.props.setActiveMonth}
              />
            </div>
          </form>            
        );
      }
    } else {
      panelContent = <p className="text-center">Loading user data...</p>;
    }

    return panelContent;
  }
});

export default LeagueMonthPicker;

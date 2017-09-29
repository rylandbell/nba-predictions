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
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="league-month-picker">
                  <form role="form" className="form-inline">
                    <LeagueSelect
                      user={this.props.user}
                      activeLeagueId={this.props.activeLeagueId}
                      activeMonth={this.props.activeMonth}
                      setActiveLeague={this.props.setActiveLeague}
                      getUserMonthData={this.props.getUserMonthData}
                      getGameData={this.props.getGameData}
                      getStandingsData={this.props.getStandingsData}
                    />
                    <MonthSelect
                      activeMonth={this.props.activeMonth}
                      currentMonth={this.props.currentMonth}
                      activeLeagueId={this.props.activeLeagueId}
                      setActiveMonth={this.props.setActiveMonth}
                      getUserMonthData={this.props.getUserMonthData}
                      getGameData={this.props.getGameData}
                      getStandingsData={this.props.getStandingsData}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      panelContent = <p className="text-center">Loading user data...</p>;
    }

    return panelContent;
  }
});

export default LeagueMonthPicker;

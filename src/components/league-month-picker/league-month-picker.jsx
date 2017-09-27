"use strict";

import React from "react";

import MonthSelect from "./month-select.jsx";
import LeagueSelect from "./league-select.jsx";
import StatusMessage from "../status-message.jsx";

const LeagueMonthPicker = React.createClass({
  render: function() {
    let panelContent;

    if (this.props.user && this.props.user.leagues) {
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
    } else {
      panelContent = (
        <StatusMessage
          messageBold={"Loading user data..."}
          messageBody={"Just hang tight."}
          messageClass={"info"}
        />
      );
    }

    return panelContent;
  }
});

export default LeagueMonthPicker;

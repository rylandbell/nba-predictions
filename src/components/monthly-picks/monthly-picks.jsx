import React, { Component } from "react";

import MonthlyPicksSidebarContainer from "../containers/monthly-picks-sidebar-container.jsx";
import DailyPicksContainer from "../containers/daily-picks-container.jsx";
import StatusMessage from "../status-message.jsx";
import JoinMonth from "../utility/join-month.jsx";

class MonthlyPicksPage extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    document.title = document.title.split(" | ")[0] + " | My Picks";

    if (this.props.ui.showPicksTour) {
      this.props.runPicksTour();
    }
  }
  render() {
    const isLoading =
      this.props.fetchStatus.isFetchingUserMonthData ||
      this.props.fetchStatus.isFetchingGameData ||
      this.props.fetchStatus.isFetchingUserData;

    if (isLoading) {
      return (
        <StatusMessage
          messageBold={"Loading game data..."}
          messageBody={"Just hang tight."}
          messageClass={"info"}
        />
      );
    } else if (this.props.missingUserMonth) {
      return (
        <div
          className={
            "row " +
            (this.props.fetchStatus.isSendingPrediction ? "send-waiting" : "")
          }
        >
          <div className="col-xs-12 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2">
            <div className="panel panel-black panel-default">
              <div className="panel-heading">
                <div className="panel-title">Join Month</div>
              </div>
              <div className="panel-body">
                <JoinMonth
                  activeMonth={this.props.dates.activeMonth}
                  activeLeagueId={this.props.activeLeagueId}
                  createNewUserMonth={this.props.createNewUserMonth}
                  getUserMonthData={this.props.getUserMonthData}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            "row " +
            (this.props.fetchStatus.isSendingPrediction ? "send-waiting" : "")
          }
        >
          <div className="col-xs-12 col-sm-8 col-md-9">
            <DailyPicksContainer />
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3">
            <MonthlyPicksSidebarContainer />
          </div>
        </div>
      );
    }
  }
}

export default MonthlyPicksPage;

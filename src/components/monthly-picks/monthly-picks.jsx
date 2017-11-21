import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import React, { Component } from "react";

import MonthlyPicksSidebarContainer from "./monthly-picks-sidebar/monthly-picks-sidebar.jsx";
import DailyPicksContainer from "./daily-picks/daily-picks.jsx";
import StatusMessage from "../status-message.jsx";
import JoinMonth from "../utility/join-month.jsx";
import ActionCreator from '../../actions/action-creators.js';
import {createUserMonth} from '../../actions/api-post.js';
import { checkMissingUserMonth } from '../../selectors/missingUserMonth.js';
import {runPicksIntro} from '../../intro-tours.js';

const mapStateToProps = state => ({
  ui: state.ui,
  fetchStatus: state.fetchStatus,
  dates: state.dates,
  activeLeagueId: state.activeLeagueId,
  missingUserMonth: checkMissingUserMonth(state)
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: (activeMonth, leagueId) => {
    dispatch(createUserMonth(activeMonth, leagueId));
  },
  showAlert: (type, msg, options) => {
    const defaultOptions = {
      position: 'top',
      effect: 'stackslide',
      beep: false,
      timeout: 8000,
      offset: 0
    };
    options = Object.assign({}, defaultOptions, options);
    Alert[type](msg, options);
  },
  setActiveMonth: (month) => {
    dispatch(ActionCreator.setActiveMonth(month));
  },
  runPicksTour: () => {
    setTimeout(function () {
      runPicksIntro(dispatch);
    }, 500);
  }
});

class MonthlyPicks extends Component {
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

const MonthlyPicksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicks);

export default MonthlyPicksContainer;

import { connect } from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';
import React from "react";

import StatusMessage from "../status-message.jsx";
import JoinMonth from "../utility/join-month.jsx";
import UpcomingPicks from "./upcoming-picks.jsx";
import {createUserMonth} from '../../actions/api-post.js';
import ActionCreator from '../../actions/action-creators.js';
import { getActiveUserMonth } from '../../selectors/userMonth.js';
import { checkMissingUserMonth } from '../../selectors/missingUserMonth.js';

const mapStateToProps = state => ({
  missingUserMonth: checkMissingUserMonth(state),
  activeUserMonth: getActiveUserMonth(state),
  activeMonth: state.dates.activeMonth,
  activeLeagueId: state.activeLeagueId,
  currentMonth: state.dates.currentMonth,
  currentDate: state.dates.currentDate,
  showDashboardTour: state.ui.showDashboardTour
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: (activeMonth, leagueId) => {
    dispatch(createUserMonth(activeMonth, leagueId));
  },
  goToDate: (date) => {
    dispatch(ActionCreator.setActiveDate(date));
    
    const month = date.substring(0,7);
    const path = `/picks/${month}`;
    browserHistory.push(path);
  }
});

const PicksSummary = ({
  activeMonth,
  activeLeagueId,
  createNewUserMonth,
  activeUserMonth,
  currentDate,
  currentMonth,
  goToDate,
  missingUserMonth,
  showDashboardTour
}) => {
  let panelContent, panelTitle;
  if (missingUserMonth) {
    panelContent = (
      <JoinMonth
        activeMonth={activeMonth}
        activeLeagueId={activeLeagueId}
        createNewUserMonth={createNewUserMonth}
        showDashboardTour={showDashboardTour}
      />
    );
    panelTitle = `Join ${moment(activeMonth).format("MMMM")} Competition`;
  } else if (activeUserMonth && activeUserMonth.userMonthId) {
    panelContent = (
      <UpcomingPicks
        activeMonth={activeMonth}
        currentDate={currentDate}
        currentMonth={currentMonth}
        activeUserMonth={activeUserMonth}
        goToDate={goToDate}
      />
    );
    panelTitle = `My Upcoming Picks`;
  } else {
    panelContent = (
      <StatusMessage
        messageBold={"Loading user picks data..."}
        messageBody={"Just hang tight."}
        messageClass={"info"}
      />
    );
    panelTitle = "Loading";
  }
  return (
    <div className="panel panel-default panel-black picks-summary">
      <div className="panel-heading">
        <div className="panel-title">{panelTitle}</div>
      </div>
      <div className="panel-body">
        {panelContent}
      </div>
    </div>
  );
};

const PicksSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PicksSummary);

export default PicksSummaryContainer;



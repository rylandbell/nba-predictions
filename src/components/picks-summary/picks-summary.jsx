import React from "react";

import StatusMessage from "../status-message.jsx";
import JoinMonth from "../utility/join-month.jsx";
import UpcomingPicks from "./upcoming-picks.jsx";

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

export default PicksSummary;

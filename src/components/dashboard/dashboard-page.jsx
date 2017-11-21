import { connect } from 'react-redux';
import React, { Component } from "react";

import StandingsContainer from "../standings/standings-table.jsx";
import PicksSummaryContainer from "../picks-summary/picks-summary.jsx";
import ChatContainer from "../chat/chat-wall.jsx";

const mapStateToProps = state => ({
  showDashboardTour: state.ui.showDashboardTour,
  user: state.apiData.user
});

const mapDispatchToProps = () => ({
});

class DashboardPage extends Component {
  componentDidMount() {
    document.title = document.title.split(" | ")[0] + " | Dashboard";
  }
  render() {
    return (
      <div>
        <div className="row full-height-parent">
          <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5">
            <PicksSummaryContainer />
            <div className="hidden-xs">
              <ChatContainer />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-7 col-lg-7 full-height-child">
            <StandingsContainer />
          </div>
        </div>
      </div>
    );
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);

export default DashboardContainer;

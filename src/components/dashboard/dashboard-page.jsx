'use strict';

import React from 'react';
import Link from 'react-router/lib/Link';

import StandingsContainer from '../containers/standings-container.jsx';
import PicksSummaryContainer from '../containers/picks-summary-container.jsx';
import ChatContainer from '../containers/chat-container.jsx';

const DashboardPage = React.createClass({
  componentDidMount: function() {
    document.title = document.title.split(' | ')[0] + ' | Dashboard';
  },
  render: function() {
    return (
      <div>
        <p className="text-center dashboard-help-text"> Not sure what's happening? Need clarification about the rules? Check out the&nbsp;
          <Link to="/how-to-play">How to Play</Link>
          &nbsp;page.
        </p>
        <div className="row full-height-parent">
          
          <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5">
            <PicksSummaryContainer />
            <StandingsContainer />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-7 col-lg-7 hidden-xs full-height-child ">
            <ChatContainer />
          </div>
        </div>
      </div>
    )
  }
});

export default DashboardPage;
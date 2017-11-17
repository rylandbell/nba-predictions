'use strict';

import React from 'react';

import StandingsContainer from '../containers/standings-container.jsx';
import PicksSummaryContainer from '../containers/picks-summary-container.jsx';
import ChatContainer from '../containers/chat-container.jsx';
import {runDashboardIntro} from '../../intro-tours.js';

const DashboardPage = React.createClass({
  componentDidMount: function() {
    document.title = document.title.split(' | ')[0] + ' | Dashboard';
    setTimeout(function () {
      runDashboardIntro();
    }, 500)
  },
  render: function() {
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
    )
  }
});

export default DashboardPage;
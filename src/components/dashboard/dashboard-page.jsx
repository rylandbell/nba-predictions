'use strict';

import React from 'react';
import {introJs} from 'intro.js';

import StandingsContainer from '../containers/standings-container.jsx';
import PicksSummaryContainer from '../containers/picks-summary-container.jsx';
import ChatContainer from '../containers/chat-container.jsx';

function startIntro(){
  var intro = introJs();
  
  intro.setOptions({
    // mention league just joined
    // show link to leagues page
    // show link to how to play
    // show "Sign Up for November" panel
    steps: [
      { 
        intro: "Welcome to Pigeon Hoops!"
      },
      {
        element: document.querySelector('.more-dropdown'),
        intro: "In the \"More\" menu, you'll find links to league management and game rules."
      },
      {
        element: document.querySelector('.picks-summary'),
        intro: "Picks"
      },
      {
        element: document.querySelector('.navbar-brand'),
        intro: "Click the Pigeon Hoops logo to return to this page."
      }
    ],
    showProgress: true,
    showStepNumbers: false,
    nextLabel: " > ",
    prevLabel: " < ",
    skipLabel: "Skip Tour",
    doneLabel: "Finish Tour",
    exitOnOverlayClick: true
  });

  intro.start();
}

const DashboardPage = React.createClass({
  componentDidMount: function() {
    document.title = document.title.split(' | ')[0] + ' | Dashboard';
    setTimeout(function () {
      startIntro();
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
'use strict';

import React from 'react';
import {introJs} from 'intro.js';

import StandingsContainer from '../containers/standings-container.jsx';
import PicksSummaryContainer from '../containers/picks-summary-container.jsx';
import ChatContainer from '../containers/chat-container.jsx';

function startIntro(){
  var intro = introJs();
  
  intro.setOptions({
    steps: [
      { 
        intro: "You're just about ready to start playing, but let's start with a quick tour."
      },
      {
        element: document.querySelector('.navbar-brand'),
        intro: "Wherever you are on the site, you can always click the Pigeon Hoops logo to return to this page."
      },
      {
        element: document.querySelector('.more-dropdown'),
        intro: "The \"More\" menu contains links to two important pages. The Leagues page lets you look up the pass phrase you can use to invite others to join your league, create a new league, or join a friend's league. And the How-to-Play page explains the rules of the game, including some fine print."
      },
      {
        element: document.querySelector('.league-month-picker'),
        intro: "Here you can change the league and month for which you\'re making picks and viewing results."
      },
      {
        element: document.querySelector('.picks-summary'),
        intro: "Let's get started by making some actual picks. Click the Sign Up button to join the selected month's competition."
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
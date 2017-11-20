import {introJs} from 'intro.js';
import actions from './actions/action-creators.js';

export function runDashboardIntro(dispatch, joinPhrase){

  // test window size at moment intro initialized:
  const xsWindow = window.innerWidth < 768;

  // tour steps for XS windows:
  const xsSteps = [
    { 
      intro: `Success! You can invite other players to join this league by sharing the randomly generated pass phrase <strong>"${joinPhrase}"</strong>. You're almost ready to start playing, but let's start with a quick tour.`
    },
    {
      element: document.querySelector('.navbar-brand'),
      intro: "Wherever you are on the site, you can always click the Pigeon Hoops logo to return to this page."
    },
    {
      element: document.querySelector('.navbar-toggle'),
      intro: "This dropdown menu contains links to the rest of the site, including two important pages. The <strong>Leagues</strong> page lets you create a new league, join a friend's league, and view info about your current league(s). And the <strong>How-to-Play</strong> page explains the rules of the game."
    },
    {
      element: document.querySelector('.picks-summary'),
      intro: "Now let's make some actual picks! Click the Sign Up button to join the selected month's competition."
    }
  ];

  // tour steps for SM-LG windows:
  const regSteps = [
    { 
      intro: `Success! You can invite other players to join this league by sharing the randomly generated pass phrase <strong>"${joinPhrase}"</strong>. You're almost ready to start playing, but let's start with a quick tour.`
    },
    {
      element: document.querySelector('.navbar-brand'),
      intro: "Wherever you are on the site, you can always click the Pigeon Hoops logo to return to this page."
    },
    {
      element: document.querySelector('.more-dropdown'),
      intro: "The \"More\" menu contains links to two important pages. The <strong>Leagues</strong> page lets you create a new league, join a friend's league, and view info about your current league(s). And the <strong>How-to-Play</strong> page explains the rules of the game."
    },
    {
      element: document.querySelector('.league-month-picker'),
      intro: "Here you can change the league and month for which you\'re making picks and viewing results."
    },
    {
      element: document.querySelector('.picks-summary'),
      intro: "Now let's make some actual picks! Click the Sign Up button to join the selected month's competition."
    }
  ];

  window.dashboardIntro = introJs();
  
  window.dashboardIntro.setOptions({
    steps: xsWindow ? xsSteps : regSteps,
    showProgress: true,
    showStepNumbers: false,
    nextLabel: " > ",
    prevLabel: " < ",
    skipLabel: "Skip Tour",
    doneLabel: "Finish Tour",
    exitOnOverlayClick: true
  });

  window.dashboardIntro.onexit(() => {
    dispatch(actions.disableDashboardTour());
  });

  window.dashboardIntro.start();
}

export function runPicksIntro(){
  const intro = introJs();
  
  intro.setOptions({
    steps: [
      {
        intro: "Pick a winner by clicking on a logo. You can change picks any time before tip-off, so don't be shy about picking future games. Have fun!"
      }
    ],
    showProgress: false,
    showBullets: false,
    showStepNumbers: false,
    nextLabel: " > ",
    prevLabel: " < ",
    skipLabel: "Skip Tour",
    doneLabel: "Got it!",
    exitOnOverlayClick: true
  });

  intro.onexit(() => {
    dispatch(actions.disablePicksTour());
    dispatch(actions.disableDashboardTour());
  });

  intro.start();
}
import {introJs} from 'intro.js';

export function runDashboardIntro(){
  window.dashboardIntro = introJs();
  
  window.dashboardIntro.setOptions({
    steps: [
      { 
        intro: "You're almost ready to start playing, but let's start with a quick tour."
      },
      {
        element: document.querySelector('.navbar-brand'),
        intro: "Wherever you are on the site, you can always click the Pigeon Hoops logo to return to this page."
      },
      {
        element: document.querySelector('.more-dropdown'),
        intro: "The \"More\" menu contains links to two important pages. The Leagues page lets you create a new league, join a friend's league, and view info about your current league(s). And the How-to-Play page explains the rules of the game."
      },
      {
        element: document.querySelector('.league-month-picker'),
        intro: "Here you can change the league and month for which you\'re making picks and viewing results."
      },
      {
        element: document.querySelector('.picks-summary'),
        intro: "Now let's make some actual picks! Click the Sign Up button to join the selected month's competition."
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

  window.dashboardIntro.start();
}

export function runMonthlyPicksIntro(){
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

  intro.start();
}
//determine eligibility by:
//  check team's hasBeenChosen property
//  check if ANY team has dayOfMonth with value of the current day (do this in-component, rather than in store? lodash??)

const teamsList = ['ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

const playerChoices = { month: 'November' };
teamsList.forEach(team => {
  let teamObject = {};

  teamObject[team] = {
    gameId: null,
    dayOfMonth: null,
    hasBeenChosen: false
  };

  Object.assign(playerChoices, teamObject);
});

playerChoices.PHI.hasBeenChosen = true;
playerChoices.NOP.gameId = '0021600051';

export default playerChoices;

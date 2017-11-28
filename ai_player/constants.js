// Data source:
const url = "https://projects.fivethirtyeight.com/nba-model/nba_elo.csv";

// column names for 538's CSV data
const colNames = [
  "date",
  "season",
  "neutral",
  "playoff",
  "team1",
  "team2",
  "elo1_pre",
  "elo2_pre",
  "elo_prob1",
  "elo_prob2",
  "elo1_post",
  "elo2_post",
  "carmelo1_pre",
  "carmelo2_pre",
  "carmelo1_post",
  "carmelo2_post",
  "carmelo_prob1",
  "carmelo_prob2",
  "score1",
  "score2"
];

// 538-formatted team abbreviations
const teamList = [
  "ATL",
  "BRK",
  "BOS",
  "CHO",
  "CHI",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GSW",
  "HOU",
  "IND",
  "LAC",
  "LAL",
  "MEM",
  "MIA",
  "MIL",
  "MIN",
  "NOP",
  "NYK",
  "OKC",
  "ORL",
  "PHI",
  "PHO",
  "POR",
  "SAC",
  "SAS",
  "TOR",
  "UTA",
  "WAS",
  "nobody"
];

// Pigeon Hoops formatted team abbreviations
const phTeamList = [
  "ATL",
  "BKN",
  "BOS",
  "CHA",
  "CHI",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GSW",
  "HOU",
  "IND",
  "LAC",
  "LAL",
  "MEM",
  "MIA",
  "MIL",
  "MIN",
  "NOP",
  "NYK",
  "OKC",
  "ORL",
  "PHI",
  "PHX",
  "POR",
  "SAC",
  "SAS",
  "TOR",
  "UTA",
  "WAS",
  null
];

// create map to translate 538 -> Pigeon Hoops team naming
const teamMap = {};

teamList.forEach((team, key) => {
  teamMap[team] = phTeamList[key];
});

module.exports = { url, colNames, teamList, teamMap };

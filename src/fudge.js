const fudge = {
  roadTeam: {
    teamName: "PHX",
    isEligible: true,
    isChosen: true,
    isWinner: false,
    isLoser: false
  },
  homeTeam: {
    teamName: "CHI",
    isEligible: false,
    isChosen: false,
    isWinner: false,
    isLoser: false
  },
  gameStatus: {
    startTime: '7:30 pm ET',
    hasStarted: true,
    homeScore: 14,
    roadScore: 9,
    isFinal: true
  }
};

module.exports = fudge;
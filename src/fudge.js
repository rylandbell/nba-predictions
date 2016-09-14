const fudge = [
  {
    roadTeam: {
      teamName: 'POR',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'UTA',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: false,
      homeScore: null,
      roadScore: null,
      isFinal: false
    }
  },
  {
    roadTeam: {
      teamName: 'LAC',
      isEligible: false,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'DAL',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: false,
      homeScore: null,
      roadScore: null,
      isFinal: false
    }
  },
  {
    roadTeam: {
      teamName: 'HOU',
      isEligible: true,
      isChosen: true,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'LAL',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: false,
      homeScore: null,
      roadScore: null,
      isFinal: false
    }
  },
  {
    roadTeam: {
      teamName: 'DEN',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'SAN',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: true,
      homeScore: 9,
      roadScore: 22,
      isFinal: false
    }
  },
  {
    roadTeam: {
      teamName: 'CHI',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'MI',
      isEligible: true,
      isChosen: true,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: true,
      homeScore: 60,
      roadScore: 47,
      isFinal: false
    }
  },
  {
    roadTeam: {
      teamName: 'BKN',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'BOS',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: true,
      homeScore: 90,
      roadScore: 97,
      isFinal: true
    }
  },
  {
    roadTeam: {
      teamName: 'NYK',
      isEligible: true,
      isChosen: true,
      isWinner: true,
      isLoser: false
    },
    homeTeam: {
      teamName: 'MIN',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: true,
      homeScore: 90,
      roadScore: 97,
      isFinal: true
    }
  },
  {
    roadTeam: {
      teamName: 'MIL',
      isEligible: true,
      isChosen: true,
      isWinner: false,
      isLoser: true
    },
    homeTeam: {
      teamName: 'DET',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: true,
      homeScore: 84,
      roadScore: 79,
      isFinal: true
    }
  }
];

module.exports = fudge;


//determine eligibility by:
//  check team's hasBeenChosen property
//  check if ANY team has dayOfMonth with value of the current day (lodash??)

const playerChoices = {
  month: 'Nov',
  ATL: {
    gameId: 3291432943,
    opponent: 'CHA',
    dayOfMonth: 19,
    hasBeenChosen: true,

    // wasSuccesful: false ?????
  },
  BOS: {
    gameId: null,
    opponent: null,
    dayOfMonth: null,
    hasBeenChosen: false
  }
};

const fudge = [
  {
    gameId: 1,
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
    gameId: 2,
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
    gameId: 3,
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
      startTime: '10:30 pm ET',
      hasStarted: false,
      homeScore: null,
      roadScore: null,
      isFinal: false
    }
  },
  {
    gameId: 4,
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
    gameId: 5,
    roadTeam: {
      teamName: 'CHI',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'MIA',
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
    gameId: 6,
    roadTeam: {
      teamName: 'OKC',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    homeTeam: {
      teamName: 'GSW',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: false
    },
    gameStatus: {
      startTime: '10:00 pm ET',
      hasStarted: true,
      homeScore: 108,
      roadScore: 47,
      isFinal: false
    }
  },
  {
    gameId: 7,
    roadTeam: {
      teamName: 'BKN',
      isEligible: true,
      isChosen: false,
      isWinner: true,
      isLoser: false
    },
    homeTeam: {
      teamName: 'BOS',
      isEligible: true,
      isChosen: false,
      isWinner: false,
      isLoser: true
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
    gameId: 8,
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
      isLoser: true
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
    gameId: 9,
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
      isWinner: true,
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

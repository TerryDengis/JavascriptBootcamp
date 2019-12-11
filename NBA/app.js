const warriorsGames = [
  {
    awayTeam: {
      team: "Golden State",
      points: 119,
      isWinner: true
    },
    homeTeam: {
      team: "Houston",
      points: 106,
      isWinner: false
    }
  },
  {
    awayTeam: {
      team: "Golden State",
      points: 105,
      isWinner: false
    },
    homeTeam: {
      team: "Houston",
      points: 127,
      isWinner: true
    }
  },
  {
    homeTeam: {
      team: "Golden State",
      points: 126,
      isWinner: true
    },
    awayTeam: {
      team: "Houston",
      points: 85,
      isWinner: false
    }
  },
  {
    homeTeam: {
      team: "Golden State",
      points: 92,
      isWinner: false
    },
    awayTeam: {
      team: "Houston",
      points: 95,
      isWinner: true
    }
  },
  {
    awayTeam: {
      team: "Golden State",
      points: 94,
      isWinner: false
    },
    homeTeam: {
      team: "Houston",
      points: 98,
      isWinner: true
    }
  },
  {
    homeTeam: {
      team: "Golden State",
      points: 115,
      isWinner: true
    },
    awayTeam: {
      team: "Houston",
      points: 86,
      isWinner: false
    }
  },
  {
    awayTeam: {
      team: "Golden State",
      points: 101,
      isWinner: true
    },
    homeTeam: {
      team: "Houston",
      points: 92,
      isWinner: false
    }
  }
];

const getScoreLine = ({ homeTeam, awayTeam }) => {
  const { team: hTeam, points: hPoints } = homeTeam;
  const { team: aTeam, points: aPoints } = awayTeam;
  const teamNames = `${aTeam} @ ${hTeam}`;
  let scoreLine;

  if (hPoints > aPoints) {
    scoreLine = `${aPoints} - <strong>${hPoints}</strong>`;
  } else {
    scoreLine = `<strong>${aPoints}</strong> - ${hPoints}`;
  }

  return `${teamNames} ${scoreLine}`;
};

const makeChart = (games, targetTeam) => {
  const ul = document.createElement("ul");
  for (let game of games) {
    const { homeTeam, awayTeam } = game;
    const target = homeTeam.team === targetTeam ? homeTeam : awayTeam;
    const li = document.createElement("li");
    li.classList.add(target.isWinner ? "win" : "loss");
    const scoreLine = getScoreLine(game);
    li.innerHTML = getScoreLine(game);
    ul.append(li);
  }

  return ul;
};

document
  .querySelector("#gsw")
  .appendChild(makeChart(warriorsGames, "Golden State"));
document.querySelector("#hr").appendChild(makeChart(warriorsGames, "Houston"));

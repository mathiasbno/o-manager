const { getData, saveData } = require("../database/index.js");
const {
  findResultById,
  asyncForEach,
  filterRunnersByEventId
} = require("./helper.js");

function pointsFormula(x, maxScore) {
  const A = maxScore;
  const B = 7;
  const C = 0.075;
  const e = Math.E;
  const _x = x - 1;

  // Math Compatible formula
  // f(x) = 10000 - Aℯ ^ (-Bℯ ^ (-Cx))

  return Math.ceil(A * e ** (-B * e ** (-C * _x)));
}

function getPointForPosition(x, maxScore = 10000) {
  return maxScore + pointsFormula(1, maxScore) - pointsFormula(x, maxScore);
}

function calculatPoints(position, status, teamPosition) {
  let runnerPoints = 0;
  let teamBonusPoints = 0;
  runnerPoints = getPointForPosition(position);

  // TODO: Might have to rework this, testing needed
  if (teamPosition) {
    const teamMaxPoints = 1000;
    teamBonusPoints = getPointForPosition(teamPosition, teamMaxPoints);
  }

  if (status === "DidNotStart" || status === "MisPunch") {
    runnerPoints = 0;
  }

  return { totalPoints: runnerPoints, bonusPoints: teamBonusPoints };
}

function setPointForRunners(pointsForEvent) {
  getData(`${process.env.API_URL}/runners`).then(runners => {
    _runners = filterRunnersByEventId(runners, pointsForEvent);
    asyncForEach(_runners, async function(runner) {
      const result = findResultById(runner.results, pointsForEvent);

      const points = calculatPoints(
        result.legPosition,
        result.status,
        result.overallResult.position
      );

      result.points = points;

      await saveData(`${process.env.API_URL}/runner`, runner)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
}

function getPointsForRunner(runner, pointsForEvent) {
  const result = findResultById(runner.results, pointsForEvent);

  return result.points.totalPoints;
}

function getPointsForTeam(team, pointsForEvent) {
  let teamPoints = 0;

  team.forEach(function(runner) {
    teamPoints = teamPoints + getPointsForRunner(runner, pointsForEvent);
  });

  return teamPoints;
}

module.exports.calculatPoints = calculatPoints;
module.exports.setPointForRunners = setPointForRunners;
module.exports.getPointsForRunner = getPointsForRunner;
module.exports.getPointsForTeam = getPointsForTeam;

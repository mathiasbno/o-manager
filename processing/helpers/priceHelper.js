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

function getPriceRangeForType(eventForm, position) {
  let price = 0;

  switch (true) {
    case eventForm === "RelaySingleDay":
      switch (true) {
        case position < 1:
          price = 500;
          break;
        case position < 11:
          price = 5000;
          break;
        case position < 21:
          price = 3500;
          break;
        case position < 36:
          price = 2500;
          break;
        case position < 51:
          price = 1750;
          break;
        case position < 100:
          price = 1000;
          break;
        default:
          price = 500;
          break;
      }
  }

  return price;
}

function calculatePrice(position, priceForEventId, eventId, EventForm) {
  const cost = getPriceRangeForType(EventForm, position);

  return {
    event: priceForEventId,
    priceBasedOn: eventId,
    cost: cost,
    eventForm: EventForm
  };
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

function setPriceForRunners(priceForEvent, basedOnEvent, customEventForm) {
  getData(`${process.env.API_URL}/runners`)
    .then(runners => {
      asyncForEach(runners, async function(runner) {
        const result = findResultById(runner.results, basedOnEvent);
        const position = result.legPosition;
        const event = result.event;
        const newPrice = calculatePrice(
          position,
          priceForEvent,
          event._id,
          event.eventForm || customEventForm
        );

        // Make sure that the price calculation does not already excist for this event
        const found = runner.price.findIndex(function(element) {
          return element.event === newPrice.event;
        });

        if (found < 0) {
          runner.price.push(newPrice);

          await saveData(`${process.env.API_URL}/runner`, runner)
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
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

module.exports.calculatePrice = calculatePrice;
module.exports.calculatPoints = calculatPoints;
module.exports.setPriceForRunners = setPriceForRunners;
module.exports.setPointForRunners = setPointForRunners;
module.exports.getPointsForRunner = getPointsForRunner;
module.exports.getPointsForTeam = getPointsForTeam;

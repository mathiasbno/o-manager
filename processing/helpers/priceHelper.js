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

function setPriceForRunners(priceForEvent, customEventForm) {
  getData(`${process.env.API_URL}/runners`)
    .then(runners => {
      asyncForEach(runners, async function(runner) {
        const position = runner.results[0].legPosition;
        const event = runner.results[0].event;
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

function calculatPoints(position, status, teamPosition) {
  let points = 0;

  points = getPointForPosition(position);

  if (status === "DidNotStart") {
    return 0;
  }

  if (status === "MisPunch") {
    return points * 0.2;
  }

  // TODO: Add team bonus
  // if (teamPosition) {
  //   const teamMaxPoints = 1000;
  //   const teamBonusPoints = getPointForPosition(teamPosition, teamMaxPoints);

  //   points = points + teamBonusPoints;
  // }

  return points;
}

module.exports.calculatePrice = calculatePrice;
module.exports.calculatPoints = calculatPoints;

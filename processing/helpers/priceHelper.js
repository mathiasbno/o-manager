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

function calculatPoints(position, teamPosition, behind, status) {
  const minimumPoints = 2000;

  if (status === "DidNotStart") {
    return 0;
  }

  if (status === "MisPunch") {
    return minimumPoints * 0.2;
  }

  let teamBonusPoints = 1000;
  let points = 10000;

  points = points + teamBonusPoints;

  // console.log(points, position, teamPosition, behind, status);

  return points;
}

module.exports.calculatePrice = calculatePrice;
module.exports.calculatPoints = calculatPoints;

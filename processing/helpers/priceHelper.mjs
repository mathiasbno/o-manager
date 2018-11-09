import { getData, saveData } from "../database/index";
import { findResultById, asyncForEach } from "./helper";

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

export { calculatePrice, setPriceForRunners };

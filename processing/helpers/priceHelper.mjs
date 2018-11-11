import { getData, saveData } from "../database/index";
import { findResultById, asyncForEach, filterRunnersByEventId } from "./helper";

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
    case eventForm === "IndSingleDay":
      switch (true) {
        case position < 1:
          price = 500;
          break;
        case position < 11:
          price = 5000;
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

function calculatePrice(position, priceForEventId, eventId, eventForm, _class) {
  const cost = getPriceRangeForType(eventForm, position);

  return {
    event: priceForEventId,
    priceBasedOn: eventId,
    cost: cost,
    eventForm: eventForm,
    class: _class
  };
}

function setPriceForRunners(priceForEvent, basedOnEvent, customEventForm) {
  getData(`${process.env.API_URL}/runners`)
    .then(runners => {
      const _runners = filterRunnersByEventId(runners, priceForEvent);

      asyncForEach(_runners, async function(runner) {
        let result = findResultById(runner.results, basedOnEvent);
        let newPrice = null;

        // Check if the runner did run the evaluation race
        if (result.length) {
          // If runner has more results in the same event
          if (result.length > 1) {
            result.forEach(_result => {
              // TODO: Enable none relay races also
              const position = _result.legPosition || _result.position;
              const event = _result.event;
              newPrice = calculatePrice(
                position,
                priceForEvent,
                basedOnEvent,
                event.eventForm || customEventForm,
                _result.class
              );

              // Make sure that the price calculation does not already excist for this class
              const found = runner.price.findIndex(function(element) {
                return element.class.id === newPrice.class.id;
              });

              if (found < 0) {
                runner.price.push(newPrice);
              }
            });
          } else {
            const _result = result[0];
            const position = _result.legPosition || _result.position;
            const event = _result.event;
            newPrice = calculatePrice(
              position,
              priceForEvent,
              basedOnEvent,
              event.eventForm || customEventForm,
              _result.class
            );

            // Make sure that the price calculation does not already excist for this class
            const found = runner.price.findIndex(function(element) {
              return element.class.id === newPrice.class.id;
            });

            if (found < 0) {
              runner.price.push(newPrice);
            }
          }

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

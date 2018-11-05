const EventorApi = require("./eventor-api/index.js");
const { saveData, getData, saveConnectedData } = require("./database/index.js");
const { processRelayEvent, processEvent } = require("./helpers/eventHelper.js");
const { asyncForEach } = require("./helpers/helper.js");
const { calculatePrice } = require("./helpers/priceHelper.js");

const EventorNO = new EventorApi({
  apiKey: process.env.EVENTOR_NO_APIKEY,
  url: "https://eventor.orientering.no/api/"
});

const EventorIOF = new EventorApi({
  apiKey: process.env.EVENTOR_IOF_APIKEY,
  url: "https://eventor.orienteering.org/api/"
});

const EventorSE = new EventorApi({
  apiKey: process.env.EVENTOR_SE_APIKEY,
  url: "https://eventor.orientering.se/api/"
});

function processAndSaveRelayEvent(eventor, eventId, dryrun = false) {
  eventor.resultsEvent(eventId).then(result => {
    const processedEvent = processRelayEvent(result);
    const event = processedEvent.event;
    const nations = processedEvent.nations;
    const teams = processedEvent.teams;
    const runners = processedEvent.runners;

    if (!dryrun) {
      Promise.all(saveConnectedData(event, nations, teams)).then(function() {
        asyncForEach(runners, async runner => {
          await saveData(`${process.env.API_URL}/runner`, runner)
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    } else {
      console.log(event);
      console.log(nations.length, nations);
      console.log(teams.length, teams);
      console.log(runners.length, runners);
    }
  });
}

function processAndSaveEvent(eventor, eventId, dryrun = false) {
  eventor.resultsEvent(eventId).then(result => {
    const processedEvent = processEvent(result);
    const event = processedEvent.event;
    const nations = processedEvent.nations;
    const teams = processedEvent.teams;
    const runners = processedEvent.runners;

    if (!dryrun) {
      Promise.all(saveConnectedData(event, nations, teams)).then(function() {
        runners.forEach(function(runner) {
          saveData(`${process.env.API_URL}/runner`, runner)
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    } else {
      console.log(event);
      console.log(nations.length, nations);
      console.log(teams.length, teams);
      console.log(runners.length, runners);
    }
  });
}

// TODO: Move this in its seperate function for price calculation
// We need to wait for the server to restart due to nodemon,
// this will not be a problem when deploying
setTimeout(function() {
  getData(`${process.env.API_URL}/runner/5bdf653bc3f70081fd5b341a`)
    .then(data => {
      const position = data.results[0].legPosition;
      const event = data.results[0].event;
      const newPrice = calculatePrice(
        position,
        "5bdf7a5b23c05f9a3e895f4a",
        event._id,
        event.eventForm
      );

      data.price.push(newPrice);

      console.log(data);

      saveData(`${process.env.API_URL}/runner`, data)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}, 400);

// processAndSaveRelayEvent(EventorSE, 17220, true);
// processAndSaveEvent(EventorNO, 8070, true);

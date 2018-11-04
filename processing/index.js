const EventorApi = require("./eventor-api/index.js");
const { saveData, saveConnectedData } = require("./database/index.js");
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

// processAndSaveRelayEvent(EventorSE, 17220, true);
// processAndSaveEvent(EventorNO, 8070, true);

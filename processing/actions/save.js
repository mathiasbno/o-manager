const { saveData, saveConnectedData } = require("../database/index.js");
const { processRelayEvent, processEvent } = require("./process.js");
const { asyncForEach } = require("../helpers/helper.js");

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

module.exports.processAndSaveRelayEvent = processAndSaveRelayEvent;
module.exports.processAndSaveEvent = processAndSaveEvent;

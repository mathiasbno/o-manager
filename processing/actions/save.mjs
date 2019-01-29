import {
  saveData,
  saveConnectedData
} from "../database/index";
import {
  processRelayEvent,
  processEvent
} from "./process";
import {
  asyncForEach,
  convertToBool
} from "../helpers/helper";

function processAndSaveResults(eventor, eventId, dryrun = false) {
  const _dryrun = convertToBool(dryrun);
  console.log("Starting process");
  return new Promise((resolve, reject) => {
    console.log("Fetching from Eventor");
    eventor.resultsEvent(eventId).then(result => {
      console.log("Done fetching from Eventor");
      let processedEvent = null;

      if (result.Event.eventForm === "RelaySingleDay") {
        console.log("RELAY");
        processedEvent = processRelayEvent(result);
      } else {
        console.log("INDIVIDUAL");
        processedEvent = processEvent(result);
      }

      const event = processedEvent.event;
      const nations = processedEvent.nations;
      const teams = processedEvent.teams;
      const runners = processedEvent.runners;

      if (!_dryrun) {
        Promise.all(saveConnectedData(event, nations, teams)).then(function () {
          asyncForEach(runners, async runner => {
            await saveData(`${process.env.API_URL}/runner`, runner)
              .then(data => {
                console.log(data);
              })
              .catch(err => {
                reject(err);
              });
          });
          resolve('DONE!');
        });
      } else {
        resolve({
          event,
          nations,
          teams,
          runners
        });
        console.log(event);
        console.log(nations.length, nations);
        console.log(teams.length, teams);
        console.log(runners.length, runners);
      }
    }).catch(err => {
      console.log('Error', err);
    });
  });
}

function processAndSaveEntries(eventor, eventId, dryrun = false) {
  const _dryrun = convertToBool(dryrun);
  console.log("Starting process");
  return new Promise((resolve, reject) => {
    console.log("Fetching from Eventor");
    Promise.all([eventor.event(eventId), eventor.eventClasses(eventId), eventor.entriesEvent(eventId)]).then(function (data) {
      console.log("Done fetching from Eventor");
      let processedEvent = null;

      const _data = {
        "Event": data[0]["Event"],
        "EventClassList": data[1]["EventClassList"],
        "EventEntries": data[2]
      }

      if (_data.Event.eventForm === "RelaySingleDay") {
        console.log("RELAY");
        processedEvent = processRelayEvent(_data);
      } else {
        console.log("INDIVIDUAL");
        processedEvent = processEvent(_data);
      }

      const event = processedEvent.event;
      const nations = processedEvent.nations;
      const teams = processedEvent.teams;
      const runners = processedEvent.runners;

      if (!_dryrun) {
        Promise.all(saveConnectedData(event, nations, teams)).then(function () {
          asyncForEach(runners, async runner => {
            await saveData(`${process.env.API_URL}/runner`, runner)
              .then(data => {
                console.log(data);
              })
              .catch(err => {
                reject(err);
              });
          });
          resolve('DONE!');
        });
      } else {
        console.log(event);
        console.log(nations.length, nations);
        console.log(teams.length, teams);
        console.log(runners.length, runners);

        resolve({
          event,
          nations,
          teams,
          runners
        });
      }
    }).catch(err => {
      console.log('Error', err);
    });;
  });
}

export {
  processAndSaveResults,
  processAndSaveEntries
};

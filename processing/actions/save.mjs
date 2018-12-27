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

function processAndSaveEvent(eventor, eventId, dryrun = false) {
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

      console.log("Dryrun:", _dryrun, !_dryrun, convertToBool(_dryrun));

      if (!_dryrun) {
        Promise.all(saveConnectedData(event, nations, teams)).then(function () {
          resolve(
            asyncForEach(runners, async runner => {
              await saveData(`${process.env.API_URL}/runner`, runner)
                .then(data => {
                  console.log(data);
                })
                .catch(err => {
                  reject(err);
                });
            })
          );
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
    });
  });
}

export {
  processAndSaveEvent
};

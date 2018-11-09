import { saveData, saveConnectedData } from "../database/index";
import { processRelayEvent, processEvent } from "./process";
import { asyncForEach } from "../helpers/helper";

function processAndSaveRelayEvent(eventor, eventId, dryrun = false) {
  console.log("Starting process");
  return new Promise((resolve, reject) => {
    console.log("Fetching from Eventor");
    eventor.resultsEvent(eventId).then(result => {
      console.log("Done fetching from Eventor");
      const processedEvent = processRelayEvent(result);
      const event = processedEvent.event;
      const nations = processedEvent.nations;
      const teams = processedEvent.teams;
      const runners = processedEvent.runners;

      if (!dryrun) {
        Promise.all(saveConnectedData(event, nations, teams)).then(function() {
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
        resolve({ event, nations, teams, runners });
        console.log(event);
        console.log(nations.length, nations);
        console.log(teams.length, teams);
        console.log(runners.length, runners);
      }
    });
  });
}

function processAndSaveEvent(eventor, eventId, dryrun = false) {
  console.log("Starting process");
  return new Promise((resolve, reject) => {
    console.log("Fetching from Eventor");
    eventor.resultsEvent(eventId).then(result => {
      console.log("Done fetching from Eventor");
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
  });
}

export { processAndSaveRelayEvent, processAndSaveEvent };

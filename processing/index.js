const EventorApi = require("./eventor-api/index.js");
const {
  processAndSaveRelayEvent,
  processAndSaveEvent
} = require("./actions/save.js");

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

// TODO: Move this in its seperate function for price calculation
// We need to wait for the server to restart due to nodemon,
// this will not be a problem when deploying
setTimeout(function() {
  // setPriceForRunners("5bdf7a5b23c05f9a3e895f4a");
  // setPointForRunners("5bde01ddb408a6febb7866f3");
}, 1000);
// processAndSaveRelayEvent(EventorSE, 20090, true);
processAndSaveEvent(EventorNO, 8998, true);

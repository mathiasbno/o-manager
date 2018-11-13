import { processAndSaveEvent } from "./actions/save";
import { setPriceForRunners } from "./helpers/priceHelper";
import EventorApi from "./eventor-api/index";

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
  // GROMLØPET
  // setPriceForRunners(8998, 7816);
  // TIOMILA
  // setPriceForRunners(17220, 14802);
}, 1000);
// setPointForRunners("5bde01ddb408a6febb7866f3");

// TIOMILA
// processAndSaveEvent(EventorSE, 14802); // 2017
// processAndSaveEvent(EventorSE, 17220); // 2018

// GROMLØPET
// processAndSaveEvent(EventorNO, 7816, true); // 2017
// processAndSaveEvent(EventorNO, 8998, true); // 2018

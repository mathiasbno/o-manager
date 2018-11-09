import { processAndSaveRelayEvent } from "./actions/save";
import { setPriceForRunners } from "./helpers/priceHelper";

// TODO: Move this in its seperate function for price calculation
// We need to wait for the server to restart due to nodemon,
// this will not be a problem when deploying
setTimeout(function() {
  // setPriceForRunners(17220, 14802);
}, 1000);
// setPointForRunners("5bde01ddb408a6febb7866f3");

// processAndSaveRelayEvent(EventorSE, 14802, true); // 2017
// processAndSaveRelayEvent(EventorSE, 17220, true); // 2018

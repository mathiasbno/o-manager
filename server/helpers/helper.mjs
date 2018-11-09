import EventorApi from "../../processing/eventor-api/index";

function getEventor(eventor) {
  let _eventor = null;

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

  switch (eventor) {
    case "NO":
      _eventor = EventorNO;
      break;
    case "SE":
      _eventor = EventorSE;
      break;
    case "IOF":
      _eventor = EventorIOF;
      break;
    default:
      _eventor = EventorNO;
  }

  return _eventor;
}

export { getEventor };

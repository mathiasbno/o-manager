import validator from "validator";
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

const findOneById = function(model, id) {
  return new Promise((resolve, reject) => {
    if (typeof id == "object") {
      resolve(id);
    } else {
      let query = { id: id };
      if (validator.isMongoId(id.toString())) {
        query = { _id: id.toString() };
      }

      model.findOne(query).exec((err, _model) => {
        if (err) reject(err);
        else resolve(_model._id);
      });
    }
  });
};

export { getEventor, findOneById };

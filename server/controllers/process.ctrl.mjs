import {
  processAndSaveEvent
} from "../../processing/actions/save";
import {
  previewEvent
} from "../../processing/actions/preview";
import {
  getEventor
} from "../helpers/helper.mjs";

export default {
  processEvent: (req, res, next) => {
    const {
      eventor,
      eventId
    } = req.params;
    const {
      dryrun
    } = req.query;

    const _eventor = getEventor(eventor);

    processAndSaveEvent(_eventor, eventId, dryrun)
      .then(function (data) {
        res.status(200).send(data);
        next();
      })
      .catch(function (err) {
        res.status(400).send(err);
        next();
      });
  },
  previewEvent: (req, res, next) => {
    const {
      eventor,
      eventId
    } = req.params;
    const _eventor = getEventor(eventor);
    previewEvent(_eventor, eventId)
      .then(function (data) {
        res.status(200).send(data);
        next();
      })
      .catch(function (err) {
        res.status(400).send(err);
        next();
      });

  }
};

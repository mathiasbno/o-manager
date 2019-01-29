import {
  processAndSaveResults,
  processAndSaveEntries
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
      dryrun,
      eventStatus
    } = req.query;

    const _eventor = getEventor(eventor);

    // EventStatus defenition:
    //
    // 1 Applied
    // 2 ApprovedByRegion
    // 3 Approved
    // 4 Created
    // 5 EntryOpened
    // 6 EntryPaused
    // 7 EntryClosed
    // 8 Live
    // 9 Completed
    // 10 Canceled
    // 11 Reported

    if (eventStatus < 9) {
      processAndSaveEntries(_eventor, eventId, dryrun)
        .then(function (data) {
          res.status(200).send(data);
          next();
        })
        .catch(function (err) {
          res.status(400).send(err);
          next();
        });
    } else {
      processAndSaveResults(_eventor, eventId, dryrun)
        .then(function (data) {
          res.status(200).send(data);
          next();
        })
        .catch(function (err) {
          res.status(400).send(err);
          next();
        });
    }
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

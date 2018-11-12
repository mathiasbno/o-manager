import { processAndSaveEvent } from "../../processing/actions/save";
import { getEventor } from "../helpers/helper.mjs";

export default {
  processEvent: (req, res, next) => {
    const { eventor, id, dryrun = false } = req.body;
    const _eventor = getEventor(eventor);

    processAndSaveEvent(_eventor, id, dryrun)
      .then(function(data) {
        res.status(200).send(data);
        next();
      })
      .catch(function(err) {
        res.status(400).send(err);
        next();
      });
  }
};

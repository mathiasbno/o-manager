import { processAndSaveRelayEvent } from "../../processing/actions/save";
import { getEventor } from "../helpers/helper.mjs";

export default {
  processRelayEvent: (req, res, next) => {
    const { eventor, id, dryrun } = req.body;
    const _eventor = getEventor(eventor);

    processAndSaveRelayEvent(_eventor, id, dryrun).then(function(data) {
      res.status(200).send(data);
      next();
    });
  }
};

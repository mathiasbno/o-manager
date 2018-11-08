import { EventModel } from "../models/Event.mjs";

export default {
  saveEvent: (req, res, next) => {
    const query = { id: req.body.id };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    EventModel.findOneAndUpdate(query, req.body, options, function(err, event) {
      if (err) res.send(err);
      else if (!event) res.send(400);
      else res.send(event);
      next();
    });
  },
  deleteEvents: (req, res, next) => {
    EventModel.remove({}, function(err) {
      if (err) return handleError(err);
      next();
    });
  },
  getAll: (req, res, next) => {
    EventModel.find(req.params.id).exec((err, event) => {
      if (err) res.send(err);
      else if (!event) res.send(400);
      else res.send(event);
      next();
    });
  },
  getEvent: (req, res, next) => {
    EventModel.find({ name: req.params.id }).exec((err, event) => {
      if (err) res.send(err);
      else if (!event.length) res.send(404);
      else res.send(event[0]);
      next();
    });
  }
};

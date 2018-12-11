import {
  PlayerEventModel
} from "../models/PlayerEvent.mjs";

export default {
  savePlayerEvent: (req, res, next) => {
    PlayerEventModel.create(req.body, function (err, playerEvent) {
      if (err) res.send(err);
      else if (!playerEvent) res.send(400);
      else res.send(playerEvent);
      next();
    });
  },
  deletePlayerEvents: (req, res, next) => {
    PlayerEventModel.remove({}, function (err) {
      if (err) return handleError(err);
      next();
    });
  },
  getAll: (req, res, next) => {
    PlayerEventModel.find(req.params.id)
      .populate("players")
      .populate("event")
      .exec((err, playerEvent) => {
        if (err) res.send(err);
        else if (!playerEvent) res.send(400);
        else res.send(playerEvent);
        next();
      });
  },
  getPlayerEvent: (req, res, next) => {
    PlayerEventModel.find({
        name: req.params.id
      })
      .populate("players")
      .populate("event")
      .exec((err, playerEvent) => {
        if (err) res.send(err);
        else if (!playerEvent.length) res.send(404);
        else res.send(playerEvent[0]);
        next();
      });
  }
};

import {
  PlayerModel
} from "../models/Player.mjs";

export default {
  savePlayer: (req, res, next) => {
    PlayerModel.create(req.body, function (err, player) {
      if (err) res.send(err);
      else if (!player) res.sendStatus(400);
      else res.send(player);
      next();
    });
  },
  joinPlayerEvent: (req, res, next) => {
    // TODO: Use logged in athhlete id
    const query = {
      _id: "5c0303ce0fc5241fcd1cb927" // User
    };
    const options = {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true
    };

    const teams = req.body.eventClasses.map((eventClass) => {
      return {
        playerEventClassId: eventClass._id,
        runners: []
      }
    });

    console.log(teams);

    PlayerModel.findOneAndUpdate(
      query, {
        $push: {
          playerEvents: {
            teamName: "",
            teams: teams,
            playerEventId: req.body._id
          }
        }
      },
      options,
      function (err, player) {
        if (err) res.send(err);
        else if (!player) res.sendStatus(400);
        else res.send(player);
        next();
      }
    );
  },
  deletePlayers: (req, res, next) => {
    PlayerModel.remove({}, function (err) {
      if (err) return handleError(err);
      next();
    });
  },
  getAll: (req, res, next) => {
    PlayerModel.find(req.params.id)
      .populate("playerEvents")
      .exec((err, player) => {
        if (err) res.send(err);
        else if (!player) res.sendStatus(400);
        else res.send(player);
        next();
      });
  },
  getPlayer: (req, res, next) => {
    PlayerModel.find({
        _id: req.params.id
      }).populate("playerEvents.eventId")
      .exec((err, player) => {
        if (err) res.send(err);
        else if (!player.length) res.sendStatus(404);
        else res.send(player[0]);
        next();
      });
  }
};

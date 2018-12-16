import {
  standardUpdateOptions
} from "../helpers/helper";

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
      _id: process.env.REACT_APP_PLAYER_ID // User
    };

    const teams = req.body.eventClasses.map(eventClass => {
      return {
        playerEventClassId: eventClass._id,
        runners: []
      };
    });

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
      standardUpdateOptions(),
      function (err, player) {
        if (err) res.send(err);
        else if (!player) res.sendStatus(400);
        else res.send(player);
        next();
      }
    );
  },
  addRunnerToTeam: (req, res, next) => {
    console.log("body:", req.body);

    // TODO: Use logged in athhlete id
    // TODO: Use req.body.eventId for playerEventId

    const query = {
      $and: [{
          _id: process.env.REACT_APP_PLAYER_ID
        },
        {
          playerEvents: {
            $elemMatch: {
              teams: {
                $elemMatch: {
                  playerEventClassId: req.body.eventClass
                }
              }
            }
          }
        }
      ]
    };

    PlayerModel.findOneAndUpdate(query, {
        $addToSet: {
          "playerEvents.0.teams.$.runners": req.body.runnerId
        }
      }, {
        new: true
      })
      .populate("playerEvents.teams.runners")
      .exec((err, player) => {
        if (err) res.send(err);
        else if (!player) res.sendStatus(400);
        else res.send(player);
        next();
      });
  },
  removeRunnerFromTeam: (req, res, next) => {
    console.log("body:", req.body);

    // TODO: Use logged in athhlete id
    // TODO: Use req.body.eventId for playerEventId

    const query = {
      $and: [{
          _id: process.env.REACT_APP_PLAYER_ID
        },
        {
          playerEvents: {
            $elemMatch: {
              teams: {
                $elemMatch: {
                  playerEventClassId: req.body.eventClass
                }
              }
            }
          }
        }
      ]
    };

    PlayerModel.findOneAndUpdate(query, {
        $pull: {
          "playerEvents.0.teams.$.runners": req.body.runnerId
        }
      }, {
        new: true
      })
      .populate("playerEvents.teams.runners")
      .exec((err, player) => {
        if (err) res.send(err);
        else if (!player) res.sendStatus(400);
        else res.send(player);
        next();
      });
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
      })
      .populate("playerEvents.teams.runners")
      .exec((err, player) => {
        if (err) res.send(err);
        else if (!player.length) res.sendStatus(404);
        else res.send(player[0]);
        next();
      });
  }
};

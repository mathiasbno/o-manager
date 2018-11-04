import { TeamModel } from "../models/Team.mjs";

export default {
  saveTeam: (req, res, next) => {
    const query = { id: req.body.id };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    TeamModel.findOneAndUpdate(query, req.body, options, function(err, team) {
      if (err) res.send(err);
      else if (!team) res.send(400);
      else res.send(team);
      next();
    });
  },
  deleteTeams: (req, res, next) => {
    TeamModel.remove({}, function(err) {
      if (err) return handleError(err);
      next();
    });
  },
  getAll: (req, res, next) => {
    TeamModel.find(req.params.id)
      .sort({ id: 1 })
      .exec((err, team) => {
        if (err) res.send(err);
        else if (!team) res.send(400);
        else res.send(team);
        next();
      });
  },
  getTeam: (req, res, next) => {
    TeamModel.find({ name: req.params.id }).exec((err, team) => {
      if (err) res.send(err);
      else if (!team.length) res.send(404);
      else res.send(team[0]);
      next();
    });
  }
};

import { NationModel } from "../models/Nation.mjs";

export default {
  saveNation: (req, res, next) => {
    const query = { id: req.body.id };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    NationModel.findOneAndUpdate(query, req.body, options, function(
      err,
      nation
    ) {
      if (err) res.send(err);
      else if (!nation) res.send(400);
      else res.send(nation);
      next();
    });
  },
  deleteNation: (req, res, next) => {
    NationModel.remove({}, function(err) {
      if (err) return handleError(err);
      next();
    });
  },
  getAll: (req, res, next) => {
    NationModel.find(req.params.id).exec((err, nation) => {
      if (err) res.send(err);
      else if (!nation) res.send(400);
      else res.send(nation);
      next();
    });
  },
  getNation: (req, res, next) => {
    NationModel.find({ id: req.params.id }).exec((err, nation) => {
      if (err) res.send(err);
      else if (!nation.length) res.send(404);
      else res.send(nation[0]);
      next();
    });
  }
};

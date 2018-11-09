import { RunnerModel } from "../models/Runner.mjs";
import { NationModel } from "../models/Nation.mjs";
import { TeamModel } from "../models/Team.mjs";
import { EventModel } from "../models/Event.mjs";

export default {
  saveRunner: (req, res, next) => {
    const query = { id: req.body.id };
    const options = { upsert: true, setDefaultsOnInsert: true };
    const object = req.body;

    console.log("Starting", object.id);

    // Connect teams and events
    const connectTeamsAndEventsAndNation = [];

    object.results.forEach(result => {
      if (!result.team._id) {
        connectTeamsAndEventsAndNation.push(
          new Promise((resolve, reject) =>
            TeamModel.find({
              id: result.team
            }).exec((err, team) => {
              result.team = team[0]._id;
              if (err) reject(err);
              else resolve(team[0]._id);
            })
          )
        );
      }

      if (!result.event._id) {
        connectTeamsAndEventsAndNation.push(
          new Promise((resolve, reject) =>
            EventModel.find({
              id: result.event
            }).exec((err, event) => {
              result.event = event[0]._id;
              if (err) reject(event, err);
              else resolve(event[0]._id);
            })
          )
        );
      }
    });

    object.price.forEach(price => {
      console.log(price.event.toString());
      if (!price.event._id) {
        connectTeamsAndEventsAndNation.push(
          new Promise((resolve, reject) =>
            EventModel.find({
              _id: price.event.toString()
            }).exec((err, event) => {
              price.event = event[0]._id;
              if (err) reject(err);
              else resolve(event[0]._id);
            })
          )
        );
      }

      if (!price.priceBasedOn._id) {
        connectTeamsAndEventsAndNation.push(
          new Promise((resolve, reject) =>
            EventModel.find({
              _id: price.priceBasedOn.toString()
            }).exec((err, event) => {
              price.priceBasedOn = event[0]._id;
              if (err) reject(event, err);
              else resolve(event[0]._id);
            })
          )
        );
      }
    });

    // Return all the connected elements
    if (!object.nationality._id) {
      connectTeamsAndEventsAndNation.push(
        new Promise((resolve, reject) =>
          NationModel.find({
            id: object.nationality
          }).exec((err, nation) => {
            object.nationality = nation[0]._id;
            if (err) reject(err);
            else resolve(nation[0]._id);
          })
        )
      );
    }

    connectTeamsAndEventsAndNation.push(
      new Promise((resolve, reject) =>
        RunnerModel.findOne({ id: object.id }).exec((err, runner) => {
          if (runner) {
            const eventAlreadySaved = runner.results.find(function(result) {
              return (
                parseInt(result.class.id) ===
                parseInt(object.results[0].class.id)
              );
            });

            // If a runner runs more then one class in an event we want to save both results
            if (!eventAlreadySaved) {
              object.results = runner.results.concat(object.results);
            }
          }
          if (err) reject(err);
          else resolve(object);
        })
      )
    );

    // Wait untill alle the connections are done
    Promise.all(connectTeamsAndEventsAndNation).then(() => {
      console.log("All Connected", object.id);

      // Make sure to not save the same runner twice
      RunnerModel.findOneAndUpdate(query, object, options, function(
        err,
        runner
      ) {
        if (err) res.send(err);
        else if (!runner) res.send(400);
        else res.send(runner);
        next();
      });
    });
  },
  deleteRunners: (req, res, next) => {
    RunnerModel.deleteMany({}, function(err) {
      if (err) return handleError(err);
      next();
    });
  },
  getAll: (req, res, next) => {
    RunnerModel.find(req.params.id)
      .populate("nationality")
      .populate("results.team")
      .populate("results.event")
      .exec((err, runner) => {
        if (err) res.send(err);
        else if (!runner) res.send(400);
        else res.send(runner);
        next();
      });
  },
  getRunner: (req, res, next) => {
    RunnerModel.find({ _id: req.params.id })
      .populate("nationality")
      .populate("results.team")
      .populate("results.event")
      .exec((err, runner) => {
        if (err) res.send(err);
        else if (!runner.length) res.send(404);
        else res.send(runner[0]);
        next();
      });
  }
};

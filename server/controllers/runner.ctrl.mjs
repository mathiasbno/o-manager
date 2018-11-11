import { RunnerModel } from "../models/Runner.mjs";
import { NationModel } from "../models/Nation.mjs";
import { TeamModel } from "../models/Team.mjs";
import { EventModel } from "../models/Event.mjs";
import { findOneById } from "../helpers/helper";

export default {
  saveRunner: (req, res, next) => {
    const object = req.body;

    console.log("Starting", object.id);

    // Connect teams and events
    const connectTeamsAndEventsAndNation = [];

    object.results.forEach(result => {
      connectTeamsAndEventsAndNation.push(
        findOneById(TeamModel, result.team)
          .then(teamId => {
            result.team = teamId;
          })
          .catch(err => {
            console.log(err);
          }),

        findOneById(EventModel, result.event)
          .then(eventId => {
            result.event = eventId;
          })
          .catch(err => {
            console.log(err);
          })
      );
    });

    object.price.forEach(price => {
      connectTeamsAndEventsAndNation.push(
        findOneById(EventModel, price.event)
          .then(eventId => {
            price.event = eventId;
          })
          .catch(err => {
            console.log(err);
          }),

        findOneById(EventModel, price.priceBasedOn)
          .then(eventId => {
            price.priceBasedOn = eventId;
          })
          .catch(err => {
            console.log(err);
          })
      );
    });

    connectTeamsAndEventsAndNation.push(
      findOneById(NationModel, object.nationality)
        .then(nationalityId => {
          object.nationality = nationalityId;
        })
        .catch(err => {
          console.log(err);
        })
    );

    connectTeamsAndEventsAndNation.push(
      new Promise((resolve, reject) => {
        RunnerModel.find({ id: object.id }).exec((err, runner) => {
          if (runner.length) {
            const _runner = runner[0];
            const eventAlreadySaved = _runner.results.find(function(result) {
              return (
                parseInt(result.class.id) ===
                parseInt(object.results[0].class.id)
              );
            });

            // If a runner runs more then one class in an event we want to save both results
            if (!eventAlreadySaved) {
              object.results = _runner.results.concat(object.results);
            }
            resolve(object);
          } else {
            resolve(object);
          }
        });
      })
    );

    // Wait untill alle the connections are done
    Promise.all(connectTeamsAndEventsAndNation)
      .then(() => {
        const query = { id: req.body.id };
        const options = { upsert: true, setDefaultsOnInsert: true, new: true };
        console.log("All Connected", object.id);

        // Make sure to not save the same runner twice
        RunnerModel.findOneAndUpdate(query, object, options, (err, runner) => {
          if (err) res.send(err);
          else if (!runner) res.sendStatus(400);
          else res.send(runner);
          next();
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteRunners: (req, res, next) => {
    RunnerModel.deleteMany({}, function(err) {
      if (err) return handleError(err);
      next();
    });
  },
  getAll: (req, res, next) => {
    RunnerModel.find()
      .populate("nationality")
      .populate("results.team")
      .populate("results.event")
      .exec((err, runner) => {
        if (err) res.send(err);
        else if (!runner) res.sendStatus(400);
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
        else if (!runner.length) res.sendStatus(404);
        else res.send(runner[0]);
        next();
      });
  }
};

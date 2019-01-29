import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RunnerSchema = new Schema({
  name: {
    given: String,
    family: String
  },
  id: Number,
  gender: String,
  birthYear: String,
  nationality: {
    type: Schema.Types.ObjectId,
    ref: "Nation"
  },
  results: [{
    class: {
      id: Number,
        name: String
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    status: String,
    time: String,
    behind: String,
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    },
    position: Number,
    leg: Number,
    legPosition: Number,
    overallResult: {
      position: Number,
      status: String
    },
    points: {
      totalPoints: Number,
      bonusPoints: Number
    }
  }],
  entries: [{
    class: {
      id: Number,
        name: String
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  }],
  price: [{
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event"
    },
    priceBasedOn: {
      type: mongoose.Types.ObjectId,
      ref: "Event"
    },
    cost: Number,
    eventForm: String,
    class: {
      id: Number, name: String
    }
  }]
});

const RunnerModel = mongoose.model("Runner", RunnerSchema);

export {
  RunnerSchema as
  default, RunnerModel
};

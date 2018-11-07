import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RunnerSchema = new Schema({
  name: {
    given: String,
    family: String
  },
  eventorId: Number,
  gender: String,
  birthYear: String,
  nationality: { type: mongoose.Types.ObjectId, ref: "Nation" },
  results: [
    {
      team: { type: mongoose.Types.ObjectId, ref: "Team" },
      status: String,
      time: String,
      behind: String,
      event: { type: mongoose.Types.ObjectId, ref: "Event" },
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
    }
  ],
  price: [
    {
      event: { type: mongoose.Types.ObjectId, ref: "Event" },
      priceBasedOn: { type: mongoose.Types.ObjectId, ref: "Event" },
      cost: Number,
      eventForm: String
    }
  ]
});

const RunnerModel = mongoose.model("Runner", RunnerSchema);

export { RunnerSchema as default, RunnerModel };

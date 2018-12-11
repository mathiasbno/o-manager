import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerEventSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  eventClasses: [{
    name: String,
    runnersInTeam: Number,
    budget: Number,
    gender: String,
    startData: Date,
    lockDate: Date
  }],
  players: [{
    type: Schema.Types.ObjectId,
    ref: "Player"
  }],
});

const PlayerEventModel = mongoose.model("PlayerEvent", PlayerEventSchema);

export {
  PlayerEventSchema as
  default, PlayerEventModel
};

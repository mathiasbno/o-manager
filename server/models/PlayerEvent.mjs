import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerEventSchema = new Schema({
  event: {
    type: mongoose.Types.ObjectId,
    ref: "Event"
  },
  runnersInTeam: Number,
  points: Number,
  lockDate: Date
});

const PlayerEventModel = mongoose.model("Event", PlayerEventSchema);

export {
  PlayerEventSchema as
  default, PlayerEventModel
};

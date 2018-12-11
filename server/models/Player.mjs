import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  playerEvents: [{
    teamName: {
      type: String,
      default: ""
    },
    teams: [{
      playerEventClassId: String,
      runners: [{
        type: Schema.Types.ObjectId,
        ref: "Runner"
      }]
    }],
    playerEventId: {
      type: Schema.Types.ObjectId,
      ref: "PlayerEvent"
    }
  }],
  name: String
});

const PlayerModel = mongoose.model("Player", PlayerSchema);

export {
  PlayerSchema as
  default, PlayerModel
};

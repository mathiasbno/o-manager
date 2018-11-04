import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  id: Number
});

const TeamModel = mongoose.model("Team", TeamSchema);

export { TeamSchema as default, TeamModel };

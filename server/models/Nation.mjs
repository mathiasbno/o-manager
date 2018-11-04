import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NationSchema = new Schema({
  short: String,
  id: Number,
  name: [
    {
      name: String,
      lang: String
    }
  ]
});

const NationModel = mongoose.model("Nation", NationSchema);

export { NationSchema as default, NationModel };

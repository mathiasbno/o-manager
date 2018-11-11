import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  id: Number,
  startDate: Date,
  eventForm: String,
  classes: [
    {
      name: String,
      id: Number
    }
  ]
});

const EventModel = mongoose.model("Event", EventSchema);

export { EventSchema as default, EventModel };

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import routes from "./routes/index.mjs";

const app = express();
const router = express.Router();
const port = 3000 || process.env.PORT;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/o-manager";

try {
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
} catch (error) {
  console.log(error);
}

routes(router);
app.use(bodyParser.json());
app.use("/api", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

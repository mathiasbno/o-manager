import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import basicAuth from "basic-auth";
import compare from "tsscmp";
import path from "path";

import routes from "./routes/index.mjs";

function check(name, pass) {
  var valid = true

  valid = compare(name, 'john') && valid
  valid = compare(pass, 'secret') && valid

  return valid
}

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
const __dirname = path.resolve();

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/o-manager";

try {
  mongoose.connect(
    url, {
      useNewUrlParser: true
    }
  );
} catch (error) {
  console.log(error);
}

routes(router);
app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.use(express.static(path.join(__dirname, "server/view")));

app.get("/process", function (req, res) {
  const credentials = basicAuth(req);

  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="process"');
    res.end('Access denied');
  } else {
    res.sendFile(path.join(__dirname, "server/view", "index.html"));
  }

});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`App listening on port ${port}!`));

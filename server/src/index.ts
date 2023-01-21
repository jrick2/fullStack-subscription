require("dotenv").config();
require("express-async-errors");
import express from "express";
import config from "config";
import connectToDb from "./db/connectDB";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use(router);

const port = config.get("port");

const start = async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      log.info(`App started at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

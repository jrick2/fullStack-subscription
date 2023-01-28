require("dotenv").config();
import express from "express";
import config from "config";
import connectToDb from "./utils/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import log from "./utils/logger";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);

app.use(express.json());
app.use(deserializeUser);

app.use(cookieParser());

const port = config.get<number>("port");

const start = () => {
  try {
    app.listen(port, async () => {
      log.info(`App started at http://localhost:${port}`);
      await connectToDb();
      app.use(authRouter);
      app.use(userRouter);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

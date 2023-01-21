import mongoose from "mongoose";
import config from "config";
import log from "../utils/logger";

async function connectToDb() {
  const dbUri = config.get<string>("dbUri");
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB");
  } catch (e) {
    process.exit(1);
  }
}

export default connectToDb;

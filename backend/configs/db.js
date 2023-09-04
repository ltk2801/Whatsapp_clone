// connect MongoDB with mongoose
import mongoose from "mongoose";
import logger from "./logger.config.js";

export const connectDB = async () => {
  const { DATABASE_URL } = process.env;
  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info(`Connected to Mongodb.`);
    });

  // mongodb debug mode
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  // exit on mongodb error
  mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
  });
};

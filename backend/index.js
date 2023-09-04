import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";
import { connectDB } from "./configs/db.js";

// env variables

const PORT = process.env.PORT || 8080;

// mongodb connection
connectDB();

app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}...`);
});

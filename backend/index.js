import app from "./app.js";
import { Server } from "socket.io";
import logger from "./configs/logger.config.js";
import { connectDB } from "./configs/db.js";
import socketServer from "./socketServer.js";

// env variables

const PORT = process.env.PORT || 8080;

// mongodb connection
connectDB();

// socket io

const io = new Server(
  app.listen(PORT, () => {
    logger.info(`Server is listening at ${PORT}...`);
  }),
  {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  }
);
// emit là gửi đi, on là nhận về

io.on("connection", (socket) => {
  logger.info("socket io connected successfully.");
  socketServer(socket);
});

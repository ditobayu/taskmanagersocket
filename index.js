import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
// httpServer.use(express.json());
// httpServer.use(helmet());
// httpServer.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const io = new Server(httpServer, {
  // {
  // cors: {
  //   origin: ["http://localhost:3000"],
  // },
  // }
  /* options */
});

// const io = require("socket.io")(3002,
//);
// console.log("asda");
io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ currentReceiver, chat }) => {
    socket.broadcast.to(currentReceiver).emit("receive-message", {
      sender: id,
      chat,
    });
    console.log(chat);
  });
});

httpServer.listen(3001);
export default httpServer;

// export default io;

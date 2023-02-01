import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // {
  cors: {
    origin: ["http://localhost:3000"],
  },
  // }
  /* options */
});

// const io = require("socket.io")(3002,
//);
// console.log("asda");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

httpServer.listen(3002);
export default httpServer;

// export default io;

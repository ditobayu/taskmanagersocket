const io = require("socket.io")(3002, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ currentReceiver, chat }) => {
    socket.broadcast.to(currentReceiver).emit("receive-message", {
      sender: id,
      chat,
    });
  });
});

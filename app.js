let app = require("express")();
let server = require("http").createServer(app);
let io = require("socket.io")(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

server.listen(8080, () => {
  console.log("Socket IO server listening on port 8080");
});

io.on("connection", (socket) => {
  // console.log(socket);
  socket.on("login", (data) => {
    // console.log(data);
    io.emit("new user", data);
  });

  socket.on("chat", (data) => {
    console.log(data);
    io.emit("chat", data);
  });
});

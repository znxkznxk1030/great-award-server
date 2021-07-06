let app = require("express")();
var cors = require('cors');
let server = require("http").createServer(app);

app.use(cors());

let io = require("socket.io")(server,{
  cors: {
    origin: "*",
  }
});

server.listen(8080, () => {
  console.log("Socket IO server listening on port 8080");
});

io.on("connection", (socket) => {
  console.log(socket);
  socket.on("login", (data) => {
    console.log(data);
    io.emit("new user", data);
  });

  socket.on("chat", (data) => {
    console.log(data);
    io.emit("chat", data);
  });
});

let app = require("express")();
let xss = require("xss");
let server = require("http").createServer(app);

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(req.headers);
    next();
});

app.use('/', function (req, res, next) {
    res.json("connected");
});


let io = require("socket.io")(server,{
  cors: {
    origin: "*",
  }
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log("Socket IO server listening on port " + PORT);
});

io.on("connection", (socket) => {
  console.log(socket);
  socket.on("login", (data) => {
    console.log(data);
    io.emit("new user", xss(data));
  });

  socket.on("chat", (data) => {
    console.log(data);
    io.emit("chat", xss(data));
  });
});

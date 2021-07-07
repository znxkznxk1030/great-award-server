let fs = require('fs')
let app = require("express")();
let cors = require('cors');
let ssl = {
  key: fs.readFileSync('../mydomain.key'),
  cert: fs.readFileSync('../mydomain.csr'),
  ca: fs.readFileSync('../ca.key'),
  requestCert: false,
  rejectUnauthorized: false
}
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
    io.emit("new user", data);
  });

  socket.on("chat", (data) => {
    console.log(data);
    io.emit("chat", data);
  });
});

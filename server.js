const http = require('http');
const app = require('./app');
const server_http = http.createServer(app);
const socketIO = require('socket.io');

const http_port = 3000;

server_http.listen(http_port,"0.0.0.0");
const io = socketIO(server_http);

require("./liveapp")(io);


const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../src')))

app.get('/', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, '../src/index.html'));
})

// module.exports = app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

server.listen(port, function() {
  console.log('Snake is fun!');
})

io.on('connection', function (socket) {
  setInterval(function () {
    io.sockets.emit('playersData', socket.id);
  }, 1000);
  setInterval(function () {
    io.sockets.emit('new player', socket.id);
    setTimeout(() => socket.disconnect(true), 3000)
  }, 2000);
  socket.on('movement', function(data) {
    console.log(data);
  })
});




// console.log(io, 'is io')


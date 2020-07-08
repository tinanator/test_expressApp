#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('express-test:server');
const http = require('http');

const direction = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    NONE: 0
}


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */



const io = require('socket.io')(server)


server.listen(3000, () => {
  console.log('/localhost:3000');
});

server.on('error', onError);
server.on('listening', onListening);

/**
 *
 * Socket connection with client
 */

const PLAYER_LIST = {}
const SPEED = 1


io.on("connect", socket=> {
    setInterval(function() {
        io.sockets.emit('state', PLAYER_LIST);
    }, 1000 / 60);
    socket.on("new user", (point, speed) => {
        PLAYER_LIST[socket.id] = {
          x: point.x,
          y: point.y,
          speed: speed
        }
        socket.emit("new user", point, speed, socket.id);
        console.log("new user connected, id = ", socket.id)
        setInterval(()=>{
          console.log(socket.id, ": x = ", PLAYER_LIST[socket.id].x, ", y = ", PLAYER_LIST[socket.id].y);
        }, 1000)
    });

  socket.on("movement", (data)=>{
      let v = PLAYER_LIST[socket.id].speed;
      switch (data) {
          case direction.UP: {
              PLAYER_LIST[socket.id].y -= v;
              break;
          }
          case direction.RIGHT: {
              PLAYER_LIST[socket.id].x += v;
              break;
          }
          case direction.LEFT: {
              PLAYER_LIST[socket.id].x -= v;
              break;
          }
          case direction.DOWN: {
              PLAYER_LIST[socket.id].y += v;
              break;
          }
      }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (data)=>{
    console.log("message is: ", data)
    io.emit('message', data)
  });

})




/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



const { knuthShuffle: shuffle } = require('knuth-shuffle')
const http = require('http');
let usersSet = [];
let usersSocket = new Map();
let usersAlreadyTalkedTo = new Map();

// TODO: global problem
export function createServer(port = 12222, host = '127.0.0.1') {
  const app = http.createServer();
  const io = require('socket.io')(app);

  app.listen(port, host);

  io.on('connection', socket => handleConnection(socket));

  function handleConnection(socket) {
    socket.on('register user', registerUser.bind(null, socket));
  }

  function registerUser(socket, user) {
    user.status = 'AVAILABLE';

    usersSet = usersSet.concat(user);
    usersSocket.set(user, socket);
    socket.emit('user registered');

    socket.on('request chat', requestChat.bind(null, socket, user));
    socket.on('disconnect', unregisterUser.bind(null, user));
  }

  function unregisterUser(user) {
    const index = usersSet.indexOf(user);
    usersSet = [
      ...usersSet.slice(0, index),
      ...usersSet.slice(index + 1),
    ];
  }

  function startChat(userSocket, user, other) {
    const otherSocket = usersSocket.get(other);
    userSocket.emit('chat started', { other: other });
    otherSocket.emit('chat started', { other: user });

    userSocket.on('send message', sendMessage.bind(null, userSocket, otherSocket));
    otherSocket.on('send message', sendMessage.bind(null, otherSocket, userSocket));

    userSocket.on('leave chat', leaveCurrentChat.bind(null, userSocket, user, other));
    otherSocket.on('leave chat', leaveCurrentChat.bind(null, otherSocket, other, user));

    const userTalkedTo = usersAlreadyTalkedTo.get(user) || [];
    usersAlreadyTalkedTo.set(user, userTalkedTo.concat(other));

    const otherTalkedTo = usersAlreadyTalkedTo.get(other) || [];
    usersAlreadyTalkedTo.set(other, otherTalkedTo.concat(user));
  }

  function sendMessage(userSocket, otherSocket, message) {
    otherSocket.emit('message received', Object.assign({}, message, { self: false }));
    userSocket.emit('message sent', Object.assign({}, message, { self: true }));
  }

  function leaveCurrentChat(userSocket, user, other) {
    user.status = 'AVAILABLE';
    other.status = 'AVAILABLE';

    userSocket.removeAllListeners('send message');
    userSocket.removeAllListeners('leave chat');

    const otherSocket = usersSocket.get(other);

    otherSocket.removeAllListeners('send message');
    otherSocket.removeAllListeners('leave chat');

    otherSocket.emit('chat finished');
    userSocket.emit('chat finished');
  }

  function requestChat(socket, user) {
    if (user.status === 'REQUESTING') {
      return false;
    }

    user.status = 'REQUESTING';
    const other = shuffle(usersSet.slice()).find(someone =>
        someone !== user && someone.status !== 'NOT AVAILABLE'
    );

    if (other) {
      user.status = 'NOT AVAILABLE';
      other.status = 'NOT AVAILABLE';
      startChat(socket, user, other);
    }
  }
};

export function resetServer() {
  usersSet = [];
}

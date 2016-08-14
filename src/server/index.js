const http = require('http');
let usersSet = [];
let usersSocket = new Map();
let usersAlreadyTalkedTo = new Map();

// TODO: global problem
export function createServer(port) {
  const app = http.createServer();
  const io = require('socket.io')(app);

  app.listen(port);

  io.on('connection', socket => handleConnection(socket));

  function handleConnection(socket) {
    socket.on('register user', registerUser.bind(null, socket));
  }

  function registerUser(socket, user) {
    usersSet = usersSet.concat(user);
    usersSocket.set(user, socket);
    socket.emit('user registered');

    socket.on('request chat', requestChat.bind(null, socket, user));
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
    otherSocket.emit('message received', message);
    userSocket.emit('message sent', message);
  }

  function leaveCurrentChat(userSocket, user, other) {
    userSocket.removeAllListeners('send message');
    userSocket.removeAllListeners('leave chat');

    const otherSocket = usersSocket.get(other);

    otherSocket.removeAllListeners('send message');
    otherSocket.removeAllListeners('leave chat');

    otherSocket.emit('chat finished');
    userSocket.emit('chat finished');
  }

  function requestChat(socket, user) {
    const other = usersSet.find(someone =>
        someone.nickname !== user.nickname
      && (usersAlreadyTalkedTo.get(user) || []).indexOf(someone) === -1
    );

    if (other) {
      startChat(socket, user, other);
    }
  }
};

export function resetServer() {
  usersSet = [];
}

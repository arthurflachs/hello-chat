const requestChat = (socket) => new Promise(function(resolve, reject) {
  const messagesReceivedCallback = [];
  const chatFinishedCallbacks = [];

  socket.emit('request chat');

  socket.on('chat started', ({ other }) => resolve({
    sendMessage: sendMessage.bind(null, socket),
    onMessageReceived: cb => messagesReceivedCallback.push(cb),
    onChatFinished: cb => chatFinishedCallbacks.push(cb),
    leave: leave.bind(null, socket),
    other,
  }));

  socket.on('message received', function(message) {
    messagesReceivedCallback.forEach(cb => cb(message));
  });

  socket.on('chat finished', function() {
    chatFinishedCallbacks.forEach(cb => cb());
  });
});

const sendMessage = (socket, message) => new Promise(function(resolve, reject) {
  socket.emit('send message', message);

  socket.on('message sent', resolve);
});

const leave = socket => new Promise(function(resolve) {
  socket.emit('leave chat');
});

export default function chatClient(nickname, socket) {
  return new Promise(function(resolve, reject) {
    const user = { nickname };

    socket.emit('register user', user);

    socket.on('user registered', function() {
      return resolve({
        requestChat: requestChat.bind(null, socket),
      });
    });
  });
}

import expect, { createSpy } from 'expect';
import chatClient from '../../src/client';

const callbacks = new Map();

const mockSocket = {
  emit: createSpy(),
  on: (x, cb) => callbacks.set(x, cb),
};

const invokeCallback = (x, arg) => callbacks.has(x) && callbacks.get(x)(arg);


describe('Chat Client', function() {

  it('can register in the chat', function() {
    const chatPromise = chatClient('Arthur', mockSocket);

    invokeCallback('user registered');

    return chatPromise.then(function() {
      expect(mockSocket.emit).toHaveBeenCalledWith('register user', {
        nickname: 'Arthur',
      });
    });

  });

  it('can request a new chat', function() {
    const chatPromise = chatClient('Arthur', mockSocket);

    invokeCallback('user registered');

    return chatPromise.then(client => {
      const requestChat = client.requestChat();

      invokeCallback('chat started', { other: { nickname: 'other' } });

      return requestChat;
    }).then(function() {
        expect(mockSocket.emit).toHaveBeenCalledWith('request chat');
      });
  });

  it('can send a message in a chat', function() {
    const chatPromise = chatClient('Arthur', mockSocket);

    invokeCallback('user registered');

    return chatPromise.then(client => {
      const requestChat = client.requestChat()

      invokeCallback('chat started', { other: { nickname: 'other' } });

      return requestChat;
    }).then(chat => {
      const sendMessage = chat.sendMessage({ content: 'Coucou' });

      invokeCallback('message sent');

      return sendMessage;
    }).then(function() {
      expect(mockSocket.emit).toHaveBeenCalledWith('send message', { content: 'Coucou' });
    });
  });

  it('can receive a message in a chat', function(done) {
    const chatPromise = chatClient('Arthur', mockSocket);

    invokeCallback('user registered');

    chatPromise.then(client => {
      const requestChat = client.requestChat()

      invokeCallback('chat started', { other: { nickname: 'other' } });

      return requestChat;
    }).then(chat => {
      chat.onMessageReceived(done);
      invokeCallback('message received');
    });
  });

  it('can leave a chat', function() {
    const chatPromise = chatClient('Arthur', mockSocket);

    invokeCallback('user registered');

    chatPromise.then(client => {
      const requestChat = client.requestChat()

      invokeCallback('chat started', { other: { nickname: 'other' } });

      return requestChat;
    }).then(chat => {
      const leave = chat.leave();

      invokeCallback('chat finished');

      return leave;
    });
  });

});

import expect, { createSpy } from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions';
import * as types from '../../src/actions/types';

const mockStore = configureMockStore([ thunk ]);

describe('actions', function() {

  it('should create an action to register', function() {
    const nickname = 'Arthur';
    const expected = {
      type: types.REQUEST_REGISTER_USER,
      nickname
    };

    expect(actions.requestRegisterUser(nickname)).toEqual(expected);
  });

  it('should create an action to confirm registration', function() {
    const nickname = 'Arthur';
    const mockChatClient = {};
    const expected = {
      type: types.RECEIVE_REGISTER_USER,
      nickname,
      chatClient: mockChatClient,
    };

    expect(actions.receiveRegisterUser(nickname, mockChatClient)).toEqual(expected);
  });

  it('should create an action to request a chat', function() {
    const expected = {
      type: types.REQUEST_CHAT,
    };

    expect(actions.requestChat()).toEqual(expected);
  });

  it('should create an action to start a chat', function() {
    const other = { nickname: 'Someone' };
    const chat = {};
    const expected = {
      type: types.CHAT_STARTED,
      chat,
    };

    expect(actions.chatStarted(chat)).toEqual(expected);
  });

  it('should create an action to send a message', function() {
    const message = { content: 'Coucou' };
    const expected = {
      type: types.SEND_MESSAGE,
      message,
    };

    expect(actions.sendMessage(message)).toEqual(expected);
  });

  it('should create an action to say a message has been sent', function() {
    const message = { content: 'Coucou' };
    const expected = {
      type: types.MESSAGE_SENT,
      message,
    };

    expect(actions.messageSent(message)).toEqual(expected);
  });

  it('should create an action to receive a message', function() {
    const message = { content: 'Hello World' };
    const expected = {
      type: types.RECEIVE_MESSAGE,
      message,
    };

    expect(actions.receiveMessage(message)).toEqual(expected);
  });

  it('should create an action to leave a chat', function() {
    const expected = {
      type: types.LEAVE_CHAT,
    };

    expect(actions.leaveChat()).toEqual(expected);
  });

  it('should create an action when a chat session is done', function() {
    const expected = {
      type: types.CHAT_FINISHED,
    };

    expect(actions.chatFinished()).toEqual(expected);
  });

  it('creates REQUEST_REGISTER_USER and RECEIVE_REGISTER_USER when registering on chat', function() {
    const nickname = 'Arthur';
    const store = mockStore({});

    const mockSocket = {
      emit: createSpy(),
      on: (x, cb) => cb(),
    };

    return store.dispatch(actions.registerUser(nickname, mockSocket))
      .then(function({ chatClient }) {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_REGISTER_USER, nickname },
          { type: types.RECEIVE_REGISTER_USER, nickname, chatClient },
        ]);
      });
  });

  it('creates REQUEST_CHAT and CHAT_STARTED after creating a new chat', function() {
    const mockChat = { other: { nickname: 'Ghost' }, onMessageReceived: () => {} };
    const store = mockStore({
      chatClient: {
        requestChat: function() {
          return Promise.resolve({ chat: mockChat, onMessageReceived: () => {} });
        }
      },
    });

    return store.dispatch(actions.newChat(store.getState().chatClient))
      .then(function() {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_CHAT },
          { type: types.CHAT_STARTED, chat: mockChat },
        ]);
      });
  });

  it('creates SEND_MESSAGE and MESSAGE_SENT actions when messaging', function() {
    const message = { content: 'Coucou' };
    const store = mockStore({
      currentChat: {
        sendMessage: function() {
          return Promise.resolve();
        },
        onMessageReceived: () => {},
      },
    });

    return store.dispatch(actions.message(store.getState().currentChat, message))
      .then(function() {
        expect(store.getActions()).toEqual([
          { type: types.SEND_MESSAGE, message },
          { type: types.MESSAGE_SENT, message },
        ]);
      });
  })

});

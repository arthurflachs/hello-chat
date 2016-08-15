import * as types from './types';
import chatClient from '../client';

export const requestRegisterUser = nickname => ({
  type: types.REQUEST_REGISTER_USER,
  nickname
});

export const receiveRegisterUser = (nickname, chatClient) => ({
  type: types.RECEIVE_REGISTER_USER,
  nickname,
  chatClient,
});

export const requestChat = () => ({
  type: types.REQUEST_CHAT,
});

export const chatStarted = chat => ({
  type: types.CHAT_STARTED,
  chat,
});

export const sendMessage = message => ({
  type: types.SEND_MESSAGE,
  message,
});

export const messageSent = message => ({
  type: types.MESSAGE_SENT,
  message,
});

export const receiveMessage = message => ({
  type: types.RECEIVE_MESSAGE,
  message,
});

export const leaveChat = (chatClient) => dispatch => {
  return chatClient.leave().then(function() {
    dispatch(chatFinished());
  });
};

export const chatFinished = () => ({
  type: types.CHAT_FINISHED,
});

export const registerUser = (nickname, socket) => dispatch => {
  dispatch(requestRegisterUser(nickname));

  return chatClient(nickname, socket).then(function(client) {
    return dispatch(receiveRegisterUser(nickname, client));
  });
}

export const newChat = client => dispatch => {
  dispatch(requestChat());

  return client.requestChat().then((chat) => {
    chat.onMessageReceived(function(message) {
      dispatch(receiveMessage(message));
    });

    chat.onChatFinished(function() {
      dispatch(chatFinished());
    });

    return dispatch(chatStarted(chat))
  });
}

export const message = (chat, message) => dispatch => {
  dispatch(sendMessage(message));

  return chat.sendMessage(message).then(function(sent) {
    dispatch(messageSent(sent));
  });
}

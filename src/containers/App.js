import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Welcome from '../components/Welcome';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import { registerUser, newChat, message, leaveChat } from '../actions';
import config from '../../config';

function App({ chatClient, registerUser, replyChat, currentChat, chatMessages, nextChat }) {
  function reply(messageContent) {
    if (!typeof replyChat === 'function' || !currentChat || currentChat.loading) {
      return null;
    }

    replyChat(currentChat, messageContent);
  }
  return currentChat ? (
    <Layout title={currentChat.other && currentChat.other.nickname} onNextChat={nextChat.bind(null, currentChat, chatClient)}>
      <Chat messages={chatMessages} onReply={reply} chat={currentChat} />
    </Layout>
  ) : (
    <Welcome onStartChat={registerUser}/>
  );
}

const mapStateToProps = ({ currentChat, chatMessages, chatClient }) =>
  ({ currentChat, chatMessages, chatClient });

const mapDispatchToProps = (dispatch, props) => ({
  registerUser: function(nickname) {
    const socket = io(`//${config.serverHost}:${config.serverPort}`);

    return dispatch(registerUser(nickname, socket)).then(function(client) {
      return dispatch(newChat(client.chatClient));
    });
  },
  replyChat: function(currentChat, replyContent) {
    return dispatch(message(currentChat, {
      content: replyContent,
    }));
  },
  nextChat: function(chat) {
    dispatch(leaveChat(chat));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

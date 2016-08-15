import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Welcome from '../components/Welcome';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import { registerUser, newChat, message } from '../actions';

function App({ registerUser, replyChat, currentChat, chatMessages }) {
  function reply(messageContent) {
    console.log('OH?!', currentChat)
    if (!typeof replyChat === 'function' || !currentChat || currentChat.loading) {
      return null;
    }

    replyChat(currentChat, messageContent);
  }
  return currentChat ? (
    <Layout title={currentChat.other && currentChat.other.nickname}>
      <Chat messages={chatMessages} onReply={reply} />
    </Layout>
  ) : (
    <Welcome onStartChat={registerUser}/>
  );
}

const mapStateToProps = ({ currentChat, chatMessages }) => ({ currentChat, chatMessages });

const mapDispatchToProps = (dispatch, props) => ({
  registerUser: function(nickname) {
    const socket = io('http://localhost:12222');

    return dispatch(registerUser(nickname, socket)).then(function(client) {
      return dispatch(newChat(client.chatClient));
    });
  },
  replyChat: function(currentChat, replyContent) {
    return dispatch(message(currentChat, {
      content: replyContent,
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

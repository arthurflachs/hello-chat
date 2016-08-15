import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Welcome from '../components/Welcome';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import { registerUser, newChat } from '../actions';

function App({ registerUser, currentChat }) {
  console.log(currentChat);
  return currentChat ? (
    <Layout title={currentChat.other && currentChat.other.nickname}>
      <Chat />
    </Layout>
  ) : (
    <Welcome onStartChat={registerUser}/>
  );
}

const mapStateToProps = ({ currentChat }) => ({ currentChat });

const mapDispatchToProps = dispatch => ({
  registerUser: function(nickname) {
    const socket = io('http://localhost:12221');

    return dispatch(registerUser(nickname, socket)).then(function(client) {
      return dispatch(newChat(client.chatClient));
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

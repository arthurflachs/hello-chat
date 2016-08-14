import { combineReducers } from 'redux';
import chatClient from './chatClient';
import currentChat from './currentChat';
import chatMessages from './chatMessages';

const app = combineReducers({
  chatClient,
  currentChat,
  chatMessages,
});

export default app

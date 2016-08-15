import { RECEIVE_MESSAGE, MESSAGE_SENT, CHAT_FINISHED } from '../actions/types';

export default function chatMessages(state = [], action) {
  switch (action.type) {
    case RECEIVE_MESSAGE:
    case MESSAGE_SENT:
      return state.concat(action.message);
    case CHAT_FINISHED:
      return [];
    default:
      return state;
  }
}

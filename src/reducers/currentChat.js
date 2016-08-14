import { CHAT_STARTED, REQUEST_CHAT, LEAVE_CHAT } from '../actions/types';

export default function currentChat(state = null, action) {
  switch (action.type) {
    case CHAT_STARTED:
      return action.chat;
    case REQUEST_CHAT:
      return { loading: true };
    case LEAVE_CHAT:
      return null;
    default:
      return state;
  }
}

import { RECEIVE_MESSAGE, MESSAGE_SENT } from '../actions/types';

export default function chatMessages(state = [], action) {
  switch (action.type) {
    case RECEIVE_MESSAGE:
    case MESSAGE_SENT:
      return state.concat(action.message);
    default:
      return state;
  }
}

import { RECEIVE_REGISTER_USER } from '../actions/types';

export default function chatClientReducer(state = null, action) {
  switch(action.type) {
    case RECEIVE_REGISTER_USER:
      return action.chatClient;

    default:
      return state;
  }
}

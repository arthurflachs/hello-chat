import expect from 'expect';
import reducer from '../../src/reducers/chatClient';
import * as types from '../../src/actions/types';

describe('reducers chatClient', function() {

  it('should return the initial state', function() {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle RECEIVE_REGISTER_USER action', function() {
    const chatClient = {};

    expect(reducer(undefined, {
      type: types.RECEIVE_REGISTER_USER,
      nickname: 'Arthur',
      chatClient,
    })).toEqual(chatClient);
  });

});

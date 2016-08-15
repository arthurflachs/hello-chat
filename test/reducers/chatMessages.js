import expect from 'expect';
import reducer from '../../src/reducers/chatMessages';
import * as types from '../../src/actions/types';

describe('chatMessages reducer', function() {

  it('returns the initial state', function() {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('handles RECEIVE_MESSAGE action', function() {
    expect(reducer([1], {
      type: types.RECEIVE_MESSAGE,
      message: 2,
    })).toEqual([1,2]);
  });

  it('handles MESSAGE_SENT action', function() {
    expect(reducer([1], {
      type: types.MESSAGE_SENT,
      message: 2,
    })).toEqual([1, 2]);
  });

  it('handles CHAT_FINISHED action', function() {
    expect(reducer([1,2,3], {
      type: types.CHAT_FINISHED,
    })).toEqual([]);
  });

});

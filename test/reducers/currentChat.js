import expect from 'expect';
import reducer from '../../src/reducers/currentChat';
import * as types from '../../src/actions/types';

describe('currentChat reducer', function() {

  it('returns the initial state', function() {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('handles CHAT_STARTED action', function() {
    const mockChat = {};
    expect(reducer(undefined, {
      type: types.CHAT_STARTED,
      chat: mockChat,
    })).toEqual(mockChat);
  });

  it('handles REQUEST_CHAT action', function() {
    expect(reducer({
      chat: {},
    }, {
      type: types.REQUEST_CHAT,
    }).loading).toEqual(true);
  });

  it('handles LEAVE_CHAT action', function() {
    expect(reducer({
      chat: {},
    }, {
      type: types.LEAVE_CHAT,
    })).toEqual(null);
  });

  it('handles CHAT_FINISHED action', function() {
    expect(reducer({
      chat: {},
    }, {
      type: types.CHAT_FINISHED,
    })).toEqual(null);
  });

});

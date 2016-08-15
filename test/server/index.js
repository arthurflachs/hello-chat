import { createServer, resetServer } from '../../src/server/index';
import io from 'socket.io-client';
import expect from 'expect';

createServer(12221);

function createClient(user) {
  return new Promise(function(resolve, reject) {
    var chatClient = io('http://localhost:12221');

    chatClient.emit('register user', user);

    chatClient.on('user registered', function() {
      resolve(chatClient);
    });
  })
}

describe('', function() {

  beforeEach(function() {
    resetServer();
  });

  describe('chat registration', function() {
    it('can register on chat', function() {

      return createClient({ nickname: 'chat_tester' });

    });

  });

  describe('chat conversations', function() {
    it('can request a new conversation', function(done) {

      createClient({ nickname: 'the_other' }).then(client => client.emit('request chat'));

      createClient({ nickname: 'chat_tester' })
        .then(function(client) {

          client.emit('request chat');

          client.on('chat started', function(chat) {
            expect(chat.other.nickname).toEqual('the_other');

            done();
          });

        });

    });

    it('gets notified once a chat has been created', function(done) {

      setTimeout(function() {
        createClient({ nickname: 'the_other' }).then(function(client) {
          client.emit('request chat');
        });
      }, 100);

      createClient({ nickname: 'chat_tester' })
        .then(function(client) {

          client.emit('request chat');

          client.on('chat started', function(chat) {
            expect(chat.other.nickname).toEqual('the_other');
            done();
          });

        });

    });

    it('can send a message', function(done) {

      createClient({ nickname: 'the_other' }).then(client => client.emit('request chat'));;

      createClient({ nickname: 'chat_tester' })
        .then(function(client) {

          client.emit('request chat');

          client.on('chat started', function(chat) {
            expect(chat.other.nickname).toEqual('the_other');

            client.emit('send message', {
              content: 'Coucou',
            });

            client.on('message sent', function(message) {
              expect(message.content).toEqual('Coucou');
              expect(message.self).toEqual(true);

              done();
            });
          });

        });

    });

    it('can receive a message', function(done) {

      createClient({ nickname: 'the_other' }).then(function(client) {
        client.emit('request chat');
        client.on('message received', function(message) {
          expect(message.content).toEqual('Coucou');
          expect(message.self).toEqual(false);

          done();
        });
      });

      createClient({ nickname: 'chat_tester' })
        .then(function(client) {

          client.emit('request chat');

          client.on('chat started', function(chat) {
            expect(chat.other.nickname).toEqual('the_other');

            client.emit('send message', {
              content: 'Coucou',
            });
          });

        });

    });

    it('can leave a conversation', function(done) {

      createClient({ nickname: 'the_other' }).then(function(client) {
        client.emit('request chat');
        client.on('chat finished', function() {
          done();
        });
      });

      createClient({ nickname: 'chat_tester' })
        .then(function(client) {

          client.emit('request chat');

          client.on('chat started', function(chat) {
            expect(chat.other.nickname).toEqual('the_other');

            client.emit('leave chat');
          });

        });

    });

    //it('can request a new chat and it will find someone I have not talked with yet', function(done) {
      //let firstUser;

      //createClient({ nickname: 'first' });
      //createClient({ nickname: 'second' });

      //createClient({ nickname: 'me' })
        //.then(function(client) {
          //client.emit('request chat');

          //client.on('chat started', function(chat) {
            //if (!firstUser) {
              //firstUser = chat.other;
              //client.emit('leave chat');
              //client.on('chat finished', function() {
                //client.emit('request chat');
              //});
              //return ;
            //}

            //expect(chat.other).toNotEqual(firstUser);
            //done();
          //});
        //});
    //});

    it('disconnects a user when he has quit', function(done) {
      createClient({ nickname: 'first' }).then(function(client) {
        client.disconnect();

        createClient({ nickname: 'second' }).then(client => client.emit('request chat'));

        createClient({ nickname: 'me' })
          .then(function(client) {
            client.emit('request chat');

            client.on('chat started', function(chat) {
              expect(chat.other.nickname).toEqual('second');
              done();
            });
          });
      });
    });

  });

});

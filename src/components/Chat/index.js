import React from 'react';
import styles from './styles.css';
import Message from '../Message';

function renderMessages(messages) {
  return messages.map(message => (
    <Message content={message.content} />
  ));
}

export default function Chat({ onReply, messages = [] }) {
  return (
    <div className={styles.Chat}>
      <div className={styles.MessagesList}>
        {renderMessages(messages)}
      </div>

      <div className={styles.ChatReply}>
        <form onSubmit={reply}>
          <input type="text" placeholder="Type your reply ..." className={styles.ChatReplyInput} />
        </form>
      </div>
    </div>
  );

  function reply(e) {
    e.preventDefault();

    typeof onReply === 'function' && onReply();
  }
}

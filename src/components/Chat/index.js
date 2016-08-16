import React, { Component } from 'react';
import styles from './styles.css';
import Message from '../Message';

function renderMessages(messages) {
  return messages.map((message, i) => (
    <Message content={message.content} key={i} self={!!message.self} />
  ));
}

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replyContent: '',
    };
  }

  reply(e) {
    e.preventDefault();

    const { onReply } = this.props;

    typeof onReply === 'function' && onReply(this.state.replyContent);

    this.setState({ replyContent: '' });
  }

  handleInputChange(e) {
    e.preventDefault();

    const { value } = e.target;

    this.setState({ replyContent: value });
  }

  render() {
    const { replyContent } = this.state;
    const { messages, chat } = this.props;

    return chat && !chat.loading ? (
      <div className={styles.Chat}>
        <div className={styles.MessagesList}>
          {renderMessages(messages)}
        </div>

        <div className={styles.ChatReply}>
          <form onSubmit={::this.reply}>
            <input
              type="text"
              placeholder="Type your reply ..."
              className={styles.ChatReplyInput}
              value={replyContent}
              onChange={::this.handleInputChange}
            />
          </form>
        </div>
      </div>
    ) : (
      <div className={styles.NoChat}>
        <span>We are looking for someone...</span>
      </div>
    );
  }
}

import React, { Component } from 'react';
import styles from './styles.css';
import { ChatIcon } from '../Icons';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = { nickname: '' };
  }

  handleNicknameChange(e) {
    const { value } = e.target;

    this.setState({ nickname: value });
  }

  handleStartChat() {
    const { onStartChat } = this.props;
    typeof onStartChat === 'function' && onStartChat(this.state.nickname);
  }

  render() {
    return (
      <div className={styles.Welcome}>
        <div className={styles.HelloLogo}>
          <div className={styles.HelloLogoIcon}>
            <ChatIcon />
          </div>
          <div className={styles.HelloLogoName}>Hello!</div>
        </div>

        <div className={styles.HelloChooseNickname}>
          <input
            type="text"
            placeholder="Choose a nickname..."
            onChange={::this.handleNicknameChange}
            value={this.state.value}
          />
        </div>

        <div className={styles.HelloStartChatting}>
          <div className={styles.GreenButton} onClick={::this.handleStartChat}>Start Chatting</div>
        </div>
      </div>
    );
  }
}

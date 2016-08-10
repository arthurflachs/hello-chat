import React from 'react';
import styles from './styles.css';

export default function Welcome() {
  return (
    <div className={styles.Welcome}>
      <div className={styles.HelloLogo}>
        <div className={styles.HelloLogoIcon} />
        <div className={styles.HelloLogoName}>Hello!</div>
      </div>

      <div className={styles.HelloChooseNickname}>
        <input type="text" placeholder="Choose a nickname..." />
      </div>

      <div className={styles.HelloStartChatting}>
        <div className={styles.GreenButton}>Start Chatting</div>
      </div>
    </div>
  );
}

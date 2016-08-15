import React from 'react';
import styles from './styles.css';

export default function Message({ content }) {
  return (
    <div className={styles.Message}>
      <div className={styles.MessageAvatar}></div>
      <div className={styles.MessageContent}>
        <span>{ content }</span>
      </div>
    </div>
  );
}

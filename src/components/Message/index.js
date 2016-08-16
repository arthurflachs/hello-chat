import React from 'react';
import styles from './styles.css';

export default function Message({ content, self = false }) {
  const MessageClassName = self ? styles.Message_Self : styles.Message;

  return (
    <div className={MessageClassName}>
      <div className={styles.MessageContent}>
        <span>{ content }</span>
      </div>
    </div>
  );
}

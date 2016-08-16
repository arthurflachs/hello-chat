import React from 'react';
import styles from './styles.css';
import { ChatIcon, LogoutIcon } from '../Icons';

export default function Layout({ children, title = 'Hello Chat', onNextChat }) {
  const renderNewChat = (render) => render ? (
    <div className={styles.NewChat} onClick={onNextChat}>
      <span>New Chat</span>
    </div>
  ) : null

  return (
    <div>
      <header className={styles.Header}>
        <div className={styles.HeaderTitle}>
          <span className={styles.ChatIcon}><ChatIcon /></span>
          <span className={styles.ChatTitle}>{title}</span>
        </div>

        {renderNewChat(title !== 'Hello Chat')}

      </header>

      <div className={styles.MainContent}>{children}</div>
    </div>
  );
}

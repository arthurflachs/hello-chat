import React from 'react';
import styles from './styles.css';
import { ChatIcon, LogoutIcon } from '../Icons';

export default function Layout({ children }) {
  return (
    <div>
      <header className={styles.Header}>
        <div className={styles.HeaderTitle}>
          <span className={styles.ChatIcon}><ChatIcon /></span>
          <span className={styles.ChatTitle}>Hello Chat</span>
        </div>

        <div className={styles.NewChat}>
          <span>New Chat</span>
        </div>

        <div className={styles.Logout}>
          <LogoutIcon />
        </div>
      </header>

      <div className={styles.MainContent}>{children}</div>
    </div>
  );
}

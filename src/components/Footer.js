import React from 'react'
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <p>
        <span className={styles.DesktopOnly} display>Created by </span>
        Georgina Carlisle
        <span className={styles.DesktopOnly} > for educational purposes only</span>
        <span className={styles.Date}>2024</span>
      </p>
      <span>
      <a href="https://github.com/GeorginaCarlisle" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="Visit my GitHub profile (opens in a new tab)"
          className={styles.Icons}>
          <i class="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/georgina-carlisle-617b58268" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="Visit my linkedin profile (opens in a new tab)"
          className={styles.Icons}>
          <i class="fa-brands fa-linkedin"></i>
          </a>
      </span>
    </footer>
  )
}

export default Footer
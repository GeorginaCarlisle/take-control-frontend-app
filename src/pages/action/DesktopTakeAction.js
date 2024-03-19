import React from 'react';
import styles from '../../styles/TakeAction.module.css'
import pageStyles from '../../styles/Page.module.css';
import ActionTask from './ActionTask';

const DesktopTakeAction = () => {

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Backlog</h3>
          <p className={styles.OrderBy}>Order by filter</p>
        </div>
        <div className={styles.TasksContainer}>
          <ActionTask />
        </div>
      </div>
      <div className={`${styles.Column} ${styles.MiddleColumn}`}>
        <div className={styles.TitleContainer}>
          <h3>Today</h3>
          <p className={styles.OrderBy}>Order by filter</p>
        </div>
        <div className={styles.TasksContainer}>
          <p>List of tasks</p>
        </div>
      </div>
      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Completed</h3>
        </div>
        <div className={styles.TasksContainer}>
          <p>List of tasks</p>
        </div>
      </div>
    </div>
  )
}

export default DesktopTakeAction
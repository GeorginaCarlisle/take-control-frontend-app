import React from 'react';
import styles from '../../styles/TakeAction.module.css'
import pageStyles from '../../styles/Page.module.css';
import ActionTask from './ActionTask';
import { Spinner } from 'react-bootstrap';

const DesktopTakeAction = (props) => {

  const {
    hasLoaded,
    activeTasks,
    setActiveTasks,
    activeList,
    todayList,
    achievedList
  } = props;

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>

      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Backlog</h3>
          <p className={styles.OrderBy}>Order by filter</p>
        </div>
        <div className={styles.TasksContainer}>
          {hasLoaded ? (
            activeList?.length>0 ? (
              activeList.map( task => (
                <ActionTask 
                  key={task.id}
                  {...task}
                  activeTasks={activeTasks}
                  setActiveTasks={setActiveTasks} 
                  type="active"/>
              ))
            ) : (
              <p>You dont have any active tasks</p>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your tasks</p>
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.Column} ${styles.MiddleColumn}`}>
        <div className={styles.TitleContainer}>
          <h3>Today</h3>
          <p className={styles.OrderBy}>Order by filter</p>
        </div>
        <div className={styles.TasksContainer}>
          {hasLoaded ? (
            todayList?.length>0 ? (
              todayList.map( task => (
                <ActionTask 
                  key={task.id}
                  {...task}
                  activeTasks={activeTasks}
                  setActiveTasks={setActiveTasks} 
                  type="today"/>
              ))
            ) : (
              <p>You dont have any tasks set for today</p>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your tasks</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Completed</h3>
        </div>
        <div className={styles.TasksContainer}>
        {hasLoaded ? (
            achievedList?.length>0 ? (
              achievedList.map( task => (
                <ActionTask 
                  key={task.id}
                  {...task}
                  activeTasks={activeTasks}
                  setActiveTasks={setActiveTasks} 
                  type="achieved"/>
              ))
            ) : (
              <p>You dont have any tasks checked off as done</p>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your tasks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesktopTakeAction
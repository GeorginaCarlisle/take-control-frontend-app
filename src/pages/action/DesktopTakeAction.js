import React, { useEffect, useState } from 'react';
import styles from '../../styles/TakeAction.module.css'
import pageStyles from '../../styles/Page.module.css';
import ActionTask from './ActionTask';
import { axiosReq } from '../../api/axiosDefaults';
import { Spinner } from 'react-bootstrap';

const DesktopTakeAction = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeTasks, setActiveTasks] = useState({ results: []});
  const [todayTasks, setTodayTasks] = useState({ results: []});
  const [completedTasks, setCompletedTasks] = useState({ results: []});

  useEffect(() => {
    const fetchActiveTasks = async () => {
      try {
        const {data} = await axiosReq.get('tasks/?active=True');
        setActiveTasks(data);
        setHasLoaded(true);
      }  catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      fetchActiveTasks();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, []);

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Backlog</h3>
          <p className={styles.OrderBy}>Order by filter</p>
        </div>
        <div className={styles.TasksContainer}>
          {hasLoaded ? (
            activeTasks.results.length>0 ? (
              activeTasks.results.map( task => (
                <ActionTask key={task.id} {...task} setActiveTasks={setActiveTasks} setTodayTasks={setTodayTasks} type="active"/>
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
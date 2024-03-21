import React, { useEffect, useState } from 'react';
import styles from '../../styles/TakeAction.module.css'
import pageStyles from '../../styles/Page.module.css';
import ActionTask from './ActionTask';
import { Spinner } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

const DesktopTakeAction = (props) => {

  const {
    hasLoaded,
    activeTasks,
    setActiveTasks,
    activeList,
    todayList,
    achievedList,
    setHasLoaded
  } = props;

  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    const changeActiveTaskOrder = async () => {
      try {
        const {data} = await axiosReq.get(`/tasks/${filter}`);
        setActiveTasks(data);
        setHasLoaded(true);
      }  catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      changeActiveTaskOrder();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, [filter])

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>

      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h3>Backlog</h3>

          <div className={styles.Filter}>
            <label htmlFor="filter" className={styles.FilterLabel}>Order by:</label>
            <select id="filter" name="filter" onChange={handleFilter} className={styles.FilterBox}>
              <option name="filter" value='?ordering=deadline'>Task deadline</option>
              <option name="filter" value='?ordering=focus__rank'>Focus Area</option>
              <option name="filter" value='?ordering=goal__deadline'>Goal</option>
              <option name="filter" value='?ordering=created_at'>Most recent task</option>
            </select>
          </div>
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
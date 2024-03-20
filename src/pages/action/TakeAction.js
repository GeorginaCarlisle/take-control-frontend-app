import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/TakeAction.module.css';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import MobileTakeAction from './MobileTakeAction';
import DesktopTakeAction from './DesktopTakeAction.js';
import { Button } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults.js';

const TakeAction = () => {

  const currentUser = useCurrentUser();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeTasks, setActiveTasks] = useState({ results: []});
  const [activeList, setActiveList] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [achievedList, setAchievedList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
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
      fetchTasks();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, []);

  useEffect(() => {
    if (activeTasks.results.length>0) {
      setActiveList(activeTasks.results);
      setTodayList(activeTasks.results.filter(task => task.today === true && task.achieved === false));
      setAchievedList(activeTasks.results.filter(task => task.achieved === true));
    }
  }, [activeTasks]);


  return (
    <div className={pageStyles.PageContainer}>
      <div className={`${pageStyles.Title} ${styles.ActionTitle}`}>
        <h1>Take Action <span className={styles.ExtraInfo}>{currentUser.username}</span></h1>
      </div>
      <div className={styles.ButtonContainer}>
        <Link className={`${btnStyles.Button} ${styles.AddTaskBtn}`} to={'/tasks/create'}>
          Add <span className={styles.ExtraInfo}>additional </span>task
        </Link>
        <Button className={btnStyles.Button}>
          End of day reset
        </Button>
      </div>      
      <div className={pageStyles.MobileOnly}>
        <MobileTakeAction 
          hasLoaded={hasLoaded}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          activeList={activeList}
          todayList={todayList}
          achievedList={achievedList}
        />
      </div>
      <div className={pageStyles.DesktopOnly}>
        <DesktopTakeAction 
          hasLoaded={hasLoaded}
          activeTasks={activeTasks}
          setActiveTasks={setActiveTasks}
          activeList={activeList}
          todayList={todayList}
          achievedList={achievedList}
        />
      </div>
    </div>  
  )
}

export default TakeAction
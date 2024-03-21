import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/TakeAction.module.css';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import MobileTakeAction from './MobileTakeAction';
import DesktopTakeAction from './DesktopTakeAction.js';
import { Button, Modal } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults.js';

const TakeAction = () => {

  const currentUser = useCurrentUser();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeTasks, setActiveTasks] = useState({ results: []});
  const [activeList, setActiveList] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [achievedList, setAchievedList] = useState([]);
  const [showModal, setShowModel] = useState(false);

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

  const handleResetRequest = () => {
    setShowModel(true);
  };

  const handleModalClose = () => {
    setShowModel(false);
  };

  const handleReset = async () => {
    if (achievedList.length > 0){
      for (const task of achievedList) {
        try {
          const { id } = task;
          await axiosRes.delete(`/tasks/${id}`);
          const activeList = activeTasks.results;
          const taskIndex = activeList.findIndex(task => task.id === id);
          activeList.splice(taskIndex, 1);
          setActiveTasks(
            {
              results: [
                ...activeList
              ]
            }
          );
        } catch(err){
          console.log(err);
        }
      };
    };
    if (todayList.length > 0){
      for (const task of todayList) {
        const { id } = task;
        const {data} = await axiosReq.patch(`/tasks/${id}`, { today: false });
        const activeList = activeTasks.results;
        const taskIndex = activeList.findIndex(task => task.id === id);
        activeList[taskIndex] = data;
        setActiveTasks(
          {
            results: [
              ...activeList
            ]
          }
        );
      };
    };
    setShowModel(false);
  };

  return (
    <div className={pageStyles.PageContainer}>
      <div className={`${pageStyles.Title} ${styles.ActionTitle}`}>
        <h1>Take Action <span className={styles.ExtraInfo}>{currentUser.username}</span></h1>
      </div>
      <div className={styles.ButtonContainer}>
        <Link className={`${btnStyles.Button} ${styles.AddTaskBtn}`} to={'/tasks/create'}>
          Add <span className={styles.ExtraInfo}>additional </span>task
        </Link>
        <Button className={btnStyles.Button} onClick={handleResetRequest}>
          End of day reset
        </Button>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.ModalTitle}>End of day reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you wish to reset "Take Action"?</p>
          <p>Clicking to <strong>Reset</strong> will delete any tasks you have set to done and move everything back into the backlog clearing today.</p>
          <p>If you have any tasks you wish to repeat unclick done before clicking to reset.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className={btnStyles.Button} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className={btnStyles.Button} onClick={handleReset}>
            Reset Take Action
          </Button>
        </Modal.Footer>
      </Modal>

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
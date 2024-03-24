import React, { useEffect, useState } from 'react'
import { useCheckedUser, useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/TakeAction.module.css';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import MobileTakeAction from './MobileTakeAction';
import DesktopTakeAction from './DesktopTakeAction.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosReq, axiosRes } from '../../api/axiosDefaults.js';
import ActionTaskCreate from '../tasks/ActionTaskCreate.js';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext.js';

const TakeAction = () => {

  const currentUser = useCurrentUser();
  const checkedUser = useCheckedUser();

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeTasks, setActiveTasks] = useState({ results: []});
  const [activeList, setActiveList] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [achievedList, setAchievedList] = useState([]);
  const [showModal, setShowModel] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {data} = await axiosReq.get('/tasks/');
        setActiveTasks(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    if (checkedUser) {
      fetchTasks();
    }
  }, [checkedUser]);

  useEffect(() => {
    if (activeTasks.results.length>0) {
      setActiveList(activeTasks.results);
      setTodayList(activeTasks.results.filter(task => task.today === true && task.achieved === false));
      setAchievedList(activeTasks.results.filter(task => task.achieved === true));
    }
  }, [activeTasks]);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  }

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
          await axiosRes.delete(`/tasks/${id}`)
          setGlobalSuccessMessage("You have reset the Take Action board. All complete tasks have been deleted and everything else returned to the backlog.");
          setShowGlobalSuccess(true);
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
          //console.log(err);
        }
      };
    };
    if (todayList.length > 0){
      for (const task of todayList) {
        const { id } = task;
        const {data} = await axiosReq.patch(`/tasks/${id}`, { today: false });
        setGlobalSuccessMessage("You have reset the Take Action board. All complete tasks have been deleted and everything else returned to the backlog.");
        setShowGlobalSuccess(true);
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
      {checkedUser ? (
        <>
          <div className={pageStyles.Title}>
            <h1>Take Action <span className={styles.ExtraInfo}>{currentUser.username}</span></h1>
          </div>
          <div className={styles.ButtonContainer}>
            <Button className={btnStyles.Button} onClick={handleOpenForm}>
              Add <span className={styles.ExtraInfo}>additional </span>task
            </Button>
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

          <Modal show={showForm} onHide={handleFormClose}>
            <Modal.Header closeButton>
              <Modal.Title className={styles.ModalTitle}>Create New Task</Modal.Title>
            </Modal.Header>
            <ActionTaskCreate activeTasks={activeTasks} setActiveTasks={setActiveTasks} setShowForm={setShowForm}/>
          </Modal>

          <div className={pageStyles.MobileOnly}>
            <MobileTakeAction 
              hasLoaded={hasLoaded}
              activeTasks={activeTasks}
              setActiveTasks={setActiveTasks}
              activeList={activeList}
              todayList={todayList}
              achievedList={achievedList}
              setHasLoaded={setHasLoaded}
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
              setHasLoaded={setHasLoaded}
            />
          </div>
        </>
      ) : (
        <div>
          Just loading your data ....
        </div>
      )}
    </div>  
  )
}

export default TakeAction
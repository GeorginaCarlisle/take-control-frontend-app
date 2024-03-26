import React from 'react';
import styles from '../../styles/ActionTask.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const ActionTask = (props) => {
  const {
    id,
    name,
    image,
    context,
    today,
    achieved,
    focus,
    deadline_info,
    goal_deadline_info,
    type,
    activeTasks,
    setActiveTasks,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const handleTodayToggle = async (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      try {
        const {data} = await axiosReq.patch(`/tasks/${id}`, { today: true });
        setGlobalSuccessMessage("Task moved into today");
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
      } catch(err){
        //console.log(err)
      }
    } else {
      try {
        const {data} = await axiosReq.patch(`/tasks/${id}`, { today: false });
        setGlobalSuccessMessage("Task removed from today");
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
      } catch(err){
        //console.log(err)
      }
    } 
  }

  const handleCompleteToggle = async (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      try {
        const {data} = await axiosReq.patch(`/tasks/${id}`, { achieved: true });
        setGlobalSuccessMessage("You have set a task as done. Great job!!");
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
      } catch(err){
        //console.log(err)
      }
    } else {
      try {
        const {data} = await axiosReq.patch(`/tasks/${id}`, { achieved: false });
        setGlobalSuccessMessage("You have reset a task as to do");
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
      } catch(err){
        //console.log(err)
      }
    } 
  }

  function DeadlineContext() {
    if (deadline_info) {
      if (deadline_info.includes("OVERDUE")) {
        return <p className={styles.RedWarning}>{deadline_info}</p>
      } else if (deadline_info.includes("TODAY") || deadline_info.includes("tomorrow")) {
        return <p className={styles.AmberWarning}>{deadline_info}</p>
      } else {
        return <p>{deadline_info}</p>
      }
    } else {
      return null
    }
  };

  function GoalDeadlineContext() {
    if (goal_deadline_info) {
      if (goal_deadline_info.includes("OVERDUE")) {
        return <p className={`${styles.GoalContext} ${styles.RedWarning}`}>{goal_deadline_info}</p>
      } else if (goal_deadline_info.includes("TODAY") || goal_deadline_info.includes("TOMORROW")) {
        return <p className={`${styles.GoalContext} ${styles.AmberWarning}`}>{goal_deadline_info}</p>
      } else {
        return <p className={styles.GoalContext}>{goal_deadline_info}</p>
      }
    } else {
      return null
    }
  };

  function LinkContext() {
    if (focus) {
      return (
        <Link to={`/focus/${focus}`}>
          <img className={styles.Image} src={image} alt='focus'/>
        </Link>
      )
    } else {
      return (
        <Link to="/miscellaneous">
          <img className={styles.Image} src={image} alt='focus'/>
        </Link>
      )
    }
  };

  return (
    <div className={styles.TaskContainer}>
      <div className={styles.ImageContainer}>
        <LinkContext />
      </div>
      <div className={styles.DetailsContainer}>
          {achieved ? (
            <h4 className={styles.AchievedName}>{name}</h4>
          ) : (
            <h4>{name}</h4>
          )}
          <p className={styles.TaskContext}>{context}</p>
          <DeadlineContext />
          <GoalDeadlineContext />
      </div>
      <div className={styles.CheckboxContainer}>
        {type==="active" ? (
            <>
              <input type="checkbox" id={`today-${id}`} name="today" onChange={handleTodayToggle} checked={today} />
              <label htmlFor={`today-${id}`}>Today</label>
              {achieved ? <p>DONE</p> : null}
            </>
          ) : null
        }
        {type==="today" && (
          <>
            <input type="checkbox" id={`achieved-${id}`} name="today" onChange={handleCompleteToggle}/>
            <label htmlFor={`achieved-${id}`}>Done</label>
          </>
        )}
        {type==="achieved" && (
          <>
            <input type="checkbox" id={`achieved-${id}`} name="today" onChange={handleCompleteToggle} checked/>
            <label htmlFor={`achieved-${id}`}>Done</label>
          </>
        )}
      </div>
    </div>
  )
}

export default ActionTask
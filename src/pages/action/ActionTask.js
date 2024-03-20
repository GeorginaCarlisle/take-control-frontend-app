import React from 'react';
import styles from '../../styles/ActionTask.module.css';
import { axiosReq } from '../../api/axiosDefaults';

const ActionTask = (props) => {
  const {
    id,
    name,
    image,
    context,
    deadline,
    deadline_info,
    goal_deadline_info,
    today,
    achieved,
    activeTasks,
    setActiveTasks,
    todayTasks,
    setTodayTasks,
    type
  } = props;

  const todayList = todayTasks?.results;

  const activeList = activeTasks?.results;

  const handleTodayToggle = async (event) => {
      const checkbox = event.target;
      if (checkbox.checked) {
        try {
          const {data} = await axiosReq.patch(`/tasks/${id}`, { today: true });
          setTodayTasks(
            { results: [
              ...todayList,
              data
            ]}
          );
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
          console.log(err)
        }
      } else {
        try {
          const {data} = await axiosReq.patch(`/tasks/${id}`, { today: false });
          const todayTaskIndex = todayList.findIndex(task => task.id === id);
          todayList.splice(todayTaskIndex, 1);
          setTodayTasks(
            {
              results: [
                ...todayList
              ]
            }
          );
          const activeTaskIndex = activeList.findIndex(task => task.id === id);
          activeList[activeTaskIndex] = data;
          setActiveTasks(
            {
              results: [
                ...activeList
              ]
            }
          );
        } catch(err){
          console.log(err)
        }
      } 
    }

  function DeadlineContext() {
    if (deadline_info) {
      if (deadline_info.includes("OVERDUE")) {
        return <p className={styles.RedWarning}>{deadline_info}</p>
      } else if (deadline_info.includes("TODAY")) {
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

   return (
    <div className={styles.TaskContainer}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={image} alt='focus'/>
        </div>
        <div className={styles.DetailsContainer}>
            <h4>{name}</h4>
            <p className={styles.TaskContext}>{context}</p>
            <DeadlineContext />
            <GoalDeadlineContext />
        </div>
        <div className={styles.CheckboxContainer}>
          {type==="active" ? (
            today ? (
              <>
                <input type="checkbox" id="today" name="today" onChange={handleTodayToggle} checked />
                <label for="today">Today</label>
              </>
            ) : (
              <>
                <input type="checkbox" id="today" name="today" onChange={handleTodayToggle}/>
                <label for="today">Today</label>
              </>
            )
          ) : null
        }
          {type==="today" && (
            <>
              <input type="checkbox" id="achieved" name="today" />
              <label for="achieved">Done</label>
            </>
          )}
        </div>
    </div>
  )
}

export default ActionTask
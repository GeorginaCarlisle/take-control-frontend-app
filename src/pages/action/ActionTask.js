import React from 'react';
import styles from '../../styles/ActionTask.module.css';

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
    setActiveTasks,
    setTodayTasks,
    type
  } = props;

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
          {today ? (
            <>
              <input type="checkbox" id="today" name="today" checked />
              <label for="today">Today</label>
            </>
          ) : (
            <>
              <input type="checkbox" id="today" name="today" />
              <label for="today">Today</label>
            </>
          )}
        </div>
    </div>
  )
}

export default ActionTask
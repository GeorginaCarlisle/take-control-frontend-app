import React from 'react';
import styles from '../../styles/ActionTask.module.css';

const ActionTask = (props) => {
  const {
    id,
    name,
    image,
    context,
    deadline_info,
    goal_deadline_info,
    today,
    achieved,
    setActiveTasks,
    setTodayTasks,
    type
  } = props;

  return (
    <div className={styles.TaskContainer}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={image} alt='focus'/>
        </div>
        <div className={styles.DetailsContainer}>
            <h4>{name}</h4>
            {deadline_info && <p>Task deadline: {deadline_info}</p>}
            <p>{context} {goal_deadline_info && goal_deadline_info}</p>
        </div>
        <div>
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
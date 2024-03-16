import React from 'react'
import styles from '../../styles/Goal.module.css';
import btnStyles from '../../styles/Button.module.css';
import TaskList from '../tasks/TaskList';

const GoalView = (props) => {
  const {
    setGoals,
    goals,
    id,
    description,
    value,
    criteria,
    deadline,
    active,
  } = props;


  return (
    <>
      <div>
        <p>{description}</p>
        <p>{value}</p>
        <p>{criteria}</p>
        {deadline ? (
          <p>To be achieved by {deadline}</p>
        ) : (
          <p>No deadline</p>
        )}
        <p>Active</p>
        <div className={styles.IconContainer}>
          <button className={btnStyles.Icon} aria-label="Click to edit focus">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button className={btnStyles.Icon} aria-label="Click to delete focus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div className="Nested tasks">
        <TaskList goal_id={id} type="goal"/>
      </div>
    </>
  )
}

export default GoalView
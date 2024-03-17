import React from 'react'
import styles from '../../styles/Goal.module.css';
import TaskList from '../tasks/TaskList';

const GoalView = (props) => {
  const {
    id,
    title,
    description,
    value,
    criteria,
    deadline,
    active,
    deadline_near,
    days_remaining
  } = props;


  return (
    <>
      <div className={styles.GoalViewContainer}>
        <h3>{title}</h3>
        <p><span className={styles.label}>Description:</span>{description}</p>
        <p><span className={styles.label}>Value:</span>{value}</p>
        <p><span className={styles.label}>Success Criteria:</span>{criteria}</p>
        <div className={styles.ExtraDetails}>
          {deadline ? (
            <p><span className={styles.label}>Achieve by:</span>{deadline}</p>
          ) : (
            <p>No deadline</p>
          )}
          <div>
            <label className={styles.Active} htmlFor="checkbox">
              {active ? ('Goal active:') : ('Goal paused:')}
            </label>
            <input type="checkbox" checked={active} onChange={() => {}} />
          </div>
        </div>
        {deadline_near && (
          <p className={styles.DeadlineWarning}>DEADLINE NEAR only {days_remaining} days remaining</p>
        )}
        <div className={styles.IconContainer}>
          <button className={styles.Icon} aria-label="Click to edit focus">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button className={styles.Icon} aria-label="Click to delete focus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div className={styles.NestedTasks}>
        <h3>Tasks for your goal</h3>
        <TaskList goal_id={id} type="goal"/>
      </div>
    </>
  )
}

export default GoalView
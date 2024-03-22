import React from 'react'
import cardStyles from '../../styles/Cards.module.css';
import styles from '../../styles/Goal.module.css';

const GoalHighlights = (props) => {

  const {
    title,
    deadline,
    deadline_near,
    days_remaining,
    description,
  } = props;

  return (
    <div className={cardStyles.Goal}>
      <div className={cardStyles.GoalTitle}>
        <h3>{title}</h3>
        <span>{deadline}</span>
      </div>
      {description && <p>{description}</p>}
      {deadline_near && (
          days_remaining===0 || days_remaining===1 ? (
            <p className={styles.HighlightDeadlineWarning}>DEADLINE DUE</p>
          ) : (
            days_remaining<0 ? (
              <p className={styles.HighlightDeadlineWarning}>DEADLINE OVERDUE !!</p>
            ) : (
              <p className={styles.HighlightDeadlineWarning}>Deadline near only {days_remaining} days remaining</p>
            )
          )
        )}
    </div>
  )
}

export default GoalHighlights
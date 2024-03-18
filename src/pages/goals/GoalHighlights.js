import React from 'react'
import cardStyles from '../../styles/Cards.module.css';

const GoalHighlights = (props) => {

  const {
    title,
    deadline,
    description,
  } = props;

  return (
    <div className={cardStyles.Goal}>
      <div className={cardStyles.GoalTitle}>
        <h3>{title}</h3>
        <span>{deadline}</span>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default GoalHighlights
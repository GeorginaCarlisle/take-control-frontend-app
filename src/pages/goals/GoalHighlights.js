import React, { useState } from 'react'
import cardStyles from '../../styles/Cards.module.css';
import { axiosRes } from '../../api/axiosDefaults';

const GoalHighlights = (props) => {
  const goalObject = {...props};

  const [goal, setGoal] = useState({
  ...goalObject});

  const {
    id,
    title,
    deadline,
    description,
    active,
  } = goal;

  const handleActivate = async () => {
    try {
      await axiosRes.patch(`goals/${id}`, { active: true });
      setGoal(prevGoal => ({
        ...prevGoal,
        active: true,
      }))
    } catch(err){
      //console.log(err);
    }
  }

  const handlePause = async (id) => {
    try {
      await axiosRes.patch(`goals/${id}`, { active: false });
      setGoal(prevGoal => ({
        ...prevGoal,
        active: false,
      }))
    } catch(err){
      //console.log(err);
    }
  }

  return (
    <div className={cardStyles.Goal}>
      <div className={cardStyles.GoalTitle}>
        <h3>{title}</h3>
        <span>{deadline}</span>
      </div>
      <p>{description}</p>
      {active ? (
        <span onClick={() => handlePause(goal.id)} className={cardStyles.ActiveToggle}>
          <i class="fa-solid fa-play"></i>
        </span>
      ) : (
        <span onClick={() => handleActivate(goal.id)} className={cardStyles.ActiveToggle}>
          <i class="fa-solid fa-pause"></i>
        </span>
      )}
    </div>
  )
}

export default GoalHighlights
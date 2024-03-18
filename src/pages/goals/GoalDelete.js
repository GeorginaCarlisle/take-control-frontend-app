import React from 'react'
import { Button } from 'react-bootstrap';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/GoalCreate.module.css';
import { axiosRes } from '../../api/axiosDefaults';

const GoalDelete = (props) => {
  const {
    id,
    title,
    goals,
    setGoals,
    setGoalState,
    setKeyParameters,
    keyParameters
  } = props;

  const goalList = goals.results;

  const handleCancel = () => {
    setGoalState('view');
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/goals/${id}`);
      const goalIndex = goalList.findIndex(goal => goal.id === id);
      goalList.splice(goalIndex, 1);
      if (keyParameters) {
        setKeyParameters({
          ...keyParameters,
          goal_id: "",
        });
      }
      setGoals(
        { results: [
          ...goalList
        ]}
      );
      setGoalState("view")
    } catch(err){
      //console.log(err)
    }
  };

  return (
    <div className={styles.CreateContainer}>
      <p>Are you sure you wish to delete your goal: {title}?</p>
      <p>Deleting it will also result in all tasks within this goal being deleted too.</p>
      <div>
        <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default GoalDelete
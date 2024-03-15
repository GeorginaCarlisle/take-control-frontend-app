import React from 'react';
import taskStyles from '../../styles/Task.module.css'

const TaskView = (props) => {
  const {
    name,
    deadline_info,
  } = props;

  return (
    <div className={taskStyles.TaskContainer}>
      <button className={taskStyles.ChoiceIcon} aria-label="Click to see choices">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <div className={taskStyles.TaskDetails}>
        <h4>{name}</h4>
        {deadline_info ? (
          <p>{deadline_info}</p>
        ) : (
          <p>(No deadline)</p>
        )}
      </div>
    </div>
  )
}

export default TaskView
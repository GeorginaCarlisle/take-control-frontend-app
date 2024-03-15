import React from 'react';
import taskStyles from '../../styles/Task.module.css'

const TaskView = () => {
  return (
    <div className={taskStyles.TaskContainer}>
      <button className={taskStyles.ChoiceIcon} aria-label="Click to see choices">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <div className={taskStyles.TaskDetails}>
        <h4>Task one</h4>
        <p>(Extra information)</p>
      </div>
    </div>
  )
}

export default TaskView
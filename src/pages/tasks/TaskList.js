import React from 'react';
import styles from '../../styles/Task.module.css'
import TaskView from './TaskView';

const TaskList = ( props ) => {

  const { focus_id, goal_id, type } = props;

  return (
    <div className={styles.ListContainer}>
      <ul>
        <TaskView />
      </ul>
      <div className={styles.DesktopNewTask}>
        Create a new task
      </div>
    </div>
  )
}

export default TaskList
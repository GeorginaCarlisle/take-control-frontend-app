import React, { useState } from 'react';
import TaskView from './TaskView';

const TaskIndividual = (props) => {
  const {
    task,
    focus_id,
    goal_id,
    tasks,
    setTasks
  } = props;

  const [taskState, setTaskState] = useState("view");

  function TaskContext() {
    if (taskState==='view') {
      return <TaskView key={task.id} {...task} setTaskState={setTaskState}/>
    } else if (taskState==='edit') {
      return 
    } else if (taskState==='delete') {
      return 
    }
  };

  return (
    <div>
     <TaskContext/>  
    </div>
  )
}

export default TaskIndividual
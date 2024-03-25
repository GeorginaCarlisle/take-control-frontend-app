import React, { useState } from 'react';
import TaskView from './TaskView';
import TaskEdit from './TaskEdit';
import TaskDelete from './TaskDelete';

const TaskIndividual = (props) => {
  const {
    task,
    focus_id,
    goal_id,
    tasks,
    setTasks,
    type
  } = props;

  const [taskState, setTaskState] = useState("view");

  function TaskContext() {
    if (taskState==='view') {
      return <TaskView key={task.id} {...task} setTaskState={setTaskState}/>
    } else if (taskState==='edit') {
      return <TaskEdit {...task} type={type} setTaskState={setTaskState} tasks={tasks} setTasks={setTasks} focus_id={focus_id} goal_id={goal_id}/>
    } else if (taskState==='delete') {
      return <TaskDelete {...task} tasks={tasks} setTasks={setTasks} setTaskState={setTaskState}/>
    }
  };

  return (
    <div>
     <TaskContext/>  
    </div>
  )
}

export default TaskIndividual
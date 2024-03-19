import React, { useEffect, useState } from 'react';
import styles from '../../styles/Task.module.css';
import TaskView from './TaskView';
import { axiosReq } from '../../api/axiosDefaults';
import { Spinner } from 'react-bootstrap';
import TaskCreate from './TaskCreate';

const TaskList = ( props ) => {

  const { focus_id, goal_id, type } = props;

  const [tasks, setTasks] = useState({ results: [] });

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (type==="day to day") {
        try {
          const {data} = await axiosReq.get(`/tasks/?focus=${focus_id}&goal=None`);
          setTasks(data);
          setHasLoaded(true);
        } catch(err) {
          //console.log(err)
        }
      } else if (type==="goal") {
        try {
          const {data} = await axiosReq.get(`/tasks/?goal=${goal_id}`);
          setTasks(data);
          setHasLoaded(true);
        } catch(err) {
          console.log(err)
        }
      } else if (type==="miscellaneous") {
        try {
          const {data} = await axiosReq.get('/tasks/?focus=None');
          setTasks(data);
          setHasLoaded(true);
        } catch(err) {
          console.log(err)
        }
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, [focus_id, goal_id, type]);

  function CreateContext() {
    if (type==="day to day") {
      return <TaskCreate type={type} focus_id={focus_id} tasks={tasks} setTasks={setTasks}/>
    } else if (type==="goal") {
      return <TaskCreate type={type} focus_id={focus_id} goal_id={goal_id} tasks={tasks} setTasks={setTasks}/>
    } else if (type==="miscellaneous") {
      return <TaskCreate type={type} tasks={tasks} setTasks={setTasks}/>
    } 
  };

  return (
    <div>
      <div className={styles.TaskListContainer}>
        {hasLoaded ? (
          tasks.results.length ? (
            tasks.results.map(task => (
              <TaskView key={task.id} {...task} />
            ))
          ) : (
            <div>
              <p>No tasks yet! Create your first task below.</p>
            </div>
          )
        ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your tasks</p>
            </div>
        )}
      </div>
      <CreateContext />
    </div>
  )
}

export default TaskList
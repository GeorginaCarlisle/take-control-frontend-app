import React, { useEffect, useState } from 'react';
import styles from '../../styles/Task.module.css';
import TaskView from './TaskView';
import { axiosReq } from '../../api/axiosDefaults';
import { Spinner } from 'react-bootstrap';

const TaskList = ( props ) => {

  const { focus_id, goal_id, type } = props;

  const [tasks, setTasks] = useState({ results: [] });

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (type==="daytoday") {
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

  return (
    <div>
      <div>
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
      <div>
        Create a new task
      </div>
    </div>
  )
}

export default TaskList
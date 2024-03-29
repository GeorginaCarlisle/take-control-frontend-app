import React from 'react'
import { axiosRes } from '../../api/axiosDefaults';
import Button from 'react-bootstrap/Button';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/TaskCreate.module.css';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const TaskDelete = (props) => {
  const {
    id,
    name,
    tasks,
    setTasks,
    setTaskState
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const taskList = tasks.results;

  const handleCancel = () => {
    setTaskState('view');
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}`);
      setGlobalSuccessMessage("You have deleted your task");
      setShowGlobalSuccess(true);
      const taskIndex = taskList.findIndex(task => task.id === id);
      taskList.splice(taskIndex, 1);
      setTasks(
        { results: [
          ...taskList
        ]}
      );
    } catch(err){
      //console.log(err)
    }
  };

  return (
    <div className={styles.EditContainer}>
      <p className={styles.DeleteParagraph}>Are you sure you wish to delete your task: {name}?</p>
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

export default TaskDelete
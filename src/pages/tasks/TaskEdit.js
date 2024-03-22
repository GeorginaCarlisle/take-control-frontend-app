import React, { useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/TaskCreate.module.css';
import Alert from 'react-bootstrap/alert';
import Form from 'react-bootstrap/form';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const TaskEdit = (props) => {
  const {
    id,
    name,
    focus,
    goal,
    deadline,
    tasks,
    setTasks,
    setTaskState,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const convertedDate = () => {
    if (deadline !== null){
      return new Date(deadline).toISOString().split('T')[0];
    } else {
      return '';
    } 
  };

  const taskList = tasks.results;

  const [taskData, setTaskData] = useState({
    newName: name,
    newFocus: focus,
    newGoal: goal,
    newDeadline: convertedDate,
  })
  const {
    newName,
    newFocus,
    newGoal,
    newDeadline,
  } = taskData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setTaskState("view");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', newName)
    if (focus) {
      formData.append('focus', newFocus)
    };
    if (goal) {
      formData.append('goal', newGoal)
    }
    if (newDeadline) {
      const parts = newDeadline.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const djangoDate = date.toISOString();
      formData.append('deadline', djangoDate);
    }
    try {
      const {data} = await axiosReq.put(`/tasks/${id}`, formData);
      setGlobalSuccessMessage("You have edited your task");
      setShowGlobalSuccess(true);
      const taskIndex = taskList.findIndex(task => task.id === id);
      taskList[taskIndex] = data;
      setTasks(
        { results: [
          ...taskList
        ]}
      );
      setTaskState("view");
    } catch(err){
      //console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className={styles.EditContainer}>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>

          {errors.name?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="newName" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Task:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task name"
              name="newName"
              value={newName}
              onChange={handleChange}
              className={styles.EditInput}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <div className={styles.Group}>
            <label htmlFor="newDeadline" className={styles.FormLabel}>Deadline:</label>
            <input
              type="date"
              id="newDeadline"
              name="newDeadline"
              value={newDeadline}
              onChange={handleChange}
              className={styles.DateInput}
            />
          </div>
        </div>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx} className={formStyles.ErrorAlert}>
            {message}
          </Alert>
        ))}
        <div className={styles.EditIconContainer}>
          <button className={styles.EditIcon} type="submit" aria-label="Click to save task">
          <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button className={styles.EditIcon} onClick={handleCancel} aria-label="Click to cancel">
            <i className="fa-regular fa-rectangle-xmark"></i>
          </button>
        </div>
      </Form>
    </div>
  )
}

export default TaskEdit
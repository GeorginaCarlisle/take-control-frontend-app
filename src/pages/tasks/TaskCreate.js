import React, { useState } from 'react'
import Alert from 'react-bootstrap/alert';
import Form from 'react-bootstrap/form';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/TaskCreate.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const TaskCreate = (props) => {
  const {
    focus_id,
    goal_id,
    tasks,
    setTasks,
    type
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const taskList = tasks.results;

  const [taskData, setTaskData] = useState({
    name: '',
    focus: focus_id,
    goal: goal_id,
    deadline: '',
  });

  const {
    name,
    focus,
    goal,
    deadline,
  } = taskData;

  const [errors, setErrors] = useState({});


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    if (focus) {
      formData.append('focus', focus)
    };
    if (goal) {
      formData.append('goal', goal)
    }
    if (deadline) {
      const parts = deadline.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const djangoDate = date.toISOString();
      formData.append('deadline', djangoDate);
    }
    try {
      const {data} = await axiosReq.post('/tasks/', formData);
      setGlobalSuccessMessage("You have created a new task");
      setShowGlobalSuccess(true);
      setTasks(
        { results: [
          ...taskList,
          data
        ]}
      );
      setTaskData({
        name: '',
        focus: focus_id,
        goal: goal_id,
        deadline: '',
      });
    } catch(err){
      //console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setErrors({});
    setTaskData({
      name: '',
      focus: focus_id,
      goal: goal_id,
      deadline: '',
    });
  };

  return (
    <div className={styles.FormContainer}>
      <h4 className={styles.FormTitle}>Add {type} task</h4>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>

          {errors.name?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="name" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Task:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task name"
              name="name"
              value={name}
              onChange={handleChange}
              className={styles.TaskInput}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <div className={styles.Group}>
            <label htmlFor="deadline" className={styles.FormLabel}>Deadline:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={deadline}
              onChange={handleChange}
              className={styles.DateInput}
            />
          </div>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
        </div>
        <div className={styles.IconContainer}>
          <button className={styles.Icon} type="submit" aria-label="Click to save task">
          <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button className={styles.Icon} onClick={handleCancel} aria-label="Click to cancel">
            <i className="fa-regular fa-rectangle-xmark"></i>
          </button>
        </div>
      </Form>
    </div>
  )
}

export default TaskCreate
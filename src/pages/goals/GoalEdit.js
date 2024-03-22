import React, { useState } from 'react';
import Alert from 'react-bootstrap/alert';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/form';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/GoalCreate.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const GoalEdit = (props) => {
  const {
    id,
    focus,
    title,
    description,
    value,
    criteria,
    deadline,
    goals,
    setGoals,
    setGoalState
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

  const goalList = goals.results;

  const [goalData, setGoalData] = useState({
    newTitle: title,
    newDescription: description,
    newValue: value,
    newCriteria: criteria,
    newDeadline: convertedDate,
  });

  const [errors, setErrors] = useState({});

  const {
    newTitle,
    newDescription,
    newValue,
    newCriteria,
    newDeadline,
  } = goalData;

  const handleChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setGoalState("view");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', newTitle)
    formData.append('description', newDescription)
    formData.append('value', newValue)
    formData.append('criteria', newCriteria)
    formData.append('focus', focus)
    if (newDeadline) {
      const parts = newDeadline.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const djangoDate = date.toISOString();
      formData.append('deadline', djangoDate)
    }
    try {
      const {data} = await axiosReq.put(`/goals/${id}`, formData);
      setGlobalSuccessMessage("You have edited your goal");
      setShowGlobalSuccess(true);
      const goalIndex = goalList.findIndex(goal => goal.id === id);
      goalList[goalIndex] = data;
      setGoals(
        { results: [
          ...goalList
        ]}
      );
      setGoalState("view");
    } catch(err){
      //console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className={styles.CreateContainer}>
      <h3 className={styles.title}>Edit goal</h3>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>

          {errors.title?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="newTitle" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Goal:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Give your goal a name"
              name="newTitle"
              value={newTitle}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.description?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="newDescription" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="What do you want to achieve?"
              name="newDescription"
              value={newDescription}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.value?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="newValue" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Value:</Form.Label>
            <Form.Control
              type="text"
              placeholder="What will you gain by achieving this goal?"
              name="newValue"
              value={newValue}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.criteria?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="newCriteria" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Criteria:</Form.Label>
            <Form.Control
              type="text"
              placeholder="How will you know when this goal is achieved?"
              name="newCriteria"
              value={newCriteria}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <div className={styles.Group}>
            <label htmlFor="newDeadline">Achieve by:</label>
            <input
              type="date"
              id="newDeadline"
              name="newDeadline"
              value={newDeadline}
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
        <div className={styles.Buttons}>
          <Button className={btnStyles.Button} onClick={handleCancel}>
              Cancel
          </Button>
          <Button className={btnStyles.Button} type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default GoalEdit

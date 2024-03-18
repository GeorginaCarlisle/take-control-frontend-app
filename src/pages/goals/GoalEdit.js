import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/GoalCreate.module.css';
import { axiosReq } from '../../api/axiosDefaults';

const GoalEdit = (props) => {
  const {
    id,
    title,
    description,
    value,
    criteria,
    deadline,
    goals,
    setGoals,
    setGoalState
  } = props;

  const goalList = goals.results;

  const [goalData, setGoalData] = useState({
    newTitle: title,
    newDescription: description,
    newValue: value,
    newCriteria: criteria,
    newDeadline: deadline,
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

  return (
    <div className={styles.CreateContainer}>
      <h3 className={styles.title}>Edit goal</h3>
      <Form>
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

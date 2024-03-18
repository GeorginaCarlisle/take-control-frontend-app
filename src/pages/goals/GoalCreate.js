import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/GoalCreate.module.css';

const GoalCreate = (props) => {
  const {
    setGoals,
    setGoalState,
    setKeyParameters
  } = props;

  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    value: '',
    criteria: '',
    deadline: null,
    active: true,
  });

  const {
    title,
    description,
    value,
    criteria,
    deadline,
  } = goalData;

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleCancel = () => {};

  return (
    <div className={styles.CreateContainer}>
      <h3 className={styles.title}>Create new goal</h3>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>

          {errors.title?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="title" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Goal:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Give your goal a name"
              name="title"
              value={title}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.description?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="description" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="What do you want to achieve?"
              name="description"
              value={description}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.title?.value((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="value" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Value:</Form.Label>
            <Form.Control
              type="text"
              placeholder="What will you gain by achieving this goal?"
              name="value"
              value={value}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>

          {errors.criteria?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="criteria" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Criteria:</Form.Label>
            <Form.Control
              type="text"
              placeholder="How will you know when this goal is achieved?"
              name="criteria"
              value={criteria}
              onChange={handleChange}
              className={styles.Input}
            />
          </Form.Group>
          <div className={styles.ExtraFields}>
            <p className={styles.Date}>Date Input</p>
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

export default GoalCreate

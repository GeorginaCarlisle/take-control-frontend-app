import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/GoalCreate.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const GoalCreate = (props) => {
  const {
    goals,
    setGoals,
    setGoalState,
    setKeyParameters,
    keyParameters
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const { focus_id } = keyParameters;

  const goalList = goals.results;

  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    value: '',
    criteria: '',
    deadline: '',
  });

  const {
    title,
    description,
    value,
    criteria,
    deadline,
  } = goalData;

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('value', value)
    formData.append('criteria', criteria)
    formData.append('focus', focus_id)
    if (deadline) {
      const parts = deadline.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const djangoDate = date.toISOString();
      formData.append('deadline', djangoDate)
    }
    try {
      const {data} = await axiosReq.post('/goals/', formData);
      setGlobalSuccessMessage("You have created a new goal");
      setShowGlobalSuccess(true);
      setKeyParameters({
        ...keyParameters,
        goal_id: data.id,
      });
      setGoals(
        { results: [
          ...goalList,
          data
        ]}
      );
      if (setGoalState) {
        setGoalState("view");
      } else {
        setGoalData({
          title: '',
          description: '',
          value: '',
          criteria: '',
          deadline: '',
        })
      };
    } catch(err){
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setGoalData({
      title: '',
      description: '',
      value: '',
      criteria: '',
      deadline: '',
    });
    if (setGoalState) {
      setGoalState("view");
    }
  };

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
          <Form.Group controlId="goal-title" className={styles.Group}>
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
          <Form.Group controlId="goal-description" className={styles.Group}>
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

          {errors.value?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId="goal-value" className={styles.Group}>
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
          <Form.Group controlId="goal-criteria" className={styles.Group}>
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

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="goal-achieve-by" className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Achieve by:</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              value={deadline}
              onChange={handleChange}
              className={styles.DateInput}
            />
          </Form.Group>

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

export default GoalCreate

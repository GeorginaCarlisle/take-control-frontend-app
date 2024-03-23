import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import formStyles from '../../styles/Form.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/TaskCreate.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const ActionTaskCreate = (props) => {
  const {
    activeTasks,
    setActiveTasks,
    setShowForm
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const [taskData, setTaskData] = useState({
    name: '',
    focus: '',
    goal: '',
    deadline: '',
  });

  const {
    name,
    focus,
    goal,
    deadline,
  } = taskData;

  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoadedGoals, setHasLoadedGoals] = useState(false);
  const [focuses, setFocuses] = useState({ results: []});
  const [goals, setGoals] = useState({ results: []});

  useEffect(() => {
    const fetchFocuses = async () => {
      try {
        const { data } = await axiosReq.get('/focus/');
        setFocuses(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    fetchFocuses();
  }, []);

  useEffect(() => {
    if (focus!== '') {
      if (focus!== 'misc') {
        const fetchGoals = async () => {
          try {
            const {data} = await axiosReq.get(`/goals/?focus_id=${focus}`);
            setGoals(data);
            setHasLoadedGoals(true);
          } catch(err) {
            //console.log(err)
          }
        };
        setHasLoadedGoals(false);
        fetchGoals();
      } else {
        setGoals({ results: []});
      }
    }
  }, [focus]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    if (focus) {
      if (focus!=="misc") {
        formData.append('focus', focus)
      }
    };
    if (goal) {
      if (goal!=="misc") {
        formData.append('goal', goal)
      }
    };
    if (deadline) {
      const parts = deadline.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const djangoDate = date.toISOString();
      formData.append('deadline', djangoDate);
    };
    try {
      const {data} = await axiosReq.post('/tasks/', formData);
      setGlobalSuccessMessage("You have created a new task");
      setShowGlobalSuccess(true);
      const taskList = activeTasks.results;
      setActiveTasks(
        { results: [
          ...taskList,
          data
        ]}
      );
      setShowForm(false);
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

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className={styles.ActionTaskForm}>

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
            <div className={`${styles.Group} ${styles.DeadlineGroup}`}>
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
            <div>
              {hasLoaded ? (
                focuses.results.length>0 ? (
                  <>
                    {errors.focus?.map((message, idx) => (
                      <Alert key={idx} className={formStyles.ErrorAlert}>
                        {message}
                      </Alert>
                    ))}
                    <label htmlFor="focus">Link to a focus area:</label>
                    <select id="focus" name="focus" onChange={handleChange}>
                      <option name="focus" value='misc'>Miscellaneous</option>
                      {focuses.results.map( focus => (
                        <option key={focus.id} value={focus.id} name="focus">{focus.name}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <p>You have no focus areas. On saving this task will be added to your miscellaneous area.</p>
                )
              ): (
                <div className={styles.SpinnerContainer}>
                  <Spinner animation="border" />
                  <p>Just checking for focus areas</p>
                </div>
              )}
            </div>
            <div>
              {focus ? (
                hasLoadedGoals ? (
                  goals.results.length>0 ? (
                    <>
                      {errors.goal?.map((message, idx) => (
                        <Alert key={idx} className={formStyles.ErrorAlert}>
                          {message}
                        </Alert>
                      ))}
                      <label htmlFor="goal">Link to a goal:</label>
                      <select id="goal" name="goal" onChange={handleChange}>
                        <option name="goal" value='misc'>Day to day task</option>
                        {goals.results.map( goal => (
                          <option key={goal.id} value={goal.id} name="goal">{goal.title}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    focus==="misc" ? (
                      null
                    ) : (
                      <p>You have no goals. On saving this task will be added to the day to day area for this focus.</p>
                      )
                  )
                ): (
                  <div className={styles.SpinnerContainer}>
                    <Spinner animation="border" />
                    <p>Just checking for goals</p>
                  </div>
                )
              ) : null}
            </div>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} className={formStyles.ErrorAlert}>
                {message}
              </Alert>
            ))}
          </div>
          <div className={styles.Buttons}>
            <Button className={btnStyles.Button} onClick={handleFormClose}>
                Cancel
            </Button>
            <Button className={btnStyles.Button} type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  )
}

export default ActionTaskCreate
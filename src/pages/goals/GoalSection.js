import React, { useEffect, useState } from 'react'
import styles from '../../styles/Goal.module.css';
import btnStyles from '../../styles/Button.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import Button from 'react-bootstrap/button';
import Spinner from 'react-bootstrap/spinner';
import GoalView from './GoalView';
import GoalCreate from './GoalCreate';
import GoalEdit from './GoalEdit';
import TaskList from '../tasks/TaskList';
import GoalDelete from './GoalDelete';

const GoalSection = (props) => {
  const {
    keyParameters,
    setKeyParameters,
  } = props;

  const {
    focus_id,
    goal_id,
  } = keyParameters;

  const [goals, setGoals] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentGoal, setCurrentGoal] = useState();
  const [goalState, setGoalState] = useState("view");

  const handleCreate = () => {
    setGoalState("create");
    setKeyParameters({
      ...keyParameters,
      goal_id: '',
    });
  }

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const {data} = await axiosReq.get(`goals/?focus_id=${focus_id}`);
        setGoals(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    fetchGoals();
  }, [focus_id]);

  useEffect(() => {
    const getCurrentGoal = () => {
      const goal = goals.results.filter((goal) => goal.id === goal_id)[0];
      setCurrentGoal(goal);
    };
    if (hasLoaded && goal_id) {
      getCurrentGoal();
    } else {
      setCurrentGoal();
    }
  }, [goal_id, hasLoaded, goals]);

  function ContextAwareToggle({ children, eventKey, callback }) {
    const openGoal = () => {
      if (eventKey===goal_id) {
        setKeyParameters({
          ...keyParameters,
          goal_id: '',
        });
      } else {
        setKeyParameters({
          ...keyParameters,
          goal_id: eventKey,
        });
        setGoalState("view");
      }
    };
    return (
      <div 
        className={styles.GoalTab}
        style={{
          color: eventKey===goal_id ? '#3c159c' : 'black',
          fontWeight: eventKey===goal_id ? 'bold' : 'normal' }}
        onClick={openGoal}
        aria-label={eventKey===goal_id ? 'click to open goal' : 'click to close goal'}
      >
        {children}
        <div className={styles.TabControl}>
          {eventKey===goal_id ? (
            <i className="fa-solid fa-angle-right"></i>
          ) : (
            <i className="fa-solid fa-angle-left"></i>
          )}
        </div>
      </div>
    );
  }

  function GoalContext() {
    if (goalState==='view') {
      return currentGoal ? (
        <>
          <GoalView {...currentGoal} goals={goals} setGoals={setGoals} setGoalState={setGoalState}/>
          <div className={styles.NestedTasks}>
            <h3>Tasks for your goal</h3>
            <TaskList focus_id={focus_id} goal_id={goal_id} type="goal"/>
          </div>
        </>
      ) : (
        goals.results.length>0 ? (
          <div className={styles.GoalPlusMessage}>
            Click on a goal from your Goal list to view that goal and any nested tasks.
          </div>
        ) : (
          <div className={styles.GoalPlusMessage}>
            Create a new goal
          </div>
        )
      )
    } else if (goalState==='create') {
      return <GoalCreate goals={goals} setGoals={setGoals} setGoalState={setGoalState} setKeyParameters={setKeyParameters} keyParameters={keyParameters}/>
    } else if (goalState==='edit') {
      return <GoalEdit {...currentGoal} goals={goals} setGoals={setGoals} setGoalState={setGoalState}/>
    } else if (goalState==='delete') {
      return <GoalDelete {...currentGoal} goals={goals} setGoals={setGoals} setGoalState={setGoalState} setKeyParameters={setKeyParameters} keyParameters={keyParameters}/>
    }
  };

  return (
    <div className={styles.GoalSection}>
      <div className={styles.GoalList}>
        <h3>Goal List</h3>
        <p>Click on a goal to view more</p>
          {hasLoaded ? (
            goals.results.length>0 ? (
              goals.results.map( goal => (
                <ContextAwareToggle eventKey={goal.id} key={goal.id}>
                  <p>{goal.title}</p>
                </ContextAwareToggle>
              ))
            ) : (
              <div className={styles.GoalTab}>
                <p>No goals yet</p>
              </div>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your goals</p>
            </div>
          )}
          <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleCreate}>
            <div>
              Add a goal
            </div>
          </Button>
      </div>
      <div className={styles.GoalPlus}>
        {hasLoaded ? (
          <GoalContext />
        ) : (
          <div className={styles.SpinnerContainer}>
            <Spinner animation="border" />
            <p>Just loading ...</p>
        </div>
        )}
      </div>
    </div>
  )
}

export default GoalSection
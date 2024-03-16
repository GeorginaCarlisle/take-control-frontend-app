import React, { useEffect, useState } from 'react'
import styles from '../../styles/Goal.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { Spinner } from 'react-bootstrap';

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

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const {data} = await axiosReq.get(`goals/?focus_id=${focus_id}`);
        setGoals(data);
        setHasLoaded(true);
      } catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      fetchGoals();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, [focus_id]);

  function ContextAwareToggle({ children, eventKey, callback }) {
    const openGoal = () => {
      eventKey===goal_id ? (
        setKeyParameters({
          ...keyParameters,
          goal_id: '',
        })
      ) : (
        setKeyParameters({
          ...keyParameters,
          goal_id: eventKey,
        })
      );
    }
    return (
      <div 
        className={styles.GoalTab}
        style={{
          color: eventKey===goal_id ? '#3c159c' : 'black',
          fontWeight: eventKey===goal_id ? 'bold' : 'normal' }}
        onClick={openGoal}>
        {children}
        <div className={styles.TabControl}>
          {eventKey===goal_id ? (
            <i class="fa-solid fa-angle-right"></i>
          ) : (
            <i class="fa-solid fa-angle-left"></i>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.GoalSection}>
      <div className={styles.GoalList}>
        <h3>Goal List</h3>
        <p>Click on a goal to view more</p>
          {hasLoaded ? (
            goals.results.length>0 ? (
              goals.results.map( goal => (
                <ContextAwareToggle eventKey={goal.id}>
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
      </div>
      <div className="GoalPlus">
        <div className="GoalView">
          <h3>Goal Title</h3>
          <p>Goal description</p>
          <p>Value goal will provide</p>
          <p>Success Criteria</p>
          <p>To be achieved by 10/07/2024</p>
          <p>Active</p>
          <div>Edit button</div>
          <div>Delete button</div>
        </div>
        <div className="Nested tasks">
          <h3>Nested tasks</h3>
          
        </div>
      </div>
    </div>
  )
}

export default GoalSection
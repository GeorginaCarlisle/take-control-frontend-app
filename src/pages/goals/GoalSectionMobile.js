import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Goal.module.css';
import accStyles from '../../styles/Accordion.module.css';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';
import { Spinner, useAccordionToggle } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import GoalView from './GoalView';


const GoalSectionMobile = (props) => {

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

  // function copied from React bootstrap and adjusted
  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <div
        className={accStyles.Header}
        style={{
          color: isCurrentEventKey ? '#3c159c' : 'black',
          fontWeight: isCurrentEventKey ? 'bold' : 'normal' }}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i class="fa-solid fa-angle-down"></i>
        ) : (
          <i class="fa-solid fa-angle-up"></i>
        )}
      </div>
    );
  }

  return (
    <>
      {hasLoaded ? (
        goals.results.length>0 && (
          goals.results.map( goal => (
            <Card key={goal.id}>
              <Card.Header>
                <ContextAwareToggle as={Card.Header} eventKey={goal.id}>
                  <h3>{goal.title}</h3>
                </ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={goal.id}>
                <Card.Body className={styles.GoalBody}>
                  <GoalView {...goal} goals={goals} setGoals={setGoals}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))
        )
      ) : (
        <Card>
          <Card.Header>
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>We are just loading your goals</p>
            </div>
          </Card.Header>
        </Card>
      )}
      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="99">
            {goals.results.length>0 ? (
              <h3>Create a new goal</h3>
            ) : (
              <h3>Create your first goal</h3>
            )}
            
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="99">
          <Card.Body>

            <>
              <p>
                Form to create a new goal
              </p>
            </>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}

export default GoalSectionMobile
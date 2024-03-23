import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Goal.module.css';
import accStyles from '../../styles/Accordion.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import GoalCreate from './GoalCreate';
import GoalIndividual from './GoalIndividual';


const GoalSectionMobile = (props) => {

  const {
    keyParameters,
    setKeyParameters,
  } = props;

  const {
    focus_id
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
        //console.log(err)
      }
    };
    setHasLoaded(false);
    fetchGoals();
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
          <i className="fa-solid fa-angle-down"></i>
        ) : (
          <i className="fa-solid fa-angle-up"></i>
        )}
      </div>
    );
  }

  return (
    <>
      {hasLoaded ? (
        goals.results.length>0 && (
          goals.results.map( goal => (
            <GoalIndividual key={goal.id} goal={goal} goals={goals} setGoals={setGoals}/>
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
          <ContextAwareToggle as={Card.Header} eventKey="999">
            {goals.results.length>0 ? (
              <h3>Create a new goal</h3>
            ) : (
              <h3>Create your first goal</h3>
            )}
            
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="999">
          <Card.Body>
            <GoalCreate goals={goals} setGoals={setGoals} setKeyParameters={setKeyParameters} keyParameters={keyParameters}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}

export default GoalSectionMobile
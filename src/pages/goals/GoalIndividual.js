import React, { useContext, useState } from 'react'
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import styles from '../../styles/Goal.module.css';
import accStyles from '../../styles/Accordion.module.css';
import GoalView from './GoalView';
import GoalEdit from './GoalEdit';
import TaskList from '../tasks/TaskList';
import GoalDelete from './GoalDelete';

const GoalIndividual = (props) => {
  const {
    focus_id,
    goal,
    goals,
    setGoals
  } = props;

  const [goalState, setGoalState] = useState("view");

  function GoalContext() {
    if (goalState==='view') {
      return <GoalView {...goal} goals={goals} setGoals={setGoals} setGoalState={setGoalState}/>
    } else if (goalState==='edit') {
      return <GoalEdit {...goal} goals={goals} setGoals={setGoals} setGoalState={setGoalState}/>
    } else if (goalState==='delete') {
      return <GoalDelete {...goal} goals={goals} setGoals={setGoals} setGoalState={setGoalState}/>
    }
  };

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
    <Card key={goal.id}>
      <Card.Header>
        <ContextAwareToggle as={Card.Header} eventKey={goal.id}>
          <h3>{goal.title}</h3>
        </ContextAwareToggle>
      </Card.Header>
      <Accordion.Collapse eventKey={goal.id}>
        <Card.Body className={styles.GoalBody}>
          <GoalContext />
          <div className={styles.NestedTasks}>
            <h3>Tasks for your goal</h3>
            <TaskList goal_id={goal.id} focus_id={focus_id} type="goal"/>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default GoalIndividual
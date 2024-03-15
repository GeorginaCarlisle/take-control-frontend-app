import React, { useContext, useState } from 'react'
import pageStyles from '../../styles/Page.module.css';
import styles from '../../styles/FocusMobile.module.css';
import btnStyles from '../../styles/Button.module.css';
import accStyles from '../../styles/Accordion.module.css';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';
import { useAccordionToggle } from 'react-bootstrap';
import FocusView from './FocusView';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TaskList from '../tasks/TaskList';

const MobileFocus = ({ id }) => {

  const [key, setKey] = useState({
    focus_id: id,
    focus_state: 'view',
    goal_id: '',
  })

  const { focus_id, focus_state, goal_id } = key;

  const history = useHistory();

  const handleBack = () => {
    history.push('/plan')
  }

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
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <button className={btnStyles.BackCross} aria-label="Click to return to the plan" onClick={handleBack}>
        <i class="fa-solid fa-x"></i>
      </button>
      <div className={styles.FocusContainer}>
        {focus_state==='view' && <FocusView id={focus_id} setKey={setKey} />}
      </div>

      <Accordion>

        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Day to day tasks</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.BodyContainer}>
              <TaskList id={focus_id} type="daytoday"/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Create a new day to day task</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              <>
                <div className="TaskCreate">
                  Create a new task
                </div>
              </>

            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Create a new goal</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              <>
                <p>
                  Form to create a new goal
                </p>
              </>

            </Card.Body>
          </Accordion.Collapse>
        </Card>


        <>
          <Card>
            <Card.Header>
              <ContextAwareToggle as={Card.Header} eventKey="0">
                <h3>Goal Title</h3>
              </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>Goal description</p>
                <p>Value goal will provide</p>
                <p>Success Criteria</p>
                <p>To be achieved by 10/07/2024</p>
                <p>Active</p>
                <div>Edit button</div>
                <div>Delete button</div>
                <div className="Nested tasks">
                  <h3>Nested tasks</h3>
                  <TaskList id={goal_id} type="goal"/>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </>

      </Accordion>
    </div>
  )
}

export default MobileFocus
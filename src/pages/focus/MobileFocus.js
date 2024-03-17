import React, { useContext, useState } from 'react'
import pageStyles from '../../styles/Page.module.css';
import styles from '../../styles/FocusMobile.module.css';
import btnStyles from '../../styles/Button.module.css';
import accStyles from '../../styles/Accordion.module.css';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';
import { useAccordionToggle } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TaskList from '../tasks/TaskList';
import GoalSectionMobile from '../goals/GoalSectionMobile';
import FocusArea from './FocusArea';

const MobileFocus = ({ id }) => {

  const [keyParameters, setKeyParameters] = useState({
    focus_id: id,
    goal_id: '',
  })

  const { focus_id } = keyParameters;

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

      <FocusArea id={focus_id} />

      <Accordion>
        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Day to day tasks</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.BodyContainer}>
              <TaskList focus_id={focus_id} type="daytoday"/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <GoalSectionMobile keyParameters={keyParameters} setKeyParameters={setKeyParameters}/>
      </Accordion>
    </div>
  )
}

export default MobileFocus
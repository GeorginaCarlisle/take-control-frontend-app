import React, { useContext } from 'react';
import { Accordion, AccordionContext, Card, useAccordionToggle } from 'react-bootstrap';
import styles from '../../styles/TakeAction.module.css';
import accStyles from '../../styles/Accordion.module.css';

const MobileTakeAction = () => {

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
    <Accordion className={styles.Accordion}>
      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="0">
            <h3>Backlog</h3>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <p>Ordering filter</p>
            <p>Add additional task button</p>
            <p>List of active tasks</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="1">
            <h3>Today</h3>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <p>Ordering filter</p>
            <p>List of today tasks</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="2">
            <h3>Completed</h3>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <p>List of completed tasks</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default MobileTakeAction
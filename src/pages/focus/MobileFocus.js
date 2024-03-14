import React, { useContext } from 'react'
import pageStyles from '../../styles/Page.module.css';
import styles from '../../styles/FocusMobile.module.css';
import accStyles from '../../styles/Accordion.module.css';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';
import { useAccordionToggle } from 'react-bootstrap';

const MobileFocus = ({ id }) => {

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
      <div className={styles.BackCross}>
        <i class="fa-solid fa-x"></i>
      </div>
      <div className={styles.FocusContainer}>

        <>
          <div>Image</div>
          <div>
            <div>Focus Details</div>
            <div>Edit button</div>
            <div>Delete button</div>
          </div>
        </>

      </div>

      <Accordion>

        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Day to day tasks</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              <>
                <div className="Task List">
                  <ul>
                    <li>Task one</li>
                    <li>Task two</li>
                  </ul>
                </div>
              </>

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
                  <div className="Task List">
                    <ul>
                      <li>Task one</li>
                      <li>Task two</li>
                    </ul>
                    <div className="TaskCreate">
                      Create a new task
                    </div>
                  </div>
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
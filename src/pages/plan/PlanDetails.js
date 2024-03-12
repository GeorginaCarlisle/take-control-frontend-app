import React, { useContext } from 'react';
import btnStyles from '../../styles/Button.module.css';
import accStyles from '../../styles/Accordion.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';
import { useAccordionToggle } from 'react-bootstrap';


const PlanDetails = ({mobile}) => {

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
        className={accStyles.InnerHeader}
        style={{
          color: isCurrentEventKey ? '#3c159c' : 'black',
          fontWeight: isCurrentEventKey ? 'bold' : 'normal' }}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i class="fa-solid fa-angle-down" className={accStyles.Angle}></i>
        ) : (
          <i class="fa-solid fa-angle-up" className={accStyles.Angle}></i>
        )}
      </div>
    );
  }

  return (
    <div>
      {mobile ? (
        <Accordion className={accStyles.Accordion}>
          <Card>
            <Card.Header>
              <ContextAwareToggle as={Card.Header} eventKey="0">
                <div>
                  <span>Image</span>
                  <h2>Focus Name</h2>
                </div>
              </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>Focus is important to me because ...</p>
                <div className={accStyles.InnerContainer}>
                  <h3>Goal name</h3>
                  <span>10/05/2024</span>
                  <p>Description of goal</p>
                  <p>Value to be gained on achievement of goal</p>
                  <p>Extra</p>
                </div>
                <Link className={btnStyles.Button} to={'/focus/id'}>
                  Go
                </Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <ContextAwareToggle as={Card.Header} eventKey="1">
              <div>
                  <span>Image</span>
                  <span>Miscellaneous</span>
                </div>
              </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>This area is for any tasks which don't fit into any of your focus areas</p>
                <Link className={btnStyles.Button} to={'/miscellaneous'}>
                  Go
                </Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ) : (
        <h2>Desktop</h2>
      )}
    </div>
  )
}

export default PlanDetails
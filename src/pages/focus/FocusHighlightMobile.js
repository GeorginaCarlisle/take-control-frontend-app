import React, { useContext, useEffect, useState } from 'react';
import btnStyles from '../../styles/Button.module.css';
import accStyles from '../../styles/Accordion.module.css';
import cardStyles from '../../styles/Cards.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useAccordionToggle } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import GoalHighlights from '../goals/GoalHighlights';

const FocusHighlightMobile = (props) => {
  const {
    name,
    image,
    id
  } = props;

  const [goals, setGoals] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const {data} = await axiosReq.get(`/goals/?focus_id=${id}`);
        setGoals(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err);
      }
    };
    setHasLoaded(false);
    fetchGoals();
  }, [id]);

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
    <Card>
      <Card.Header>
        <ContextAwareToggle as={Card.Header} eventKey={id}>
          <div className={accStyles.Title}>
            <img className={accStyles.Image} src={image} alt='focus'/>
            <h2>{name}</h2>
          </div>
        </ContextAwareToggle>
      </Card.Header>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>
          <div className={accStyles.GoalContainer}>
            {hasLoaded ? (
              <>
                {goals.results.length ? (
                  goals.results.map(goal => (
                    <GoalHighlights key={goal.id} {...goal} />
                  ))
                ) : (
                  <p>You don't have any goals set for this focus area.</p>
                )}
              </>
            ) : (
              <>
                <div className={cardStyles.SpinnerContainer}>
                  <Spinner animation="border" />
                  <p>We are just loading your goals</p>
                </div>
              </>
            )}
          </div>
          <div className={cardStyles.ButtonContainer}>
            <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={`/focus/${id}`}>
              Go to focus area
            </Link>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default FocusHighlightMobile
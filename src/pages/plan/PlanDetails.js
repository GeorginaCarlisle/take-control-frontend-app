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
import miscellaneousImage from '../../assets/miscellaneous-tasks.jpg';
import { axiosReq } from '../../api/axiosDefaults';
import FocusHighlightMobile from '../focus/FocusHighlightMobile';
import FocusHighlightDesktop from '../focus/FocusHighlightDesktop';


const PlanDetails = ({mobile}) => {
  const [focuses, setFocuses] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchFocuses = async () => {
      try {
        const {data} = await axiosReq.get('/focus/');
        setFocuses(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    // Below sets fetchPosts to fire after a 1 second pause
    const timer = setTimeout(() => {
      fetchFocuses();
    }, 1000)
    // Below cleans up and clears the timeout function
    return () => {
      clearTimeout(timer)
    }
  }, []);

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
          <i class="fa-solid fa-angle-down" className={accStyles.Angle}></i>
        ) : (
          <i class="fa-solid fa-angle-up" className={accStyles.Angle}></i>
        )}
      </div>
    );
  }

  return (
    <div>
      {hasLoaded ? (
        <>
          {mobile ? (
            <Accordion className={accStyles.Accordion}>
              {focuses.results.length && (
                focuses.results.map(focus => (
                  <FocusHighlightMobile key={focus.id} {...focus} />
                ))
              )}
              <Card>
                <Card.Header>
                  <ContextAwareToggle as={Card.Header} eventKey="0">
                    <div className={accStyles.Title}>
                      <img className={accStyles.Image} src={miscellaneousImage} alt='focus'/>
                      <h2>Miscellaneous</h2>
                    </div>
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>A place for tasks that don't fit into any of your focus areas.</p>
                    <div className={cardStyles.ButtonContainer}>
                      <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/miscellaneous'}>
                        Go to miscellaneous area
                      </Link>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ) : (
            <div className={cardStyles.CardsContainer}>
              {focuses.results.length && (
                focuses.results.map(focus => (
                  <FocusHighlightDesktop key={focus.id} {...focus} />
                ))
              )}
              <div className={cardStyles.Card}>
                <div className={cardStyles.Header}>
                  <img className={cardStyles.Image} src={miscellaneousImage} alt='miscellaneous'/>
                  <div className={cardStyles.Title}>
                    <h2>Miscellaneous</h2>
                  </div>
                </div>
                <div className={cardStyles.GoalContainer}>
                  <p>A place for tasks that don't fit into any of your focus areas.</p>
                </div>
                <div className={cardStyles.ButtonContainer}>
                  <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/miscellaneous'}>
                    Go to miscellaneous area
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
        <div className={cardStyles.SpinnerContainer}>
          <Spinner animation="border" />
          <h2>We are just loading your focus areas</h2>
        </div>
        </>
      )}
    </div>
  )
}

export default PlanDetails
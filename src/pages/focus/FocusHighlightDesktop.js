import React, { useEffect, useState } from 'react';
import cardStyles from '../../styles/Cards.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Spinner from 'react-bootstrap/Spinner';
import GoalHighlights from '../goals/GoalHighlights';


const FocusHighlightDesktop = (props) => {
  const {
    name,
    why,
    image,
    id,
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
        //console.log(err)
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
  }, [id]);
  
  return (
    <div className={cardStyles.Card}>
    <div className={cardStyles.Header}>
      <img className={cardStyles.Image} src={image} alt='focus'/>
      <div className={cardStyles.Title}>
        <h2>{name}</h2>
        <p>{why}</p>
      </div>
    </div>
    <div className={cardStyles.GoalContainer}>
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
      <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/focus/id'}>
        Go to focus area
      </Link>
    </div>
  </div>
  )
}

export default FocusHighlightDesktop
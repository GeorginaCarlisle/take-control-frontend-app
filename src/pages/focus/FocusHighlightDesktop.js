import React, { useEffect, useState } from 'react';
import cardStyles from '../../styles/Cards.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Spinner from 'react-bootstrap/Spinner';


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
        console.log("sending get request");
        const {data} = await axiosReq.get(`/goals/?focus_id=${id}`);
        console.log(data);
        setGoals(data);
        setHasLoaded(true);
      } catch(err) {
        console.log(err)
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
  }, []);
  
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
              <div className={cardStyles.Goal} key={goal.id}>
                <div className={cardStyles.GoalTitle}>
                  <h3>{goal.title}</h3>
                  <span>{goal?.deadline}</span>
                </div>
                <p>{goal?.description}</p>
                <p>{goal?.value}</p>
              </div>
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
    <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/focus/id'}>
      Go
    </Link>
  </div>
  )
}

export default FocusHighlightDesktop
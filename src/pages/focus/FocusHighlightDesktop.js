import React from 'react';
import cardStyles from '../../styles/Cards.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const FocusHighlightDesktop = (props) => {
  const {
    name,
    why,
    image,
  } = props;
  
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
      <div className={cardStyles.Goal}>
        <div className={cardStyles.GoalTitle}>
          <h3>Goal name</h3>
          <span>10/05/2024</span>
        </div>
        <p>Description of goal</p>
        <p>Value to be gained on achievement of goal</p>
        <p>Extra</p>
      </div>
      <div className={cardStyles.Goal}>
        <div className={cardStyles.GoalTitle}>
          <h3>Goal name</h3>
          <span>10/05/2024</span>
        </div>
        <p>Description of goal</p>
        <p>Value to be gained on achievement of goal</p>
        <p>Extra</p>
      </div>
    </div>
    <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/focus/id'}>
      Go
    </Link>
  </div>
  )
}

export default FocusHighlightDesktop
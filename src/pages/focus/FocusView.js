import React from 'react';
import styles from '../../styles/FocusView.module.css';
import btnStyles from '../../styles/Button.module.css';
import image from '../../assets/default-focus.jpg';

const FocusView = (props) => {

  const {id, setKey} = props;

  return (
    <>
      <div className={styles.FocusContainer}>
        <img className={styles.Image} src={image} alt='focus'/>
        <div className={styles.Details}>
          <div>
            <span className={styles.Label}>Focus: </span>
            <h3 className={styles.Title}>Focus One</h3>
          </div>
          <p><span className={styles.Label}>Why: </span>Focus is importnat to me because ...</p>
          <div className={styles.IconContainer}>
            <button className={btnStyles.Icon} aria-label="Click to edit focus">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button className={btnStyles.Icon} aria-label="Click to delete focus">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FocusView
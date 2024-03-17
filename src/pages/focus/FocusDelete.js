import React from 'react'
import styles from '../../styles/FocusView.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Button } from 'react-bootstrap';

const FocusDelete = (props) => {
  const {
    id,
    name,
    image,
    setFocusState,
  } = props;

  return (
    <div className={styles.ViewContainer}>
      <img className={styles.Image} src={image} alt='focus'/>
      <div className={styles.ConfirmDelete}>
        <p>Are you sure you wish to delete your focus: {name}?</p>
        <p>Deleting it will also result in all goals and tasks within this focaus area being deleted too.</p>
        <div>
          <Button className={`${btnStyles.Button} ${styles.Button}`}>
            <div className={styles.InnerButton}>
              Cancel
            </div>
          </Button>
          <Button className={`${btnStyles.Button} ${styles.Button}`}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FocusDelete
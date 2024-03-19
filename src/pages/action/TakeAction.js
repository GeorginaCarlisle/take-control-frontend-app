import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/TakeAction.module.css';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import MobileTakeAction from './MobileTakeAction';
import DesktopTakeAction from './DesktopTakeAction.js';
import { Button } from 'react-bootstrap';

const TakeAction = () => {

  const currentUser = useCurrentUser();

  return (
    <div className={pageStyles.PageContainer}>
      <div className={`${pageStyles.Title} ${styles.ActionTitle}`}>
        <h1>Take Action <span className={styles.ExtraInfo}>{currentUser.username}</span></h1>
      </div>
      <div className={styles.ButtonContainer}>
        <Link className={`${btnStyles.Button} ${styles.AddTaskBtn}`} to={'/tasks/create'}>
          Add <span className={styles.ExtraInfo}>additional </span>task
        </Link>
        <Button className={btnStyles.Button}>
          End of day reset
        </Button>
      </div>      
      <div className={pageStyles.MobileOnly}>
        <MobileTakeAction />
      </div>
      <div className={pageStyles.DesktopOnly}>
        <DesktopTakeAction />
      </div>
    </div>  
  )
}

export default TakeAction
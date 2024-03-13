import React from 'react';
import btnStyles from '../../styles/Button.module.css';
import pageStyles from '../../styles/Page.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import PlanDetails from './PlanDetails';

const Plan = () => {

  const currentUser = useCurrentUser();

  return (
    <div className={pageStyles.PageContainer}>
        <div className={pageStyles.Title}>
          <h1>{currentUser.username}'s Plan</h1>
        </div>      
      <div className={btnStyles.ButtonContainer}>
        <Link className={btnStyles.Button} to={'/focus/create'}>
          Create focus
        </Link>
        <Link className={btnStyles.Button} to={'/focus/order'}>
          Rank focus areas
        </Link>
      </div>
      <div className={pageStyles.MobileOnly}>
        <PlanDetails mobile />
      </div>
      <div className={pageStyles.DesktopOnly}>
        <PlanDetails />
      </div>
    </div>
  )
}

export default Plan
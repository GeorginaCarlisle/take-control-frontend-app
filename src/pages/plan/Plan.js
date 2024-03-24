import React from 'react';
import btnStyles from '../../styles/Button.module.css';
import pageStyles from '../../styles/Page.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useCheckedUser, useCurrentUser } from '../../contexts/CurrentUserContext';
import PlanDetails from './PlanDetails';

const Plan = () => {

  const currentUser = useCurrentUser();
  const checkedUser = useCheckedUser();

  return (
    <div className={pageStyles.PageContainer}>
      {checkedUser ? (
        <>
          <div className={pageStyles.Title}>
            <h1>{currentUser.username}'s Plan</h1>
          </div>      
          <div className={btnStyles.ButtonContainer}>
            <Link className={btnStyles.Button} to={'/focus/create'}>
              Create new focus area
            </Link>
          </div>
          <div className={pageStyles.MobileOnly}>
            <PlanDetails mobile />
          </div>
          <div className={pageStyles.DesktopOnly}>
            <PlanDetails />
          </div>
        </>
      ) : (
        <div>
          Just loading your data ....
        </div>
      )}
    </div>
  )
}

export default Plan
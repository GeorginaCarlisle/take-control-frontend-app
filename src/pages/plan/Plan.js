import React from 'react';
import btnStyles from '../../styles/Button.module.css';
import pageStyles from '../../styles/Page.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Plan = () => {
  return (
    <div className={pageStyles.PageContainer}>
      <div className={pageStyles.TitleContainer}>
        <div className={pageStyles.Title}>
          <h1>Plan</h1>
        </div>      
      </div>
      <div className={btnStyles.ButtonContainer}>
        <Link className={btnStyles.Button} to={'/focus'}>
          Add focus
        </Link>
        <Link className={btnStyles.Button} to={'/focus/order'}>
          Rank focus areas
        </Link>
      </div>
    </div>
  )
}

export default Plan
import React from 'react';
import pageStyles from '../styles/Page.module.css';
import btnStyles from '../styles/Button.module.css';
import logo from '../assets/purple-logo.png';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const NotFound = () => {
  return (
    <div className={pageStyles.PageContainer}>
      <div className={pageStyles.SpaceRoundTitle}>
        <div className={pageStyles.Title}>
          <img
            src={logo}
            alt="Take control logo. A green decagon made of intersecting lines"
            className={pageStyles.Logo}
          />
          <h1>Page not found</h1>
        </div>
      </div>
      <div className={pageStyles.ContentContainer} >
        <p>The page you are looking for does not exist.</p>
        <div className={btnStyles.ButtonContainer}>
          <Link className={btnStyles.Button} to={'/'}>
            Return home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
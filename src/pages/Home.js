import React from 'react';
import styles from '../styles/Home.module.css';
import btnStyles from '../styles/Button.module.css';
import pageStyles from '../styles/Page.module.css';
import logo from '../assets/purple-logo.png';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Home = () => {
  return (
    <div className={pageStyles.PageContainer}>
      <div className={pageStyles.TitleContainer}>
        <div className={pageStyles.Title}>
          <img
            src={logo}
            alt="Take control logo. A green decagon made of intersecting lines"
            className={styles.Logo}
          />
          <h1>Take Control</h1>
        </div>
        <h2>keep all your plates spinning</h2>
      </div>
      <div className={btnStyles.ButtonContainer}>
        <Link className={btnStyles.Button} to={'/signup'}>
          Get signed up!
        </Link>
        <Link className={btnStyles.Button} to={'/about'}>
        Find out more
        </Link>
      </div>
    </div>
  )
}

export default Home
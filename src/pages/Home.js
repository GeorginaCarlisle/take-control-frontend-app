import React from 'react';
import btnStyles from '../styles/Button.module.css';
import pageStyles from '../styles/Page.module.css';
import logo from '../assets/purple-logo.png';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import About from './About';


const Home = () => {

  const currentUser = useCurrentUser();

  const signedOutButtons = (
    <>
      <Link className={btnStyles.Button} to={'/signup'}>
      Get signed up!
      </Link>
    </>
  );

  const signedInButtons = (
    <>
      <Link className={btnStyles.Button} to={'/plan'}>
      Get planning!
      </Link>
      <Link className={btnStyles.Button} to={'/takeaction'}>
      Take Action
      </Link>
    </>
  );

  return (
    <div className={pageStyles.PageContainer}>
      <div className={pageStyles.SpaceRoundTitle}>
        <div className={pageStyles.Title}>
          <img
            src={logo}
            alt="Take control logo. A green decagon made of intersecting lines"
            className={pageStyles.Logo}
          />
          <h1>Take Control</h1>
        </div>
        <h2>
          {currentUser ? (`Welcome to your account ${currentUser.username}`) : (
            "keep all your plates spinning")}
        </h2>
      </div>
      {!currentUser && <About />}
      <div className={btnStyles.ButtonContainer}>
        {currentUser ? (signedInButtons) : (signedOutButtons)}
      </div>
    </div>
  )
}

export default Home
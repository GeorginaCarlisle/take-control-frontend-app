import React from 'react'
import { Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css';
import logo from '../assets/purple-logo.png';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Home = () => {
  return (
    <div className={styles.PageContainer}>
      <div className={styles.TitleContainer}>
        <div className={styles.Title}>
          <img
            src={logo}
            alt="Take control logo. A green decagon made of intersecting lines"
            className={styles.Logo}
          />
          <h1>Take Control</h1>
        </div>
        <h2>keep all your plates spinning</h2>
      </div>
      <div className={styles.ContentContainer}>
        <p className={styles.Intro}>
          When there is lots you want to achieve, alongside plenty of responsibilities, 
          it can be hard to keep all your plates spinning. This is where Take Control steps in.
        </p>
        <p>
          Here you can:
        </p>
        <ul>
          <li>
            Define areas in your life you wish to focus on.
          </li>
          <li>
            Note down all the day to day tasks that need accomplishing.
          </li>
          <li>
            Set yourself goals (breaking them down into smaller goals if needed) including 
            success criteria, a completion date and a reminder for yourself of the value 
            that achieving your goal will bring.
          </li>
          <li>
            Add habits you want to build as repeated tasks, specifying how often you would 
            like to complete each week.
          </li>
          <li>
            View all the tasks you have from different areas of your life in one place, with 
            plenty of organisation features to help you to prioritise what to work on.
          </li>
          <li>
            Work through tasks set for today one at a time, get them ticked off and see your progression!
          </li>
        </ul>
      </div>
      <div className={styles.ButtonContainer}>
        <Link className={styles.LinkButton} to={'/signup'}>
          Get signed up!
        </Link>
        <Link className={styles.LinkButton} to={'/about'}>
        Find out more
        </Link>
      </div>
    </div>
  )
}

export default Home
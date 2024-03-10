import React from 'react';
import pageStyles from '../styles/Page.module.css';
import styles from '../styles/About.module.css';
import logo from '../assets/purple-logo.png';

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
        <h2>What is it all about?</h2>
      </div>
      <div className={pageStyles.ContentContainer}>
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
    </div>
  )
}

export default Home
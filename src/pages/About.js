import React from 'react';
import pageStyles from '../styles/Page.module.css';
import styles from '../styles/About.module.css';
import plan from '../assets/plan.png';
import takeAction from '../assets/take-action.png';
import focusarea from '../assets/focus-area.png';
import miscellaneous from '../assets/miscellaneous.png';
import mobileplan1 from '../assets/mobile-plan-1.png';
import mobileplan2 from '../assets/mobile-plan-2.png';
import mobilefocus1 from '../assets/mobile-focus-1.png';
import mobilefocus2 from '../assets/mobile-focus-2.png';
import mobilemiscellaneous1 from '../assets/mobile-miscellaneous-1.png';
import mobilemiscellaneous2 from '../assets/mobile-miscellaneous-2.png';
import mobilebacklog from '../assets/mobile-backlog.png';
import mobiletoday from '../assets/mobile-today.png';
import mobilecompleted from '../assets/mobile-completed.png';

const About = () => {
  return (
    <div className={`${pageStyles.ContentContainer} ${styles.AboutContainer}`}>
      <div className={`${styles.TextContainer} ${styles.Intro}`}>
        <p>
          When there is lots you want to achieve, alongside plenty of responsibilities, 
          it can be hard to keep all your plates spinning.
        </p>
        <p>
          <strong>
            This is where Take Control steps in.
          </strong>
        </p>
      </div>

      <div className={styles.InfoSectionLeft}>
        <div className={`${styles.ImageContainer} ${styles.DesktopImage}`}>
          <img
            src={plan}
            alt="Screenshot of the plan page"
            className={styles.Image}
          />
        </div>
        <div className={styles.MobileImage}>
          <div className={`${styles.ImageContainer} ${styles.DoubleImageContainer}`}>
            <img
              src={mobileplan1}
              alt="Screenshot of the plan page on mobile with tabs closed"
              className={styles.PairImage}
            />
          </div>
          <div className={`${styles.ImageContainer} ${styles.DoubleImageContainer}`}>
            <img
              src={mobileplan2}
              alt="Screenshot of the plan page on mobile with a tab open"
              className={styles.PairImage}
            />
          </div>
        </div>
        <div className={styles.TextContainer}>
          <p>Take Control provides an area where you can <strong>Plan</strong>.</p>
          <p>It's easy to see all your different focus areas, each with their own goals. From here you can create a new focus area or head into an area already created.</p>
        </div>
      </div>

      <div className={styles.InfoSectionRight}>
        <div className={`${styles.ImageContainer} ${styles.DesktopImage}`}>
          <img
            src={focusarea}
            alt="Screenshot of a focus area"
            className={styles.Image}
          />
        </div>
        <div className={styles.MobileImage}>
          <div className={`${styles.ImageContainer} ${styles.DoubleImageContainer}`}>
            <img
              src={mobilefocus1}
              alt="Screenshot of a focus area on mobile with a tab closed"
              className={styles.PairImage}
            />
          </div>
          <div className={`${styles.ImageContainer} ${styles.DoubleImageContainer}`}>
            <img
              src={mobilefocus2}
              alt="Screenshot of a focus area on mobile with a goal tab open"
              className={styles.PairImage}
            />
          </div>
        </div>
        <div className={styles.TextContainer}>
          <p>By creating <strong>focus areas</strong>, you can define and separate all the different areas in your life you want to focus on.</p>
          <p>Within each focus area, you can then set goals you wish to work towards and tasks that need to be completed.</p>
        </div>
      </div>

      <div className={styles.InfoSectionLeft}>
        <div className={`${styles.ImageContainer} ${styles.DesktopImage}`}>
          <img
            src={miscellaneous}
            alt="Screenshot of the miscellaneous area"
            className={styles.Image}
          />
        </div>
        <div className={styles.MobileImage}>
          <div className={`${styles.ImageContainer} ${styles.DoubleImageContainer}`}>
            <img
              src={mobilemiscellaneous1}
              alt="Screenshot of the miscellaneous tab open in plan"
              className={styles.PairImage}
            />
          </div>
          <div className={`${styles.ImageContainer} ${styles.DoubleImageContainer}`}>
            <img
              src={mobilemiscellaneous2}
              alt="Screenshot of the miscellaneous area on mobile"
              className={styles.PairImage}
            />
          </div>
        </div>
        <div className={styles.TextContainer}>
          <p>For any tasks that don't fit into one of your focus areas a <strong>miscellaneous</strong> section is provided.</p>
        </div>
      </div>

      <div className={styles.InfoSectionRight}>
        <div className={`${styles.ImageContainer} ${styles.DesktopImage}`}>
        <img
            src={takeAction}
            alt="Screenshot of the take action page"
            className={styles.Image}
          />
        </div>
        <div className={styles.MobileImage}>
          <div className={`${styles.ImageContainer} ${styles.TripleImageContainer}`}>
            <img
              src={mobilebacklog}
              alt="Screenshot of the backlog tab open in take action"
              className={styles.TripleImage}
            />
          </div>
          <div className={`${styles.ImageContainer} ${styles.TripleImageContainer}`}>
            <img
              src={mobiletoday}
              alt="Screenshot of the today tab open in take action"
              className={styles.TripleImage}
            />
          </div>
          <div className={`${styles.ImageContainer} ${styles.TripleImageContainer}`}>
            <img
              src={mobilecompleted}
              alt="Screenshot of the completed tab open in take action"
              className={styles.TripleImage}
            />
          </div>
        </div>
        <div className={styles.TextContainer}>
          <p>Once your plan is in place you can head to <strong>Take Action</strong> where you can see all your tasks together.</p>
          <p>Tasks can be selected to work on today and checked as done once completed.</p>
          <p>At the end of the day you can then reset the board, deleting all completed tasks and emptying the today list.</p>
        </div>
      </div>
    </div>
  )
}

export default About
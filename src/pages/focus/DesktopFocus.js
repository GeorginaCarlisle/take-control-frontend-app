import React, { useState } from 'react';
import pageStyles from '../../styles/Page.module.css';
import styles from '../../styles/FocusDesktop.module.css';
import FocusView from './FocusView';

const DesktopFocus = ({ id }) => {

  const [key, setKey] = useState({
    focus_id: {id},
    focus_state: 'view',
  })

  const { focus_id, focus_state } = key;

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <div className={styles.BackCross}>
        <i class="fa-solid fa-x"></i>
      </div>
      <div className={styles.FocusContainer}>
        {focus_state==='view' && <FocusView id={focus_id} setKey={setKey} />}

      </div>
      <div className={styles.LinkedDetailsContainer}>

        <>
          <div className="GoalSection">
            <div className="GoalList">
              <ul>
                <li>Goal Title</li>
                <li>Goal Title</li>
              </ul>
            </div>
            <div className="GoalPlus">
              <div className="GoalView">
                <h3>Goal Title</h3>
                <p>Goal description</p>
                <p>Value goal will provide</p>
                <p>Success Criteria</p>
                <p>To be achieved by 10/07/2024</p>
                <p>Active</p>
                <div>Edit button</div>
                <div>Delete button</div>
              </div>
              <div className="Nested tasks">
                <h3>Nested tasks</h3>
                <div className="Task List">
                  <ul>
                    <li>Task one</li>
                    <li>Task two</li>
                  </ul>
                  <div className="TaskCreate">
                    Create a new task
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

        <div className={styles.DayToDayContainer}>
          <h3>Day to day tasks</h3>
          <p>(Those jobs that just need doing)</p>

          <>
            <div className="Task List">
              <ul>
                <li>Task one</li>
                <li>Task two</li>
              </ul>
              <div className="TaskCreate">
                Create a new task
              </div>
            </div>
          </>

        </div>
      </div>
    </div>
  )
}

export default DesktopFocus
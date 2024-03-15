import React, { useState } from 'react';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/FocusDesktop.module.css';
import FocusView from './FocusView';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TaskList from '../tasks/TaskList';

const DesktopFocus = ({ id }) => {

  const [key, setKey] = useState({
    focus_id: id,
    focus_state: 'view',
    goal_id: '',
  })

  const { focus_id, focus_state, goal_id } = key;
  console.log(focus_id)

  const history = useHistory();

  const handleBack = () => {
    history.push('/plan')
  }

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <button className={btnStyles.BackCross} aria-label="Click to return to the plan" onClick={handleBack}>
        <i class="fa-solid fa-x"></i>
      </button>
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
                
              </div>
            </div>
          </div>
        </>

        <div className={styles.DayToDayContainer}>
          <h3>Day to day tasks</h3>
          <p>(Those jobs that just need doing)</p>
          <TaskList focus_id={focus_id} type="daytoday"/>
        </div>
      </div>
    </div>
  )
}

export default DesktopFocus
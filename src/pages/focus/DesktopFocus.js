import React, { useState } from 'react';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/FocusDesktop.module.css';
import FocusView from './FocusView';
import GoalSection from '../goals/GoalSection';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TaskList from '../tasks/TaskList';

const DesktopFocus = ({ id }) => {

  const [keyParameters, setKeyParameters] = useState({
    focus_id: id,
    focus_state: 'view',
    goal_id: '',
  })

  const { focus_id, focus_state, goal_id } = keyParameters;

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
        {focus_state==='view' && <FocusView id={focus_id} setKeyParameters={setKeyParameters} />}
      </div>
      <div className={styles.LinkedDetailsContainer}>
        <GoalSection keyParameters={keyParameters} setKeyParameters={setKeyParameters}/>
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
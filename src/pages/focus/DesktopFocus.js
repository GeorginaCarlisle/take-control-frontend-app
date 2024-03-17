import React, { useState } from 'react';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/FocusDesktop.module.css';
import GoalSection from '../goals/GoalSection';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TaskList from '../tasks/TaskList';
import FocusArea from './FocusArea';

const DesktopFocus = ({ id }) => {

  const [keyParameters, setKeyParameters] = useState({
    focus_id: id,
    goal_id: '',
  })

  const { focus_id } = keyParameters;

  const history = useHistory();

  const handleBack = () => {
    history.push('/plan')
  }

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <button className={btnStyles.BackCross} aria-label="Click to return to the plan" onClick={handleBack}>
        <i class="fa-solid fa-x"></i>
      </button>

      <FocusArea id={focus_id} />

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
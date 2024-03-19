import React from 'react';
import styles from '../../styles/ActionTask.module.css';

const ActionTask = () => {
  return (
    <div className={styles.TaskContainer}>
        <div className={styles.ImageContainer}>Img</div>
        <div className={styles.DetailsContainer}>
            <h4>Task one</h4>
            <p>Extra details</p>
        </div>
        <div>checkbox</div>
    </div>
  )
}

export default ActionTask
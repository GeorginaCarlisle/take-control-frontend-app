import React from 'react';
import styles from '../../styles/FocusView.module.css';
import btnStyles from '../../styles/Button.module.css';

const FocusView = (props) => {
  const {
    name,
    why,
    image,
    setFocusState,
  } = props;

  const handleEdit = () => {
    setFocusState('edit');
  }

  const handleDelete = () => {
    setFocusState('delete');
  }

  return (
    <div className={styles.ViewContainer}>
      <img className={styles.Image} src={image} alt='focus'/>
      <div className={styles.Details}>
        <h3 className={styles.Title}>{name}</h3>
        <p>{why}</p>
        <div className={styles.IconContainer}>
          <button className={btnStyles.Icon} aria-label="Click to edit focus" onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className={btnStyles.Icon} aria-label="Click to delete focus" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FocusView
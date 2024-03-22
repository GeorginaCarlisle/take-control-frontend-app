import React from 'react'
import styles from '../../styles/FocusView.module.css';
import btnStyles from '../../styles/Button.module.css';
import Button from 'react-bootstrap/button';
import { axiosRes } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../contexts/GlobalMessageContext';

const FocusDelete = (props) => {
  const {
    id,
    name,
    image,
    setFocusState,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const history = useHistory();

  const handleCancel = () => {
    setFocusState('view');
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/focus/${id}`);
      setGlobalSuccessMessage("You have deleted your focus area");
      setShowGlobalSuccess(true);
      history.push('/plan')
    } catch(err){
      //console.log(err)
    }
  };

  return (
    <div className={styles.ViewContainer}>
      <img className={styles.Image} src={image} alt='focus'/>
      <div className={styles.ConfirmDelete}>
        <p>Are you sure you wish to delete your focus: {name}?</p>
        <p>Deleting it will also result in all goals and tasks within this focaus area being deleted too.</p>
        <div>
          <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleCancel}>
            <div className={styles.InnerButton}>
              Cancel
            </div>
          </Button>
          <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FocusDelete
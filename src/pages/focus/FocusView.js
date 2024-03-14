import React, { useEffect, useState } from 'react';
import styles from '../../styles/FocusView.module.css';
import btnStyles from '../../styles/Button.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Spinner } from 'react-bootstrap';

const FocusView = (props) => {

  const {id, setKey} = props;

  const [focusData, setFocusData] = useState({
    name: "",
    why: "",
    image: "",
  });

  const { name, why, image } = focusData;

  const [hasLoaded, setHasLoaded] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchFocus = async () => {
      console.log(id);
      try {
        const { data } = await axiosReq.get(`/focus/${id}`)
        const {name, why, image} = data;
        setFocusData({name, why, image});
        setHasLoaded(true);
      } catch(err){
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchFocus();
  }, [history, id])

  return (
    <>
      {hasLoaded ? (
        <div className={styles.FocusContainer}>
          <img className={styles.Image} src={image} alt='focus'/>
          <div className={styles.Details}>
            <h3 className={styles.Title}>{name}</h3>
            <p>{why}</p>
            <div className={styles.IconContainer}>
              <button className={btnStyles.Icon} aria-label="Click to edit focus">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button className={btnStyles.Icon} aria-label="Click to delete focus">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.SpinnerContainer}>
          <Spinner animation="border" />
          <p>Loading ...</p>
        </div>
      )}
    </>
  )
}

export default FocusView
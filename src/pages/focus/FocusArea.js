import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/FocusView.module.css';
import FocusView from './FocusView';
import { Spinner } from 'react-bootstrap';

const FocusArea = ( {id} ) => {

  const [focusData, setFocusData] = useState({
    name: "",
    why: "",
    image: "",
  });

  const [focusState, setFocusState] = useState("view");

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

    <div className={styles.FocusContainer}>
      {hasLoaded ? (
        focusState==='view' && <FocusView {...focusData} setFocusData={setFocusData} setFocusState={setFocusState}/>
      ) : (
        <div className={styles.SpinnerContainer}>
          <Spinner animation="border" />
          <p>Loading your focus details ...</p>
        </div>
      )}      
    </div>
  )
}

export default FocusArea
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/FocusView.module.css';
import FocusView from './FocusView';
import { Spinner } from 'react-bootstrap';
import FocusEdit from './FocusEdit';
import FocusDelete from './FocusDelete';

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

  function FocusContext() {
    if (focusState==='view') {
      return <FocusView {...focusData} setFocusData={setFocusData} setFocusState={setFocusState}/>
    } else if (focusState==='edit') {
      return <FocusEdit {...focusData} id={id} setFocusData={setFocusData} setFocusState={setFocusState}/>
    } else if (focusState==='delete') {
      return <FocusDelete id={id} setFocusState={setFocusState}/>
    }
  };

  return (
    <div className={styles.FocusContainer}>
      {hasLoaded ? (
        <FocusContext />
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
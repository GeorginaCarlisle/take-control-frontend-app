import React from 'react';
import pageStyles from '../../styles/Page.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import MobileFocus from './MobileFocus';
import DesktopFocus from './DesktopFocus';
import { useParams } from 'react-router-dom/cjs/react-router-dom';


const Focus = () => {

  const currentUser = useCurrentUser();

  const { id } = useParams();

  return (
    <div className={pageStyles.PageContainer}>
      <div className={pageStyles.Title}>
        <h1>{currentUser.username}'s Plan</h1>
      </div>      
      <div className={pageStyles.MobileOnly}>
        <MobileFocus id={id}/>
      </div>
      <div className={pageStyles.DesktopOnly}>
        <DesktopFocus id={id}/>
      </div>
    </div>  
  )
}

export default Focus
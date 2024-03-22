import React from 'react';
import { Toast } from 'react-bootstrap';
import { useGlobalSuccessMessage, useSetGlobalSuccessMessage, useSetShowGlobalSuccess, useShowGlobalSuccess } from './contexts/GlobalMessageContext';
import toastStyles from './styles/Toast.module.css';

const SuccessToast = () => {
  
  const showGlobalSuccess = useShowGlobalSuccess();
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const globalSuccessMessage = useGlobalSuccessMessage();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  const handleHide = () => {
    setShowGlobalSuccess(false);
    setGlobalSuccessMessage("");
  }

  return (
    <Toast show={showGlobalSuccess} onClose={handleHide} className={toastStyles.Toast}>
      <Toast.Header className={toastStyles.Header}>
        <strong className={toastStyles.Title}>Success !!</strong>
      </Toast.Header>
      <Toast.Body>{globalSuccessMessage}</Toast.Body>
    </Toast>
  )
}

export default SuccessToast
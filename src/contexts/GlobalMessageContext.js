/* This context provides the ability for all components to beable to
add a message and set showGlobalSuccess to true. This will then trigger
a toast that will display at the top left of the page just under the header
with the given message. See Success Toast which is then nested inside App.js */

import { createContext, useContext, useEffect, useState } from "react";

export const ShowGlobalSuccessContext = createContext();
export const SetShowGlobalSuccessContext = createContext();

export const GlobalSuccessMessageContext = createContext();
export const SetGlobalSuccessMessageContext = createContext();

export const useShowGlobalSuccess = () => useContext(ShowGlobalSuccessContext);
export const useSetShowGlobalSuccess = () => useContext(SetShowGlobalSuccessContext);
export const useGlobalSuccessMessage = () => useContext(GlobalSuccessMessageContext);
export const useSetGlobalSuccessMessage = () => useContext(SetGlobalSuccessMessageContext);

export const GlobalMessageProvider = ({children}) => {
  const [showGlobalSuccess, setShowGlobalSuccess] = useState(false);
  const [globalSuccessMessage, setGlobalSuccessMessage] = useState("");

  useEffect(() => {
    // Closes the toast automatically after 8 seconds
    if (showGlobalSuccess) {
      const hideToast = () => {
        setShowGlobalSuccess(false);
        setGlobalSuccessMessage("");
      }
      const timer = setTimeout(() => {
        hideToast();
      }, 8000)
      // Below cleans up and clears the timeout function
      return () => {
        clearTimeout(timer)
      }
    }
  }, [showGlobalSuccess])

  return (
    <ShowGlobalSuccessContext.Provider value={showGlobalSuccess}>
      <SetShowGlobalSuccessContext.Provider value={setShowGlobalSuccess}>
        <GlobalSuccessMessageContext.Provider value={globalSuccessMessage}>
          <SetGlobalSuccessMessageContext.Provider value={setGlobalSuccessMessage}>
            {children}
          </SetGlobalSuccessMessageContext.Provider>
        </GlobalSuccessMessageContext.Provider>
      </SetShowGlobalSuccessContext.Provider>
    </ShowGlobalSuccessContext.Provider>
  )
}

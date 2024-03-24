/* The code in this file was copied from the 'Moments' walkthrough project 
with checkedUser functionality then added */

import axios from "axios"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

export const CheckedUserContext = createContext();
export const SetCheckedUserContext = createContext();

export const useCheckedUser = () => useContext(CheckedUserContext)
export const useSetCheckedUser = () => useContext(SetCheckedUserContext)

export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkedUser, setCheckedUser] = useState(false);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const {data} = await axiosRes.get('dj-rest-auth/user/')
      setCurrentUser(data)
    } catch(err){
      //console.log(err)
    } finally {
      setCheckedUser(true);
    }
  };

  useEffect(() => {
    handleMount()
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()){
          try {
            await axios.post('/dj-rest-auth/token/refresh/')
          } catch(err){
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/signin')
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
        async (err) => {
          if (err.response?.status === 401){
            try{
              await axios.post('/dj-rest-auth/token/refresh/')
            } catch(err){
              setCurrentUser(prevCurrentUser => {
                if (prevCurrentUser){
                  history.push('/signin')
                }
                return null;
              });
              removeTokenTimestamp();
            }
            return axios(err.config);
          }
          return Promise.reject(err);
        }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <CheckedUserContext.Provider value={checkedUser}>
          <SetCheckedUserContext.Provider value={setCheckedUser}>
            {children}
          </SetCheckedUserContext.Provider>
        </CheckedUserContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}
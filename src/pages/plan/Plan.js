import React from 'react'
import { useCurrentUser } from '../../api/contexts/CurrentUserContext';


const Plan = () => {
  const currentUser = useCurrentUser();

  return (
    <div>
      <h1>Successfully logged in</h1>
      <h2>Welcome {currentUser.username}</h2>
    </div>
  )
}

export default Plan
/* The code in this file was copied from the 'Moments' walkthrough project. 
It is imported into NavBar and used to close the mobile nav on a click outside of the menu
or when a menu link is clicked. */

import { useEffect, useRef, useState } from 'react';

const useClickOutsideToggle = () => {

  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)){
        setExpanded(false)
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    }
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle
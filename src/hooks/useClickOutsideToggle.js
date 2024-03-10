// The code in this file was copied from the 'Moments' walkthrough project.

import { useEffect, useRef, useState } from 'react';

const useClickOutsideToggle = () => {

    // false when mobile nav collapsed and true when it has been expanded
    const [expanded, setExpanded] = useState(false);

    // This will hold a reference to the toggle element once screen size drops
    const ref = useRef(null)

    /**
     *  Adds an event listener for mouse up on changes/rendering of the toggle element (identified through the use of ref which is only triggered for smaller screens).
     *  Handling of event listener checks if it is outside of the toggle element and if so changes expanded to false, which collapses the menu.
     *  Note: clicks on toggle are already programmed to collapse menu.
     *  A cleanup function removes the eventlistener when
     */ 
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
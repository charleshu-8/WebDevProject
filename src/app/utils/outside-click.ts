import {useEffect, useRef} from 'react';

// custom hook function to handle outside clicks that trigger callbacks to carry out some function
// returns ref instance that can then listen for outside events to trigger the callback

const useOutsideClick = (callback: () => void ) => {

    const ref = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            // Check if the click was outside current ref event
            if (ref.current && !ref.current.contains(event.target as Node)) {
              callback(); // handle callback
            }
          };
        // Add event listener when the component mounts
        document.addEventListener('click', handleClickOutside);
        
        return () => {
          // Clean up the event listener when the component unmounts
            document.removeEventListener('click', handleClickOutside);
        };
      }, [callback]);

      return ref;

}

export default useOutsideClick;
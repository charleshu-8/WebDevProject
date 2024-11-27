import { useEffect, useRef } from "react";

// Custom hook function to handle outside clicks that trigger callbacks to carry out some function
// Returns ref instance that can then listen for outside events to trigger the callback
export default function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      // Check if the click was outside current ref event
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(); // Handle callback
      }
    }

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback]);

  return ref;
}

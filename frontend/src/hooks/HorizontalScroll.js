import { useRef, useEffect } from 'react';

export const useHorizontalScroll = () => {
  const elRef = useRef();

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        // e.deltaY is the vertical scroll distance.
        // We prevent the default vertical scroll...
        e.preventDefault();
        // ...and apply it to the horizontal scrollLeft position.
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth' // Optional: for smooth scrolling
        });
      };
      
      el.addEventListener('wheel', onWheel);

      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  
  return elRef;
};
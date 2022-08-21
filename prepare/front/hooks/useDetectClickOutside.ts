import { useState, useEffect, MutableRefObject } from 'react';

export const useDetectClickOutside = (el: MutableRefObject<HTMLElement | null>, initialState: boolean) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (el.current !== null && !el.current.contains(e.target)) {
          setIsActive(!isActive);
        }
      }
    };

    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};

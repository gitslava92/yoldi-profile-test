'use client';

import { useEffect, useState } from 'react';

export const useWindowWidth = (breakpoint: number) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {};
  }, []);

  return windowWidth >= breakpoint;
};

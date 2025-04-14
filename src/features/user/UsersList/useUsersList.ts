import { useEffect, useRef, useState } from 'react';
import type { User } from '@shared/types';

const offset = 100;

export const useUsersList = (users: User[]) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 20;
  const itemHeight = 72;

  const handleResize = () => {
    if (listRef.current) {
      const { top } = listRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setContainerHeight(windowHeight - top - offset);
    }
  };

  const handleScroll = () => {
    if (listRef.current) {
      const scrollTop = listRef.current.scrollTop;
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      setStartIndex(newStartIndex);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {};
  }, []);

  const visibleUsers = users.slice(startIndex, startIndex + visibleCount);
  const offsetTop = startIndex * itemHeight;

  return {
    listRef,
    containerHeight,
    handleScroll,
    itemHeight,
    offsetTop,
    visibleUsers,
  };
};

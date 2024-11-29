'use client';

// Reusable scroll to top button, when clicked will scroll to the top of the page.

import { Button } from '@/components/ui/button';
import { ChevronUpIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // show button when the page has been scrolled beyond 300px, else hide button
  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 300) setIsVisible(true);
    else setIsVisible(false);
  }, []);

  // adding scroll event listener and pass the function to display/hide scroll button/
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return <></>;

  return (
    <Button
      onClick={scrollTop}
      className="fixed right-4 bottom-4 rounded-full"
      size={'icon'}
    >
      <ChevronUpIcon className="h-6 w-6"></ChevronUpIcon>
    </Button>
  );
};

export default ScrollToTop;

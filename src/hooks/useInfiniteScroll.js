import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (callback, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);
        callback().finally(() => {
          setIsLoading(false);
        });
      }
    }, options);

    observerRef.current = observer;

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, isLoading, options]);

  return {
    targetRef,
    isIntersecting,
    isLoading,
  };
};

export default useInfiniteScroll;

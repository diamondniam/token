import { useEffect, useState } from "react";

type UseInViewOptions = IntersectionObserverInit & {
  once?: boolean;
};

export function useInView(ref: React.RefObject<HTMLElement | null>, options?: UseInViewOptions) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options?.once) {
          obs.disconnect();
        }
      } else {
        if (!options?.once) {
          setIsInView(false);
        }
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return isInView;
}

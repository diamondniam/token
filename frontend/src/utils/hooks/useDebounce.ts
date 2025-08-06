import { useEffect, useRef, useState } from "react";

export function useDebounce(value: any, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  return debouncedValue;
}

import { RefObject, useCallback, useEffect } from 'react';

interface UseOutsideProps<T> {
  ref: RefObject<T>;
  handler: (p: boolean) => void;
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>({
  ref,
  handler,
}: UseOutsideProps<T>): void => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(false);
      }
    },
    [handler, ref],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, handler, ref]);
};

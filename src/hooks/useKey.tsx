import { useEffect } from 'react';

export const useKey = (key: string, action: () => void) => {
  useEffect(() => {
    const callback = (e: React.KeyboardEvent) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener('keydown', callback as unknown as EventListener);

    return () => {
      document.removeEventListener(
        'keydown',
        callback as unknown as EventListener,
      );
    };
  }, [key, action]);
};

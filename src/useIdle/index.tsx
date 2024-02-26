import { useRef, useEffect, useState } from 'react';

export type IdleType =
  | 'mousemove'
  | 'mousedown'
  | 'resize'
  | 'keydown'
  | 'touchstart'
  | 'wheel'
  | 'visibilitychange';

export interface IdleProps {
  types: IdleType[];
  ms: number;
}

export function useIdle<T>(
  types: IdleType[] = [
    'mousemove',
    'mousedown',
    'resize',
    'keydown',
    'touchstart',
    'wheel',
    'visibilitychange',
  ],
  ms = 1000 * 3
) {
  const idleRef = useRef<T>(null);
  const [isIdle, setIdle] = useState<boolean>(true);

  useEffect(() => {
    let timeoutId: number;

    const idleEvent = () => {
      setIdle(false);

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIdle(true), ms);
    };

    const dom = idleRef.current || window;
    types.forEach(type => (dom as any).addEventListener(type, idleEvent));

    return () => {
      types.forEach(type => (dom as any).removeEventListener(type, idleEvent));
    };
  }, [idleRef, types, ms]);

  return { idleRef, isIdle };
}

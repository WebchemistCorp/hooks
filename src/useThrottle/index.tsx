import { useRef, useCallback } from 'react';

export function useThrottle() {
  // 현재 함수 실행 후 timeout을 기다리는 상태인지 나타내는 boolean
  const isWaiting = useRef(false);

  return useCallback(
    <T extends (...args: any[]) => void>(callback: T, delay: number /*me*/) => (
      ...arg: Parameters<T>
    ) => {
      // 대기 상태라면 아무것도 하지 않고, 대기상태가 아니라면 아래 코드 실행
      if (!isWaiting.current) {
        // callback 함수 실행
        callback(...arg);

        // 대기상태로 변경
        isWaiting.current = true;

        // delay 이후 대기상태 해제
        setTimeout(() => {
          isWaiting.current = false;
        }, delay);
      }
    },
    []
  );
}

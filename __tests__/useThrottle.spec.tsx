import { useDebounce } from '../src/useDebounce';
import { renderHook, act } from '@testing-library/react';

describe('useThrottle를 테스트합니다.', () => {
  let value = 1;
  let ms = 1000; // 1초

  const add = () => (value += 1);

  const { result } = renderHook(() => useDebounce());
  const debounce = result.current;

  beforeEach(() => {
    value = 1;
    jest.useFakeTimers();
  });

  it('이벤트 발생 1초전에는 값이 변경되지 않습니다.', () => {
    const handle = debounce(add, ms);

    act(() => handle());
    jest.advanceTimersByTime(900);
    expect(value).toEqual(1);
  });

  it('첫 이벤트 발생 1초가 지날때마다 추가됩니다.', () => {
    const handle = debounce(add, ms);

    act(() => handle());
    jest.advanceTimersByTime(200);
    expect(value).toEqual(1);

    // 총합쳐 1초가 지나면 1이 증가됩니다.
    jest.advanceTimersByTime(800);
    expect(value).toEqual(2);
  });
});

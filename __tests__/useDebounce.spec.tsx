import { useDebounce } from '../src/useDebounce';
import { renderHook, act } from '@testing-library/react';

describe('useDebounce을 테스트합니다.', () => {
  let value = false;
  let ms = 1000; // 1초

  const add = () => (value = true);

  const { result } = renderHook(() => useDebounce());
  const debounce = result.current;

  beforeEach(() => {
    jest.useFakeTimers();
    value = false;
  });

  it('이벤트 발생 1초전에는 값이 변경되지 않습니다.', () => {
    const handle = debounce(add, ms);

    act(() => handle());
    jest.advanceTimersByTime(900);
    expect(value).toEqual(false);
  });

  it('이벤트 발생 1초후에는 지나면 값이 변경됩니다.', () => {
    const handle = debounce(add, ms);

    act(() => handle());
    jest.advanceTimersByTime(1500);
    expect(value).toEqual(true);
  });
});

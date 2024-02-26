import { useNetworkState } from '../src/useNetworkState';
import { renderHook } from '@testing-library/react';

describe('useNetworkState', () => {
  it('online에는 true를 반환합니다.', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const { result } = renderHook(() => useNetworkState());
    expect(result.current).toBe(true);
  });

  it('offline에는 false를 반환합니다.,', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    const { result } = renderHook(() => useNetworkState());
    expect(result.current).toBe(false);
  });
});

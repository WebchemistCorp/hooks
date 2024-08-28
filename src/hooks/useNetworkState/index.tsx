import { useState, useEffect } from 'react';

export const useNetworkState = () => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => setOnline(navigator.onLine), [navigator.onLine]);

  return isOnline;
};

import { useRef, useState, RefObject } from 'react';

export const useCopyToClipboard = <T extends HTMLElement | HTMLInputElement>(
  ms = 2000
): [RefObject<T>, () => void, boolean] => {
  const eventRef = useRef<NodeJS.Timeout>();
  const ref = useRef<T>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    clearTimeout(eventRef.current);

    setCopied(true);
    if (ref.current !== null) {
      if (ref.current.textContent !== null) {
        navigator.clipboard.writeText(ref.current.textContent);
      } else if ((ref.current as HTMLInputElement).value !== null) {
        navigator.clipboard.writeText((ref.current as HTMLInputElement).value);
      }
    }

    eventRef.current = setTimeout(() => setCopied(false), ms);
  };

  return [ref, onCopy, copied];
};

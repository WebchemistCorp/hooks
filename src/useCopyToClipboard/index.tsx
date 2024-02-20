import { useRef, useState, RefObject } from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export const useCopyToClipboard = <T extends HTMLElement | InputElement>(
  ms = 2000
): [RefObject<T>, () => void, boolean] => {
  const eventRef = useRef<NodeJS.Timeout>();
  const ref = useRef<T>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    clearTimeout(eventRef.current);

    setCopied(true);
    if (ref.current !== null) {
      if (
        ref.current.tagName === 'INPUT' ||
        ref.current.tagName === 'TEXTAREA'
      ) {
        navigator.clipboard.writeText((ref.current as InputElement).value);
      } else if (ref.current.textContent !== null) {
        navigator.clipboard.writeText(ref.current.textContent);
      }
    }

    eventRef.current = setTimeout(() => setCopied(false), ms);
  };

  return [ref, onCopy, copied];
};

import type { Dispatch } from 'react';
import type { ScrollingElement, Timeout } from '../types';

interface OnScroll {
  timeout: Timeout;
  setProgress: Dispatch<number>;
  scrollElement?: ScrollingElement;
  containerHeight: number;
}

export const onScroll = ({ timeout, setProgress, scrollElement, containerHeight }: OnScroll): void => {
  // If there's a timer, cancel it
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }

  // Setup the new requestAnimationFrame()
  timeout = window.requestAnimationFrame(() => {
    if (!scrollElement) return;
    const { scrollTop, scrollHeight } = scrollElement;
    setProgress(scrollTop / (scrollHeight - containerHeight));
  });
};

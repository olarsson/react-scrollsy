import { Dispatch } from "react";
import { TScrollingElement, TTimeout } from "../types";

export const onScroll = ({ timeout, setProgress, scrollElement, containerHeight }: {
  timeout: TTimeout,
  setProgress: Dispatch<number>,
  scrollElement: TScrollingElement,
  containerHeight: number
}): void => {
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
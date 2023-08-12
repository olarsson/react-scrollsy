/* eslint-disable @typescript-eslint/no-explicit-any */
import innerHeight from 'ios-inner-height';
export { throttle } from 'throttle-typescript';

declare global {
  interface Window {
    MSStream: any;
  }
}

// -------------------
// Document/Element size functions
// -------------------

export const windowHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

export const getContainerClientHeight = (elem: HTMLElement) => elem.clientHeight;

// -------------------
// Math
// -------------------

export const elOffsetTopRelativeToContainer = (el: HTMLElement | undefined, container: HTMLElement | undefined) => {
  if (!el || !container) {
    throw 'element/container is not defined.'
  }
  const rect = el.getBoundingClientRect();
  const scrollTop = container.scrollTop - container.offsetTop;
  return rect.top + scrollTop;
};

// -------------------
// Browser detection
// -------------------

export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// -------------------
// IOS fixes
// -------------------

export const correctInnerHeight = () => {
  if (!isIOS()) return windowHeight();

  return innerHeight();
};
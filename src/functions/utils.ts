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

export function waitForElm(selector: any) {
  return new Promise<HTMLElement>((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer: MutationObserver = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// -------------------
// Math
// -------------------

export const elOffsetTopRelativeToContainer = (el: HTMLElement | undefined, container: HTMLElement | undefined) => {
  if (!el || !container) {
    throw 'element/container is not defined.'
  }
  const rect: DOMRect = el.getBoundingClientRect();
  const scrollTop: number = container.scrollTop - container.offsetTop;
  return rect.top + scrollTop;
};

// -------------------
// Browser detection
// -------------------

export const isIOS = (): boolean => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// -------------------
// IOS fixes
// -------------------

export const correctInnerHeight = (): number => {
  if (!isIOS()) return windowHeight();

  return innerHeight();
};
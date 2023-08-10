import { useState, useEffect, forwardRef, useRef } from 'react';

import { throttle } from './functions/utils';
import { childrenAsMethod } from './functions/childrenAsMethod';

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

export const ScrollTrackerCustom = forwardRef(
  (
    {
      children,
      scrollingElement = null, // document.documentElement
      scrollThrottle = 30,
      resizeThrottle = 150
    },
    ref
  ) => {
    const [upd, setUpdate] = useState(false);
    const [cElem, setCElem] = useState(null);

    let returns = childrenAsMethod({
      scrollData: {
        scrollTop: 0,
        scrollHeight: 0,
        containerHeight: 0,
        percentProgress: 0,
        element: document.documentElement
      },
      children: children
    });

    waitForElm(scrollingElement).then((elem) => {
      console.log('Element is ready', elem);

      setCElem(elem);
      setUpdate(true);
    });

    if (upd) {
      return (
        <ScrollTrackerCustomMain
          scrollThrottle={30}
          resizeThrottle={150}
          customScrollingElement={cElem}
        >
          {children}
        </ScrollTrackerCustomMain>
      );
    }

    return returns;
  }
);

const getContainerClientHeight = (elem) => elem.clientHeight;

const ScrollTrackerCustomMain = ({
  children,
  customScrollingElement = null, // document.documentElement
  scrollThrottle = 30,
  resizeThrottle = 150
}) => {
  const documentScrollingElement = customScrollingElement;

  if (!documentScrollingElement) {
    throw new Error('No custom scrolling element found.');
  }

  let timeout = null;

  const [containerHeight, setContainerHeight] = useState(getContainerClientHeight(documentScrollingElement));
  const [percentProgress, setPercentProgress] = useState(0);

  const onScroll = () => {
    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(() => {
      const { scrollTop, scrollHeight } = documentScrollingElement;
      setPercentProgress(scrollTop / (scrollHeight - containerHeight));
    });
  };

  useEffect(() => {}, []);

  const onResizeEvent = () => {
    setContainerHeight(getContainerClientHeight(documentScrollingElement));
  };

  const scrollEvent = throttle(() => {
    onScroll();
  }, scrollThrottle);

  const resizeEvent = throttle(() => {
    onResizeEvent();
  }, resizeThrottle);

  useEffect(() => {
    window.addEventListener('resize', resizeEvent);
    setContainerHeight(getContainerClientHeight(documentScrollingElement));
    onResizeEvent();

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  useEffect(() => {
    documentScrollingElement.addEventListener('scroll', scrollEvent, { passive: true });

    onScroll();

    return () => {
      documentScrollingElement.removeEventListener('scroll', scrollEvent);
    };
  }, [containerHeight]);

  return childrenAsMethod({
    scrollData: {
      scrollTop: documentScrollingElement.scrollTop,
      scrollHeight: documentScrollingElement.scrollHeight,
      containerHeight: containerHeight,
      percentProgress: percentProgress,
      element: documentScrollingElement
    },
    children: children
  });
};

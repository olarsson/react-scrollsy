/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

// import utils from "./functions/utils";
// const { throttle, correctInnerHeight } = utils;
import { throttle, correctInnerHeight } from './functions/utils';
// import { throttle, correctInnerHeight } from "utils";
import { childrenAsMethod } from "./functions/childrenAsMethod";
import { scrollTrackerDocumentInterface } from "./types";

export const ScrollTrackerDocument = ({
  children,
  // customScrollingElement = undefined, // document.documentElement
  scrollThrottle = 30,
  resizeThrottle = 150,
}: scrollTrackerDocumentInterface) => {
  const documentScrollingElement = document.documentElement;

  if (!documentScrollingElement) {
    throw new Error("No document.documentElement found.");
  }

  let timeout: any = null;

  const [containerHeight, setcontainerHeight] = useState(correctInnerHeight());
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

  const onResizeEvent = () => {
    setcontainerHeight(correctInnerHeight());
  };

  const scrollEvent = throttle(() => {
    onScroll();
  }, scrollThrottle);

  const resizeEvent = throttle(() => {
    onResizeEvent();
  }, resizeThrottle);

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    setcontainerHeight(correctInnerHeight());
    onResizeEvent();

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollEvent, { passive: true });

    onScroll();

    return () => {
      document.removeEventListener("scroll", scrollEvent);
    };
  }, [containerHeight]);

  return childrenAsMethod({
    scrollData: {
      scrollTop: documentScrollingElement.scrollTop,
      scrollHeight: documentScrollingElement.scrollHeight,
      containerHeight: containerHeight,
      percentProgress: percentProgress,
      element: documentScrollingElement,
    },
    children: children,
  });
};

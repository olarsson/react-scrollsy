/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

import { throttle, correctInnerHeight } from "./functions/utils";
import { childrenAsMethod } from "./functions/childrenAsMethod";
import { IScrollTrackerDocument } from "./types";
import { defaultConfig } from "./defaultConfig";

export const ScrollTrackerDocument = ({
  children,
  resizeThrottle = defaultConfig.resizeThrottle,
}: IScrollTrackerDocument) => {
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
    document.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      document.removeEventListener("scroll", onScroll);
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import { throttle, throttleLastCall, correctInnerHeight } from "./functions/utils";
import { childrenAsMethod } from "./functions/childrenAsMethod";
import { IScrollTrackerDocument } from "./types";
import { defaultConfig } from "./config";

export const ScrollTrackerDocument = ({ children, scrollThrottle, resizeThrottle = defaultConfig.resizeThrottle }: IScrollTrackerDocument) => {
  const documentScrollingElement: HTMLElement | undefined = document?.documentElement;

  if (!documentScrollingElement) {
    throw new Error("No document.documentElement found.");
  }

  if (typeof window === "undefined") {
    throw new Error("No window found.");
  }

  let timeout: any = null;

  const [containerHeight, setcontainerHeight] = useState<number>(correctInnerHeight());
  const [percentProgress, setPercentProgress] = useState<number>(0);

  const onScroll = (): void => {
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

  const onResizeEvent = (): void => {
    setcontainerHeight(correctInnerHeight());
  };

  const resizeEvent = throttle((): void => {
    onResizeEvent();
  }, resizeThrottle);

  const onScrollEvent = scrollThrottle
    ? throttleLastCall((): void => {
        onScroll();
      }, scrollThrottle)
    : (): void => {
        onScroll();
      };

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    setcontainerHeight(correctInnerHeight());
    onResizeEvent();

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", onScrollEvent, { passive: true });

    onScrollEvent();

    return () => {
      document.removeEventListener("scroll", onScrollEvent);
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

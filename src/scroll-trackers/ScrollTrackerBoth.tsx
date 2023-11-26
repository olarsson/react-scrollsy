import { useState, useEffect, useCallback } from "react";

import { throttle, throttleLastCall, getContainerClientHeight, correctInnerHeight } from "../functions/utils";
import { childrenAsMethod } from "../functions/childrenAsMethod";
import { IScrollTrackerCustomMain, TScrollingElement, TTimeout } from "../types";
import { defaultConfig } from "../config";
import { onScroll } from "../functions/onScroll";

export const ScrollTrackerBoth = ({
  children,
  customScrollingElement,
  scrollThrottle,
  resizeThrottle = defaultConfig.resizeThrottle,
}: IScrollTrackerCustomMain) => {
  // defines if the scroll tracking should be for an element (custom) or the document itself
  const customMode: boolean = !!customScrollingElement;

  const scrollElement: TScrollingElement = customMode ? customScrollingElement : document?.documentElement;

  if (!scrollElement) {
    throw new Error("No scrolling element found.");
  }

  if (typeof window === "undefined") {
    throw new Error("No window found.");
  }

  const timeout: TTimeout = null;

  const [containerHeight, setContainerHeight] = useState<number>(
    customMode ? getContainerClientHeight(scrollElement) : correctInnerHeight()
  );
  const [percentProgress, setPercentProgress] = useState<number>(0);

  const onResizeEvent = (): void => {
    setContainerHeight(customMode ? getContainerClientHeight(scrollElement) : correctInnerHeight());
  };

  const resizeEvent = throttle((): void => {
    onResizeEvent();
  }, resizeThrottle);

  const onScrollCached = useCallback(() => {
    onScroll({ timeout, setProgress: setPercentProgress, scrollElement: scrollElement, containerHeight });
  }, []);

  const onScrollEvent = scrollThrottle
    ? throttleLastCall((): void => {
        onScrollCached();
      }, scrollThrottle)
    : (): void => {
        onScrollCached();
      };

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    setContainerHeight(customMode ? getContainerClientHeight(scrollElement) : correctInnerHeight());
    onResizeEvent();

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  useEffect(() => {
    const elem = customMode ? scrollElement : document;

    elem.addEventListener("scroll", onScrollEvent, {
      passive: true,
    });

    onScrollEvent();

    return () => {
      elem.removeEventListener("scroll", onScrollEvent);
    };
  }, [containerHeight]);

  return childrenAsMethod({
    scrollData: {
      scrollTop: scrollElement.scrollTop,
      scrollHeight: scrollElement.scrollHeight,
      containerHeight: containerHeight,
      percentProgress: percentProgress,
      element: scrollElement,
    },
    children: children,
  });
};

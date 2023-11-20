import { useState, useEffect } from "react";

import { throttle, throttleLastCall, getContainerClientHeight, waitForElm } from "./functions/utils";
import { childrenAsMethod } from "./functions/childrenAsMethod";
import { IScrollTrackerCustom, IScrollTrackerCustomMain } from "./types";
import { defaultConfig } from "./config";

export const ScrollTrackerCustom = ({ children, scrollThrottle, scrollingElement, resizeThrottle }: IScrollTrackerCustom) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [customHtmlElement, setCustomHtmlElement] = useState<HTMLElement | undefined>(undefined);

  const returns = childrenAsMethod({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: customHtmlElement,
    },
    children: children,
  });

  waitForElm(scrollingElement).then((elem) => {
    if (!customHtmlElement) {
      setCustomHtmlElement(elem);
      setUpdate(true);
    }
  });

  if (update) {
    return (
      <ScrollTrackerCustomMain scrollThrottle={scrollThrottle} resizeThrottle={resizeThrottle} customScrollingElement={customHtmlElement}>
        {children}
      </ScrollTrackerCustomMain>
    );
  }

  return returns;
};

const ScrollTrackerCustomMain = ({
  children,
  customScrollingElement,
  scrollThrottle,
  resizeThrottle = defaultConfig.resizeThrottle,
}: IScrollTrackerCustomMain) => {
  const documentScrollingElement = customScrollingElement;

  if (!documentScrollingElement) {
    throw new Error("No custom scrolling element found.");
  }

  if (typeof window === "undefined") {
    throw new Error("No window found.");
  }

  let timeout: number | null = null;

  const [containerHeight, setContainerHeight] = useState<number>(getContainerClientHeight(documentScrollingElement));
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
    setContainerHeight(getContainerClientHeight(documentScrollingElement));
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
    setContainerHeight(getContainerClientHeight(documentScrollingElement));
    onResizeEvent();

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  useEffect(() => {
    documentScrollingElement.addEventListener("scroll", onScrollEvent, {
      passive: true,
    });

    onScrollEvent();

    return () => {
      documentScrollingElement.removeEventListener("scroll", onScrollEvent);
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

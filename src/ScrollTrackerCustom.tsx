/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import { throttle, getContainerClientHeight } from "./functions/utils";
import { childrenAsMethod } from "./functions/childrenAsMethod";
import { IScrollTrackerCustom, IScrollTrackerCustomMain } from "./types";
import { defaultConfig } from "./defaultConfig";

function waitForElm(selector: any) {
  return new Promise<HTMLElement>((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
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

export const ScrollTrackerCustom = ({
  children,
  scrollingElement,
  resizeThrottle = defaultConfig.resizeThrottle,
}: IScrollTrackerCustom) => {
  const [update, setUpdate] = useState(false);
  const [customHtmlElement, setCustomHtmlElement] = useState<HTMLElement | null>(null);

  const returns = childrenAsMethod({
    scrollData: {
      scrollTop: 0,
      scrollHeight: 0,
      containerHeight: 0,
      percentProgress: 0,
      element: document.documentElement,
    },
    children: children,
  });

  waitForElm(scrollingElement).then((elem) => {
    if (!customHtmlElement) {
      setCustomHtmlElement(elem);
      setUpdate(true);
    }
  });

  // console.log("ScrollTrackerCustom", customHtmlElement, update);

  if (update) {
    return (
      <ScrollTrackerCustomMain
        resizeThrottle={resizeThrottle}
        customScrollingElement={customHtmlElement}>
        {children}
      </ScrollTrackerCustomMain>
    );
  }

  return returns;
};

const ScrollTrackerCustomMain = ({
  children,
  customScrollingElement,
  resizeThrottle = defaultConfig.resizeThrottle,
}: IScrollTrackerCustomMain) => {
  const documentScrollingElement = customScrollingElement;

  if (!documentScrollingElement) {
    throw new Error("No custom scrolling element found.");
  }

  let timeout: number | null = null;

  // console.log(getContainerClientHeight(documentScrollingElement));
  

  const [containerHeight, setContainerHeight] = useState(
    getContainerClientHeight(documentScrollingElement)
  );
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
    setContainerHeight(getContainerClientHeight(documentScrollingElement));
  };

  const resizeEvent = throttle(() => {
    onResizeEvent();
  }, resizeThrottle);

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    setContainerHeight(getContainerClientHeight(documentScrollingElement));
    onResizeEvent();

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  useEffect(() => {
    documentScrollingElement.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      documentScrollingElement.removeEventListener("scroll", onScroll);
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

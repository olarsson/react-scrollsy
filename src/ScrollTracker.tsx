/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react";
import { elementVisibility } from "./functions/elementVisibility";
import { scrollObjectInterface, scrollTrackerInterface } from "./types";

const childrenAsMethod = (
  children: any,
  scrollObject: scrollObjectInterface = emptyScrollObject
) => {
  if (typeof children === "function") {
    return children({ scrollObject, children });
  }
  return children;
};

const emptyScrollObject: scrollObjectInterface = {
  progress: -1,
  scrollData: {
    containerHeight: 0,
    element: undefined,
    percentProgress: 0,
    scrollHeight: 0,
    scrollTop: 0,
  },
  start: 0,
  end: 0,
};

export const ScrollTracker = memo(
  ({
    scrollData,
    children,
    elem,
    settings,
    onStart,
    onEnd,
  }: scrollTrackerInterface) => {
    const { offsetTop, offsetBottom, duration } = settings;

    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
      if (isStarted) {
        typeof onStart === "function" && onStart();
      }
    }, [isStarted]);

    useEffect(() => {
      if (isEnded) {
        typeof onEnd === "function" && onEnd();
      }
    }, [isEnded]);

    if (!elem?.current) return childrenAsMethod(children, emptyScrollObject);

    const scrollObject = elementVisibility(
      elem.current,
      scrollData,
      offsetTop,
      offsetBottom,
      duration
      // onStart,
      // onEnd
    );

    const { progress } = scrollObject;

    if (
      progress > 0 &&
      progress < 1 &&
      isStarted === false &&
      typeof onStart === "function"
    ) {
      setIsStarted(true);
    }

    if (progress <= 0 && isStarted === true && typeof onStart === "function") {
      setIsStarted(false);
    }

    if (progress >= 1 && isEnded === false && typeof onEnd === "function") {
      setIsEnded(true);
    }

    if (progress < 1 && isEnded === true && typeof onEnd === "function") {
      setIsEnded(false);
    }

    // console.log(scrollObject);

    return childrenAsMethod(children, scrollObject);
  }
);

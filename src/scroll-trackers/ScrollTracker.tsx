import { memo, useEffect, useState } from "react";
import { elementVisibility } from "../functions/elementVisibility";
import { IScrollTrackerObject, IScrollTracker, TChildren } from "../types";
import { defaultConfig, emptyScrollObject } from "../config";

const childrenAsMethod = (children: TChildren, scrollObject: IScrollTrackerObject = emptyScrollObject) => {
  if (typeof children === "function") {
    if (!children) return children;
    return children({ scrollObject, children });
  }
  return children;
};

export const ScrollTracker = memo(({ scrollData, children, elem, settings, onStart, onEnd }: IScrollTracker) => {
  const { trigger = defaultConfig.trigger, offsetTop, offsetBottom, duration } = settings;

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [elemIsReady, setElemIsReady] = useState<boolean>(false);

  useEffect(() => {
    isStarted && typeof onStart === "function" && onStart();
  }, [isStarted]);

  useEffect(() => {
    isEnded && typeof onEnd === "function" && onEnd();
  }, [isEnded]);

  useEffect(() => {
    elem?.current && setElemIsReady(true);
  }, [elem]);

  if (!elemIsReady) return childrenAsMethod(children, emptyScrollObject);

  const scrollObject = elementVisibility(elem!.current!, scrollData, trigger, offsetTop, offsetBottom, duration);

  const { progress } = scrollObject;

  if (progress > 0 && progress < 1 && isStarted === false && typeof onStart === "function") {
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

  return childrenAsMethod(children, scrollObject);
});

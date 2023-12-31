import { memo, useEffect, useState } from 'react';
import { elementVisibility } from '../functions/elementVisibility';
import type { ScrollTrackerProps, ScrollObjectChildren } from '../types';
import { defaultConfig, emptyScrollObject } from '../config';

const childrenAsObjectMethod = ({ children, scrollObject = emptyScrollObject }: ScrollObjectChildren) =>
  typeof children === 'function' ? children({ scrollObject, children }) : children;

export const ScrollTracker = memo(({ scrollData, children, elem, settings, onStart, onEnd }: ScrollTrackerProps) => {
  const { trigger = defaultConfig.trigger, offsetTop, offsetBottom, duration } = settings;

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [elemIsReady, setElemIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isStarted && onStart) onStart();
  }, [isStarted]);

  useEffect(() => {
    if (isEnded && onEnd) onEnd();
  }, [isEnded]);

  useEffect(() => {
    elem?.current && setElemIsReady(true);
  }, [elem]);

  if (!elemIsReady) return childrenAsObjectMethod({ scrollObject: emptyScrollObject, children });

  const scrollObject = elementVisibility({ el: elem!.current!, scrollData, trigger, offsetTop, offsetBottom, duration });

  const { progress } = scrollObject;

  if (progress > 0 && progress < 1 && isStarted === false && typeof onStart === 'function') {
    setIsStarted(true);
  }

  if (progress <= 0 && isStarted === true && typeof onStart === 'function') {
    setIsStarted(false);
  }

  if (progress >= 1 && isEnded === false && typeof onEnd === 'function') {
    setIsEnded(true);
  }

  if (progress < 1 && isEnded === true && typeof onEnd === 'function') {
    setIsEnded(false);
  }

  return childrenAsObjectMethod({ scrollObject, children });
});

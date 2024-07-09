import { useEffect, useState } from 'react';
import { waitForElm } from '../functions/utils';
import { childrenAsMethod } from '../functions/childrenAsMethod';
import type { ScrollTrackerCustomProps } from '../types';
import { ScrollTrackerBoth } from './ScrollTrackerBoth';

export const ScrollTrackerCustom = ({ children, scrollThrottle, resizeThrottle, scrollingElement }: ScrollTrackerCustomProps) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [customHtmlElement, setCustomHtmlElement] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    if (typeof scrollingElement === 'string') {
      waitForElm(scrollingElement).then((elem) => {
        if (!customHtmlElement) {
          setCustomHtmlElement(elem);
          setUpdate(true);
        }
      });
    } else {
      if (scrollingElement?.current && !customHtmlElement) {
        setCustomHtmlElement(scrollingElement.current);
        setUpdate(true);
      }
    }
  }, [scrollingElement]);

  return update ? (
    <ScrollTrackerBoth scrollThrottle={scrollThrottle} resizeThrottle={resizeThrottle} customScrollingElement={customHtmlElement}>
      {children}
    </ScrollTrackerBoth>
  ) : (
    childrenAsMethod({
      scrollData: {
        scrollTop: 0,
        scrollHeight: 0,
        containerHeight: 0,
        percentProgress: 0,
        element: customHtmlElement
      },
      children: children
    })
  );
};

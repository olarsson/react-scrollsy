import { useState } from "react";

import { waitForElm } from "../functions/utils";
import { childrenAsMethod } from "../functions/childrenAsMethod";
import { IScrollTrackerCustom } from "../types";
import { ScrollTrackerBoth } from "./ScrollTrackerBoth";

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
      <ScrollTrackerBoth scrollThrottle={scrollThrottle} resizeThrottle={resizeThrottle} customScrollingElement={customHtmlElement}>
        {children}
      </ScrollTrackerBoth>
    );
  }

  return returns;
};

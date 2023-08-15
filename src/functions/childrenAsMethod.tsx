import { IScrollDataChildren } from "../types";

export const childrenAsMethod = ({ scrollData, children }: IScrollDataChildren) => {
  if (typeof children === "function") {
    return children({
      scrollData: {
        scrollTop: scrollData.scrollTop,
        scrollHeight: scrollData.scrollHeight,
        containerHeight: scrollData.containerHeight,
        percentProgress: scrollData.percentProgress,
        element: scrollData.element,
      },
      children: children,
    });
  }
  return children;
};

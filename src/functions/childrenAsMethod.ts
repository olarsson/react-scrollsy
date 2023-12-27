import type { ScrollDataChildren } from '../types';

export const childrenAsMethod = ({ scrollData, children }: ScrollDataChildren) =>
  typeof children === 'function'
    ? children({
        scrollData: {
          scrollTop: scrollData.scrollTop,
          scrollHeight: scrollData.scrollHeight,
          containerHeight: scrollData.containerHeight,
          percentProgress: scrollData.percentProgress,
          element: scrollData.element
        },
        children: children
      })
    : children;

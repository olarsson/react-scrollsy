import type { ScrollDataBase, ScrollTrackerSettingsProperties } from '../types';
import { elOffsetTopRelativeToContainer } from './utils';

interface CalcOffset {
  mode: string;
  scrollData: ScrollDataBase;
  elementScrollHeight: number;
  offsetTop?: ScrollTrackerSettingsProperties;
  offsetBottom?: ScrollTrackerSettingsProperties;
}

interface CalcDurationInPx {
  heightDuration: number;
  duration: ScrollTrackerSettingsProperties;
}

interface CalcHeightDurationAndElementOffset {
  duration: ScrollTrackerSettingsProperties;
  elementScrollHeight: number;
  elementOffsetTopRelativeToContainer: number;
  trigger: string;
  scrollData: ScrollDataBase;
}

interface CalcElementVisibilityReturn {
  elementOffset: number;
  offsetTopVal: number;
  durationInPx: number;
  offsetBottomVal: number;
  scrollData: ScrollDataBase;
}

interface ElementVisibility {
  el: HTMLElement;
  scrollData: ScrollDataBase;
  trigger: string;
  offsetTop?: ScrollTrackerSettingsProperties;
  offsetBottom?: ScrollTrackerSettingsProperties;
  duration: ScrollTrackerSettingsProperties;
}

export const calcOffset = ({ mode, scrollData, elementScrollHeight, offsetTop, offsetBottom }: CalcOffset) => {
  switch (mode) {
    case 'top':
      if (!offsetTop) return 0;

      if (offsetTop.unit === 'px') {
        return offsetTop.distance;
      } else if (offsetTop.unit === '%') {
        switch (offsetTop.basedOn) {
          case 'doc':
            return scrollData.scrollHeight * (offsetTop.distance / 100);
            break;
          case 'vp':
            return scrollData.containerHeight * (offsetTop.distance / 100);
            break;
          case 'elem':
            return elementScrollHeight * (offsetTop.distance / 100);
            break;
        }
      }

      break;

    case 'bottom':
      if (!offsetBottom) return 0;

      if (offsetBottom.unit === 'px') {
        return offsetBottom.distance;
      } else if (offsetBottom.unit === '%') {
        switch (offsetBottom.basedOn) {
          case 'doc':
            return scrollData.scrollHeight * (offsetBottom.distance / 100);
            break;
          case 'vp':
            return scrollData.containerHeight * (offsetBottom.distance / 100);
            break;
          case 'elem':
            return elementScrollHeight * (offsetBottom.distance / 100);
            break;
        }
      }
      break;

    default:
      return 0;
      break;
  }

  return 0;
};

export const calcDurationInPx = ({ heightDuration, duration }: CalcDurationInPx) => {
  if (duration.unit === 'px') return duration.distance;
  if (duration.unit === '%') {
    switch (duration.basedOn) {
      case 'doc':
      case 'vp':
      case 'elem':
        return heightDuration * (duration.distance / 100);
        break;
    }
  }

  return 0;
};

export const calcHeightDurationAndElementOffset = ({
  duration,
  elementScrollHeight,
  elementOffsetTopRelativeToContainer,
  trigger,
  scrollData
}: CalcHeightDurationAndElementOffset) => {
  let heightDuration: number = 0;
  let elementOffset: number = 0;

  switch (duration.basedOn) {
    case 'doc':
      heightDuration = scrollData.scrollHeight - scrollData.containerHeight;
      break;
    case 'vp':
      heightDuration = scrollData.containerHeight;
      elementOffset = elementOffsetTopRelativeToContainer;

      if (trigger === 'onEnter') {
        elementOffset -= scrollData.containerHeight;
      }

      break;
    case 'elem':
      elementOffset = elementOffsetTopRelativeToContainer;

      if (trigger === 'onEnter') {
        heightDuration = elementScrollHeight;
        elementOffset -= scrollData.containerHeight;
      } else if (trigger === 'onLeave') {
        heightDuration = elementScrollHeight;
      }
      break;
  }

  return {
    heightDuration,
    elementOffset
  };
};

export const calcElementVisibilityReturn = ({
  elementOffset,
  offsetTopVal,
  durationInPx,
  offsetBottomVal,
  scrollData
}: CalcElementVisibilityReturn) => {
  const start: number = elementOffset + offsetTopVal;
  const end: number = elementOffset + durationInPx - offsetBottomVal;
  const visibleFromBottom: number = (scrollData.scrollTop - start) / (end - start);
  const progress: number = Math.min(Math.max(visibleFromBottom, 0), 1);

  return {
    progress,
    start,
    end
  };
};

export const elementVisibility = function ({ el, scrollData, trigger, offsetTop, offsetBottom, duration }: ElementVisibility) {
  const elementOffsetTopRelativeToContainer = elOffsetTopRelativeToContainer(el, scrollData.element);
  const { scrollHeight: elementScrollHeight } = el;

  const { heightDuration, elementOffset } = calcHeightDurationAndElementOffset({
    duration,
    elementScrollHeight,
    elementOffsetTopRelativeToContainer,
    trigger,
    scrollData
  });

  const offsetTopVal: number = calcOffset({ mode: 'top', scrollData, elementScrollHeight, offsetTop });

  const offsetBottomVal: number = calcOffset({ mode: 'bottom', scrollData, elementScrollHeight, offsetBottom });

  const durationInPx: number = calcDurationInPx({ heightDuration, duration });

  const { progress, start, end } = calcElementVisibilityReturn({ elementOffset, offsetTopVal, durationInPx, offsetBottomVal, scrollData });

  return {
    progress,
    scrollData,
    start,
    end
  };
};

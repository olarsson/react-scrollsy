/* eslint-disable @typescript-eslint/no-explicit-any */
import { IScrollDataBase, IScrollTrackerSettingsProperties } from '../types';
import { elOffsetTopRelativeToContainer } from './utils';

const elementVisibility = function (el: HTMLElement, scrollData: IScrollDataBase, trigger: string, offsetTop: IScrollTrackerSettingsProperties | undefined, offsetBottom: IScrollTrackerSettingsProperties | undefined, duration: IScrollTrackerSettingsProperties) {
  let heightDuration: number = 0;
  let elOffset: number = 0;
  let offsetTopVal: number = 0;
  let offsetBottomVal: number = 0;
  let durationInPx: number = 0;

  switch (duration.basedOn) {
    case 'doc':
      heightDuration = scrollData.scrollHeight - scrollData.containerHeight;
      break;
    case 'vp':
      heightDuration = scrollData.containerHeight;
      elOffset = elOffsetTopRelativeToContainer(el, scrollData.element);

      if (trigger === 'onEnter') {
        elOffset -= scrollData.containerHeight;
      }

      break;
    case 'elem':
      elOffset = elOffsetTopRelativeToContainer(el, scrollData.element)

      if (trigger === 'onEnter') {
        heightDuration = el.scrollHeight;
        elOffset -= scrollData.containerHeight;
      } else if (trigger === 'onLeave') {
        heightDuration = el.scrollHeight;
      }
      break;
  }

  if (offsetTop) {
    if (offsetTop.unit === 'px') {
      offsetTopVal = offsetTop.distance;
    } else if (offsetTop.unit === '%') {
      switch (offsetTop.basedOn) {
        case 'doc':
          offsetTopVal = scrollData.scrollHeight * (offsetTop.distance / 100);
          break;
        case 'vp':
          offsetTopVal = scrollData.containerHeight * (offsetTop.distance / 100);
          break;
        case 'elem':
          offsetTopVal = el.scrollHeight * (offsetTop.distance / 100);
          break;
      }
    }
  }

  if (offsetBottom) {
    if (offsetBottom.unit === 'px') {
      offsetBottomVal = offsetBottom.distance;
    } else if (offsetBottom.unit === '%') {
      switch (offsetBottom.basedOn) {
        case 'doc':
          offsetBottomVal = scrollData.scrollHeight * (offsetBottom.distance / 100);
          break;
        case 'vp':
          offsetBottomVal = scrollData.containerHeight * (offsetBottom.distance / 100);
          break;
        case 'elem':
          offsetTopVal = el.scrollHeight * (offsetBottom.distance / 100);
          break;
      }
    }
  }

  if (duration.unit === 'px') durationInPx = duration.distance;
  if (duration.unit === '%') {
    switch (duration.basedOn) {
      case 'doc':
        durationInPx = heightDuration * (duration.distance / 100);
        break;
      case 'vp':
        durationInPx = heightDuration * (duration.distance / 100);
        break;
      case 'elem':
        durationInPx = heightDuration * (duration.distance / 100);
        break;
    }
  }

  const start: number = elOffset + offsetTopVal;
  const end: number = elOffset + durationInPx - offsetBottomVal;
  const visibleFromBottom: number = (scrollData.scrollTop - start) / (end - start);
  const progress: number = Math.min(Math.max(visibleFromBottom, 0), 1);

  return {
    progress,
    scrollData,
    start,
    end
  };
};

export { elementVisibility };

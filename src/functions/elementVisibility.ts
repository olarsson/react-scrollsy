/* eslint-disable @typescript-eslint/no-explicit-any */
import { IScrollDataBase, IScrollTrackerSettingsProperties } from '../types';
import { elOffsetTopRelativeToContainer } from './utils';

const elementVisibility = function (el: HTMLElement, scrollData: IScrollDataBase, offsetTop: IScrollTrackerSettingsProperties | undefined, offsetBottom: IScrollTrackerSettingsProperties | undefined, duration: IScrollTrackerSettingsProperties) {
  let heightDuration = 0;
  let elOffset = 0;

  switch (duration.basedOn) {
    case 'doc':
      // fixed + relative duration
      heightDuration = scrollData.scrollHeight - scrollData.containerHeight;
      break;
    case 'vp':
      // fixed duration
      // heightDuration = scrollData.containerHeight;

      // absolute + relative duration
      heightDuration = scrollData.containerHeight;
      elOffset = elOffsetTopRelativeToContainer(el, scrollData.element) - scrollData.containerHeight;
      break;
    case 'elem':
      // relative duration
      heightDuration = el.getBoundingClientRect().bottom; // - scrollData.containerHeight - elOffsetTopRelativeToContainer(el, scrollData.element);
      elOffset = elOffsetTopRelativeToContainer(el, scrollData.element) - scrollData.containerHeight;
      break;
  }

  let offsetTopVal = 0;
  let offsetBottomVal = 0;

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

  let durationInPx = 0;
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
        durationInPx = el.scrollHeight * (duration.distance / 100);
        break;
    }
  }

  const start = elOffset + offsetTopVal;
  const end = elOffset + durationInPx - offsetBottomVal;
  const visibleFromBottom = (scrollData.scrollTop - start) / (end - start);
  const progress = Math.min(Math.max(visibleFromBottom, 0), 1);

  return {
    progress,
    scrollData,
    start,
    end
  };
};

export { elementVisibility };

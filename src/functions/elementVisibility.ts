/* eslint-disable @typescript-eslint/no-explicit-any */
import { scrollDataBaseInterface, scrollTrackerSettingsPropertiesInterface } from '../types';
import { elOffsetTopRelativeToContainer } from './utils';

// let isStarted = false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const elementVisibility = function (el: HTMLElement, scrollData: scrollDataBaseInterface, offsetTop: scrollTrackerSettingsPropertiesInterface | undefined, offsetBottom: scrollTrackerSettingsPropertiesInterface | undefined, duration: scrollTrackerSettingsPropertiesInterface) {
  // const elementVisibility = function (el: HTMLElement, scrollData: scrollDataBaseInterface, offsetTop: scrollTrackerSettingsPropertiesInterface | undefined, offsetBottom: scrollTrackerSettingsPropertiesInterface | undefined, duration: scrollTrackerSettingsPropertiesInterface, onStart: any | undefined, onEnd: any | undefined) {
  let heightDuration = 0;
  let elOffset = 0;

  // const self = elementVisibility;

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

  // console.log(self.isStarted, progress);

  // if (!self.isStarted && self.isEnded && progress > 0 && progress < 1 && typeof onStart === 'function') {
  //   self.isStarted = true;
  //   self.isEnded = false;
  //   onStart();
  //   // console.log(onStart);
  // }

  // if (self.isStarted && !self.isEnded && progress >= 1 && typeof onEnd === 'function') {
  //   // self.isStarted = true;
  //   // self.isEnded = true;
  //   self.isStarted = false;
  //   onEnd();
  //   // console.log(onEnd);
  // }

  // if (progress >= 1 && self.isEnded === false && typeof onEnd === 'function') {
  //   self.isEnded = true;
  //   onEnd(progress);
  // }

  // if (progress > 0 && progress < 1 && self.isStarted === false && typeof onStart === 'function') {
  //   self.isStarted = true;
  //   onStart(progress);
  // }

  // if (progress <= 0) {
  //   self.isStarted = false;
  // }

  // if (progress < 1) {
  //   self.isEnded === false;
  // }

  // if (!self.isEnded && progress >= 1 && typeof onEnd === 'function') {
  //   self.isEnded = true;
  //   self.isStarted = false;
  //   console.log(onEnd);
  // }

  // console.log({
  //   // progress: Math.min(Math.max(visibleFromBottom, 0), 1),
  //   // offsetTopVal,
  //   duration,
  //   scrollData,
  //   heightDuration,
  //   elOffset,
  //   start,
  //   end
  // });
  return {
    progress,
    scrollData,
    start,
    // onStart,
    end
  };
};

// elementVisibility.isStarted = false;
// elementVisibility.isEnded = true;

export { elementVisibility };

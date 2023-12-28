import type { ScrollTrackerObject } from './types';

export const defaultConfig = {
  resizeThrottle: 150,
  trigger: 'onEnter'
};

export const emptyScrollObject: ScrollTrackerObject = {
  progress: 0,
  scrollData: {
    containerHeight: 0,
    percentProgress: 0,
    scrollHeight: 0,
    scrollTop: 0
  },
  start: 0,
  end: 0
};

import { IScrollTrackerObject } from "./types";

export const defaultConfig = {
  resizeThrottle: 150,
  // scrollThrottle: 200
}

export const emptyScrollObject: IScrollTrackerObject = {
  progress: 0,
  scrollData: {
    containerHeight: 0,
    element: undefined,
    percentProgress: 0,
    scrollHeight: 0,
    scrollTop: 0,
  },
  start: 0,
  end: 0,
};
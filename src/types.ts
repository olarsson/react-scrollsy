type TThrottles = {
  resizeThrottle?: number;
  scrollThrottle?: number;
}

type TScrollObject = {
  progress: number;
  scrollData: IScrollDataBase;
  start: number;
  end: number;
}

export type TTimeout = number | null;

export type TScrollingElement = HTMLElement | null | undefined;

export type TChildren = ((props: IScrollDataChildren | IScrollObject) => unknown)
  | {
    children: React.ReactNode
  } | unknown

export interface IScrollDataBase {
  scrollTop: number;
  scrollHeight: number;
  containerHeight: number;
  percentProgress: number;
  element?: HTMLElement | undefined;
}

export interface IScrollData {
  scrollData: IScrollDataBase;
}

export interface IScrollDataChildren {
  scrollData: IScrollDataBase;
  children: TChildren;
}

export interface IScrollObject {
  scrollObject: TScrollObject;
  children: TChildren;
}

export interface IScrollTrackerObject extends TScrollObject { }

export interface IScrollTrackerSettingsProperties {
  distance: number;
  unit: 'px' | '%';
  basedOn: '' | 'doc' | 'elem' | 'vp';
}

export interface IScrollTrackerSettings {
  trigger?: 'onEnter' | 'onLeave';
  offsetTop?: IScrollTrackerSettingsProperties;
  offsetBottom?: IScrollTrackerSettingsProperties;
  duration: IScrollTrackerSettingsProperties;
}

export interface IScrollTrackerSettingsArray extends Array<IScrollTrackerSettings> { }

export interface IScrollTracker {
  scrollData: IScrollDataBase;
  children: TChildren;
  elem?: React.RefObject<HTMLInputElement>;
  settings: IScrollTrackerSettings;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface IScrollTrackerDocument extends TThrottles {
  children: TChildren;
}

export interface IScrollTrackerCustom extends TThrottles {
  scrollingElement?: string;
  children: TChildren;
}

export interface IScrollTrackerCustomMain extends TThrottles {
  customScrollingElement?: HTMLElement | null;
  children: TChildren;
}

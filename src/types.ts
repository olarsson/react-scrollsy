type Throttles = {
  resizeThrottle?: number;
  scrollThrottle?: number;
};

type ScrollObjectProperties = {
  progress: number;
  scrollData: ScrollDataBase;
  start: number;
  end: number;
};

export type Timeout = number | null;

export type ScrollingElement = HTMLElement | null | undefined;

export type Children =
  | ((props: ScrollDataChildren | ScrollObject) => React.ReactNode)
  | {
      children: React.ReactNode;
    }
  | unknown;

export interface ScrollDataBase {
  scrollTop: number;
  scrollHeight: number;
  containerHeight: number;
  percentProgress: number;
  element?: HTMLElement;
}

export interface ScrollData {
  scrollData: ScrollDataBase;
}

export interface ScrollDataChildren {
  scrollData: ScrollDataBase;
  children: Children;
}

export interface ScrollObject {
  scrollObject: ScrollObjectProperties;
  children: Children;
}

export interface ScrollTrackerObject extends ScrollObjectProperties {}

export interface ScrollTrackerSettingsProperties {
  distance: number;
  unit: 'px' | '%';
  basedOn: '' | 'doc' | 'elem' | 'vp';
}

export interface ScrollTrackerSettings {
  trigger?: 'onEnter' | 'onLeave';
  offsetTop?: ScrollTrackerSettingsProperties;
  offsetBottom?: ScrollTrackerSettingsProperties;
  duration: ScrollTrackerSettingsProperties;
}

export interface ScrollTrackerProps {
  scrollData: ScrollDataBase;
  children: Children;
  elem?: React.RefObject<HTMLInputElement>;
  settings: ScrollTrackerSettings;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface ScrollTrackerDocumentProps extends Throttles {
  children: Children;
}

export interface ScrollTrackerCustomProps extends Throttles {
  scrollingElement?: string;
  children: Children;
}

export interface ScrollTrackerCustomMainProps extends Throttles {
  customScrollingElement?: HTMLElement | null;
  children: Children;
}

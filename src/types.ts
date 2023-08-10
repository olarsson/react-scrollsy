/* eslint-disable @typescript-eslint/no-explicit-any */
export interface scrollDataBaseInterface {
  scrollTop: number;
  scrollHeight: number;
  containerHeight: number;
  percentProgress: number;
  element?: HTMLElement | undefined;
}
export interface scrollDataDocumentInterface {
  scrollData: scrollDataBaseInterface;
}

export interface scrollDataInterface {
  scrollData: scrollDataBaseInterface;
  children: any;
}

export interface scrollObjectWithObjectInterface {
  scrollObject: {
    progress: number;
    scrollData: scrollDataBaseInterface;
    start: number;
    end: number;
  };
  children: any;
}

export interface scrollObjectInterface {
  progress: number;
  scrollData: scrollDataBaseInterface;
  start: number;
  end: number;
}

export interface scrollTrackerSettingsPropertiesInterface {
  distance: number;
  unit: 'px' | '%';
  basedOn: '' | 'doc' | 'elem' | 'vp';
}

export interface scrollTrackerSettingsInterface {
  offsetTop?: scrollTrackerSettingsPropertiesInterface;
  offsetBottom?: scrollTrackerSettingsPropertiesInterface;
  duration: scrollTrackerSettingsPropertiesInterface;
}

export interface scrollTrackerSettingsArrayInterface extends Array<scrollTrackerSettingsInterface> { }

export interface scrollTrackerInterface {
  scrollData: scrollDataBaseInterface;
  children: React.ReactNode | any;
  elem?: React.RefObject<HTMLInputElement>; // always a ref
  settings: scrollTrackerSettingsInterface;
  onStart?: any;
  onEnd?: any;
}

export interface scrollTrackerDocumentInterface {
  scrollThrottle: number;
  resizeThrottle: number;
  customScrollingElement?: HTMLElement | undefined;
  children: any;
}

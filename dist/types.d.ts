/// <reference types="react" />
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
    children: any;
}
export interface IScrollObject {
    scrollObject: {
        progress: number;
        scrollData: IScrollDataBase;
        start: number;
        end: number;
    };
    children: any;
}
export interface IScrollTrackerObject {
    progress: number;
    scrollData: IScrollDataBase;
    start: number;
    end: number;
}
export interface IScrollTrackerSettingsProperties {
    distance: number;
    unit: 'px' | '%';
    basedOn: '' | 'doc' | 'elem' | 'vp';
}
export interface IScrollTrackerSettings {
    offsetTop?: IScrollTrackerSettingsProperties;
    offsetBottom?: IScrollTrackerSettingsProperties;
    duration: IScrollTrackerSettingsProperties;
}
export interface IScrollTrackerSettingsArray extends Array<IScrollTrackerSettings> {
}
export interface IScrollTracker {
    scrollData: IScrollDataBase;
    children: React.ReactNode | any;
    elem?: React.RefObject<HTMLInputElement>;
    settings: IScrollTrackerSettings;
    onStart?: any;
    onEnd?: any;
}
export interface IScrollTrackerDocument {
    resizeThrottle?: number;
    scrollThrottle?: number;
    children: any;
}
export interface IScrollTrackerCustom {
    resizeThrottle?: number;
    scrollThrottle?: number;
    scrollingElement?: string;
    children: any;
}
export interface IScrollTrackerCustomMain {
    resizeThrottle?: number;
    scrollThrottle?: number;
    customScrollingElement?: HTMLElement | null;
    children: any;
}

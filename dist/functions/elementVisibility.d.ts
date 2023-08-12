import { IScrollDataBase, IScrollTrackerSettingsProperties } from '../types';
declare const elementVisibility: (el: HTMLElement, scrollData: IScrollDataBase, offsetTop: IScrollTrackerSettingsProperties | undefined, offsetBottom: IScrollTrackerSettingsProperties | undefined, duration: IScrollTrackerSettingsProperties) => {
    progress: number;
    scrollData: IScrollDataBase;
    start: number;
    end: number;
};
export { elementVisibility };

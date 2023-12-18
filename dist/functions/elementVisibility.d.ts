import { IScrollDataBase, IScrollTrackerSettingsProperties } from '../types';
export declare const calcOffset: ({ mode, scrollData, elementScrollHeight, offsetTop, offsetBottom }: {
    mode: string;
    scrollData: IScrollDataBase;
    elementScrollHeight: number;
    offsetTop?: IScrollTrackerSettingsProperties | undefined;
    offsetBottom?: IScrollTrackerSettingsProperties | undefined;
}) => number;
export declare const calcDurationInPx: ({ heightDuration, duration }: {
    heightDuration: number;
    duration: IScrollTrackerSettingsProperties;
}) => number;
export declare const calcHeightDurationAndElementOffset: ({ duration, elementScrollHeight, elementOffsetTopRelativeToContainer, trigger, scrollData }: {
    duration: IScrollTrackerSettingsProperties;
    elementScrollHeight: number;
    elementOffsetTopRelativeToContainer: number;
    trigger: string;
    scrollData: IScrollDataBase;
}) => {
    heightDuration: number;
    elementOffset: number;
};
export declare const calcElementVisibilityReturn: ({ elementOffset, offsetTopVal, durationInPx, offsetBottomVal, scrollData }: {
    elementOffset: number;
    offsetTopVal: number;
    durationInPx: number;
    offsetBottomVal: number;
    scrollData: IScrollDataBase;
}) => {
    progress: number;
    start: number;
    end: number;
};
declare const elementVisibility: (el: HTMLElement, scrollData: IScrollDataBase, trigger: string, offsetTop: IScrollTrackerSettingsProperties | undefined, offsetBottom: IScrollTrackerSettingsProperties | undefined, duration: IScrollTrackerSettingsProperties) => {
    progress: number;
    scrollData: IScrollDataBase;
    start: number;
    end: number;
};
export { elementVisibility };

import type { ScrollDataBase, ScrollTrackerSettingsProperties } from '../types';
interface CalcOffset {
    mode: string;
    scrollData: ScrollDataBase;
    elementScrollHeight: number;
    offsetTop?: ScrollTrackerSettingsProperties;
    offsetBottom?: ScrollTrackerSettingsProperties;
}
interface CalcDurationInPx {
    heightDuration: number;
    duration: ScrollTrackerSettingsProperties;
}
interface CalcHeightDurationAndElementOffset {
    duration: ScrollTrackerSettingsProperties;
    elementScrollHeight: number;
    elementOffsetTopRelativeToContainer: number;
    trigger: string;
    scrollData: ScrollDataBase;
}
interface CalcElementVisibilityReturn {
    elementOffset: number;
    offsetTopVal: number;
    durationInPx: number;
    offsetBottomVal: number;
    scrollData: ScrollDataBase;
}
interface ElementVisibility {
    el: HTMLElement;
    scrollData: ScrollDataBase;
    trigger: string;
    offsetTop?: ScrollTrackerSettingsProperties;
    offsetBottom?: ScrollTrackerSettingsProperties;
    duration: ScrollTrackerSettingsProperties;
}
export declare const calcOffset: ({ mode, scrollData, elementScrollHeight, offsetTop, offsetBottom }: CalcOffset) => number;
export declare const calcDurationInPx: ({ heightDuration, duration }: CalcDurationInPx) => number;
export declare const calcHeightDurationAndElementOffset: ({ duration, elementScrollHeight, elementOffsetTopRelativeToContainer, trigger, scrollData }: CalcHeightDurationAndElementOffset) => {
    heightDuration: number;
    elementOffset: number;
};
export declare const calcElementVisibilityReturn: ({ elementOffset, offsetTopVal, durationInPx, offsetBottomVal, scrollData }: CalcElementVisibilityReturn) => {
    progress: number;
    start: number;
    end: number;
};
export declare const elementVisibility: ({ el, scrollData, trigger, offsetTop, offsetBottom, duration }: ElementVisibility) => {
    progress: number;
    scrollData: ScrollDataBase;
    start: number;
    end: number;
};
export {};

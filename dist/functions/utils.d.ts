export { throttle } from 'throttle-typescript';
declare global {
    interface Window {
        MSStream: any;
    }
}
export declare const windowHeight: () => number;
export declare const getContainerClientHeight: (elem: HTMLElement) => number;
export declare function waitForElm(selector: any): Promise<HTMLElement>;
export declare const elOffsetTopRelativeToContainer: (el: HTMLElement | undefined, container: HTMLElement | undefined) => number;
export declare const isIOS: () => boolean;
export declare const correctInnerHeight: () => number;

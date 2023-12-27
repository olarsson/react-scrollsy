export { throttle } from 'throttle-typescript';
declare global {
    interface Window {
        MSStream: any;
    }
}
export declare const throttleLastCall: <T extends (...args: any[]) => void>(func: T, limit: number) => T;
export declare const windowHeight: () => number;
export declare const getContainerClientHeight: (elem: HTMLElement) => number;
export declare function waitForElm(selector: any): Promise<HTMLElement>;
export declare const elOffsetTopRelativeToContainer: (el?: HTMLElement, container?: HTMLElement) => number;
export declare const isIOS: () => boolean;
export declare const correctInnerHeight: () => number;

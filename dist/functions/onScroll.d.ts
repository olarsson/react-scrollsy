import type { Dispatch } from 'react';
import type { ScrollingElement, Timeout } from '../types';
interface OnScroll {
    timeout: Timeout;
    setProgress: Dispatch<number>;
    scrollElement?: ScrollingElement;
    containerHeight: number;
}
export declare const onScroll: ({ timeout, setProgress, scrollElement, containerHeight }: OnScroll) => void;
export {};

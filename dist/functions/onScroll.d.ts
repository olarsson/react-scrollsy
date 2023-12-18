import { Dispatch } from 'react';
import { TScrollingElement, TTimeout } from '../types';
export declare const onScroll: ({ timeout, setProgress, scrollElement, containerHeight }: {
    timeout: TTimeout;
    setProgress: Dispatch<number>;
    scrollElement: TScrollingElement;
    containerHeight: number;
}) => void;

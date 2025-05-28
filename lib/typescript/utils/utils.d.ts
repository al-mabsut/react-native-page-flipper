import type { Page } from '../types';
import type { TransformsStyle } from 'react-native';
export declare const createPages: ({ portrait, singleImageMode, data, }: {
    portrait: boolean;
    singleImageMode: boolean;
    data: string[];
}) => Page[];
type RNTransform = Exclude<TransformsStyle['transform'], undefined>;
export declare const transformOrigin: ({ x, y }: {
    x: number;
    y: number;
}, transformations: RNTransform) => RNTransform;
export declare const debugValue: (msg: string, val: any) => void;
export declare const snapPoint: (value: number, velocity: number, points: ReadonlyArray<number>) => number;
export declare function clamp(number: number, min: number, max: number): number;
export {};
//# sourceMappingURL=utils.d.ts.map
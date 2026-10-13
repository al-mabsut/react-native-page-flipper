import React from 'react';
import { type SharedValue } from 'react-native-reanimated';
import type { Size } from '../types';
type PageShadowProps = {
    degrees: SharedValue<number>;
    viewHeight: number;
    right: boolean;
    containerSize: Size;
};
declare const PageShadow: React.FC<PageShadowProps>;
export default PageShadow;
//# sourceMappingURL=PageShadow.d.ts.map
import React from 'react';
import Animated from 'react-native-reanimated';
import type { Size } from '../types';
type PageShadowProps = {
    degrees: Animated.SharedValue<number>;
    viewHeight: number;
    right: boolean;
    containerSize: Size;
};
declare const PageShadow: React.FC<PageShadowProps>;
export default PageShadow;
//# sourceMappingURL=PageShadow.d.ts.map
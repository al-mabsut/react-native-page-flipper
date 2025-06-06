import React from 'react';
import type { Page, Size } from '../types';
export type IBookPageProps = {
    current: Page;
    prev: Page;
    onPageFlip: any;
    containerSize: Size;
    setIsAnimating: (val: boolean) => void;
    isAnimating: boolean;
    enabled: boolean;
    isPressable: boolean;
    getPageStyle: (right: boolean, front: boolean) => any;
    isAnimatingRef: React.MutableRefObject<boolean>;
    next: Page;
    onFlipStart?: (id: number) => void;
    onPageDragStart?: () => void;
    onPageDrag?: () => void;
    onPageDragEnd?: () => void;
    renderPage?: (data: any) => any;
};
export type PortraitBookInstance = {
    turnPage: (index: 1 | -1) => void;
};
declare const BookPagePortrait: React.ForwardRefExoticComponent<IBookPageProps & React.RefAttributes<PortraitBookInstance>>;
export { BookPagePortrait };
//# sourceMappingURL=BookPagePortrait.d.ts.map
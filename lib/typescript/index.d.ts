import React from 'react';
import { ViewStyle } from 'react-native';
import type { Page, Size } from './types';
export type IPageFlipperProps = {
    data: string[];
    enabled?: boolean;
    pressable?: boolean;
    singleImageMode?: boolean;
    renderLastPage?: () => React.ReactElement;
    portrait?: boolean;
    onFlippedEnd?: (index: number) => void;
    onFlipStart?: (id: number) => void;
    onPageDragStart?: () => void;
    onPageDrag?: () => void;
    onPageDragEnd?: () => void;
    onEndReached?: () => void;
    onInitialized?: (props: any) => void;
    renderContainer?: () => any;
    renderPage?: (data: any) => any;
    pageSize: Size;
    contentContainerStyle: ViewStyle;
    startPageIndex?: number;
};
export type PageFlipperInstance = {
    goToPage: (index: number) => void;
    previousPage: () => void;
    nextPage: () => void;
};
export type State = {
    pageIndex: number;
    pages: Page[];
    isAnimating: boolean;
    initialized: boolean;
    prev: Page;
    current: Page;
    next: Page;
    nextPageIndex?: number;
    isPortrait: boolean;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IPageFlipperProps & React.RefAttributes<PageFlipperInstance>>>;
export default _default;
//# sourceMappingURL=index.d.ts.map
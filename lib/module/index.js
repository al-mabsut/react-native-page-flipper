"use strict";

import usePrevious from './hooks/usePrevious';
import useSetState from './hooks/useSetState';
import React, { useEffect, useState, useCallback, useMemo, createElement as _createElement } from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { BookPage } from './BookPage';
import { BookPagePortrait } from './portrait/BookPagePortrait';
import { createPages } from './utils/utils';
import { BookPageBackground } from './BookPageBackground';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const debug = true;
const logger = msg => {
  if (debug) {
    console.log(msg);
  }
};
const PageFlipper = /*#__PURE__*/React.forwardRef(({
  data,
  enabled = true,
  pressable = true,
  singleImageMode = true,
  renderLastPage,
  portrait = false,
  onFlippedEnd,
  onFlipStart,
  onPageDrag,
  onPageDragEnd,
  onPageDragStart,
  onEndReached,
  onInitialized,
  renderContainer,
  renderPage,
  pageSize = {
    height: 600,
    width: 400
  },
  contentContainerStyle,
  startPageIndex = 0
}, ref) => {
  const [{
    width,
    height
  }, setLayout] = useState({
    height: 0,
    width: 0
  });
  const [state, setState] = useSetState({
    pageIndex: startPageIndex,
    pages: [],
    isAnimating: false,
    initialized: false,
    // pageSize: { width: 0, height: 0 },
    prev: {
      left: '',
      right: ''
    },
    current: {
      left: '',
      right: ''
    },
    next: {
      left: '',
      right: ''
    },
    nextPageIndex: undefined,
    isPortrait: portrait
  });
  const isAnimatingRef = useRef(false);
  const prevBookPage = useRef(null);
  const nextBookPage = useRef(null);
  const portraitBookPage = useRef(null);
  const previousPortrait = usePrevious(portrait);
  const containerSize = useMemo(() => {
    if (!state.initialized) {
      return {
        width: 0,
        height: 0
      };
    }
    let size = {
      height: pageSize.height,
      width: singleImageMode && !state.isPortrait ? pageSize.width * 2 : pageSize.width
    };
    if (!singleImageMode && state.isPortrait) {
      size = {
        height: pageSize.height,
        width: pageSize.width / 2
      };
    }
    let finalSize;

    // corrections
    if (size.height > size.width) {
      const ratio = size.height / size.width;
      finalSize = {
        height: width * ratio,
        width
      };
      if (finalSize.height > height) {
        const diff = finalSize.height / height;
        finalSize.height = height;
        finalSize.width = finalSize.width / diff;
      }
    } else {
      const ratio = size.width / size.height;
      finalSize = {
        height,
        width: height * ratio
      };
      if (finalSize.width > width) {
        const diff = finalSize.width / width;
        finalSize.width = width;
        finalSize.height = finalSize.height / diff;
      }
    }
    return finalSize;
  }, [height, singleImageMode, width, state.initialized, state.isPortrait, pageSize.height, pageSize.width]);
  useEffect(() => {
    const initialize = async () => {
      try {
        const allPages = createPages({
          portrait,
          singleImageMode,
          data
        });
        let adjustedIndex = getAdjustedIndex(allPages);
        setState({
          initialized: true,
          pages: allPages,
          prev: allPages[adjustedIndex - 1],
          current: allPages[adjustedIndex],
          next: allPages[adjustedIndex + 1],
          pageIndex: adjustedIndex,
          isPortrait: portrait
        });
        if (onInitialized) {
          onInitialized({
            pages: allPages,
            index: adjustedIndex
          });
        }
      } catch (error) {
        console.error('error', error);
      }
    };
    initialize();
    // eslint-disable-next-line
  }, [data, portrait, singleImageMode]);
  useEffect(() => {
    if (state.nextPageIndex !== undefined) {
      if (!state.isPortrait) {
        if (state.nextPageIndex > state.pageIndex) {
          nextBookPage.current?.turnPage();
        } else {
          prevBookPage.current?.turnPage();
        }
      } else {
        portraitBookPage.current?.turnPage(state.nextPageIndex > state.pageIndex ? 1 : -1);
      }
    }
    // eslint-disable-next-line
  }, [state.nextPageIndex]);
  const goToPage = useCallback(index => {
    if (index === undefined || index === null) {
      logger('index cannot be undefined or null');
      return;
    }
    if (typeof index !== 'number' || isNaN(index)) {
      logger('index must be a number');
      return;
    }
    if (index < 0 || index > state.pages.length - 1) {
      logger('invalid page');
      return;
    }
    if (isAnimatingRef.current) {
      logger('is already animating');
      return;
    }
    if (index === state.pageIndex) {
      logger('same page');
      return;
    }
    if (index > state.pageIndex) {
      setState({
        next: state.pages[index],
        nextPageIndex: index
      });
    } else {
      setState({
        prev: state.pages[index],
        nextPageIndex: index
      });
    }
  }, [setState, state.pageIndex, state.pages]);
  const previousPage = useCallback(() => {
    const newIndex = state.pageIndex - 1;
    goToPage(newIndex);
  }, [goToPage, state.pageIndex]);
  const nextPage = useCallback(() => {
    const newIndex = state.pageIndex + 1;
    goToPage(newIndex);
  }, [goToPage, state.pageIndex]);
  React.useImperativeHandle(ref, () => ({
    goToPage,
    nextPage,
    previousPage
  }), [goToPage, nextPage, previousPage]);
  const getAdjustedIndex = allPages => {
    // THIS NEEDS REWORKING
    let adjustedIndex = state.pageIndex;
    if (previousPortrait !== undefined && previousPortrait !== portrait && singleImageMode) {
      if (portrait) {
        adjustedIndex *= 2;
      } else {
        adjustedIndex = Math.floor(adjustedIndex % 2 === 0 ? adjustedIndex / 2 : (adjustedIndex - 1) / 2);
      }
    }
    if (adjustedIndex < 0 || adjustedIndex > allPages.length - 1) {
      // invalid index, reset to 0
      adjustedIndex = 0;
    }
    return adjustedIndex;
  };
  const onLayout = e => {
    setLayout({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    });
  };
  const onPageFlipped = useCallback(index => {
    const newIndex = state.nextPageIndex !== undefined ? state.nextPageIndex : state.pageIndex + index;
    if (newIndex < 0 || newIndex > state.pages.length - 1) {
      // this if condition theoretically should never occur in the first place, so it could be removed but it's here just in case
      logger('invalid page');
      setState({
        isAnimating: false,
        nextPageIndex: undefined
      });
      isAnimatingRef.current = false;
      return;
    }
    const prev = state.pages[newIndex - 1];
    const current = state.pages[newIndex];
    const next = state.pages[newIndex + 1];
    setState({
      pageIndex: newIndex,
      isAnimating: false,
      prev,
      current,
      next,
      nextPageIndex: undefined
    });
    isAnimatingRef.current = false;
    if (onFlippedEnd && typeof onFlippedEnd === 'function') {
      onFlippedEnd(newIndex);
    }
    if (newIndex === state.pages.length - 1 && onEndReached) {
      onEndReached();
    }
  }, [onEndReached, onFlippedEnd, setState, state.nextPageIndex, state.pageIndex, state.pages]);
  const setIsAnimating = useCallback(val => {
    setState({
      isAnimating: val
    });
    isAnimatingRef.current = val;
  }, [setState]);
  const getPageStyle = (right, front) => {
    if (!singleImageMode && isPortrait) {
      const pageStyle = {
        height: containerSize.height,
        width: containerSize.width * 2,
        position: 'absolute'
      };
      const isEvenPage = pageIndex % 2 === 0;
      if (front) {
        if (isEvenPage) {
          pageStyle.left = right ? 0 : -containerSize.width;
        } else {
          pageStyle.left = right ? -containerSize.width : 0;
        }
      } else {
        if (isEvenPage) {
          pageStyle.left = right ? -containerSize.width : 0;
        } else {
          pageStyle.left = right ? 0 : -containerSize.width;
        }
      }
      return pageStyle;
    }
    const pageStyle = {
      height: containerSize.height,
      width: singleImageMode && !isPortrait ? containerSize.width / 2 : containerSize.width,
      position: 'absolute'
    };
    const offset = singleImageMode ? 0 : -containerSize.width / 2;
    if (isPortrait && front) {
      pageStyle.left = 0;
    } else if (front && right || !front && right) {
      // front right or back right
      pageStyle.left = offset;
    } else if (front && !right) {
      // front left
      pageStyle.right = offset;
    }
    return pageStyle;
  };
  if (!state.initialized) {
    return null;
  }
  const {
    current,
    pageIndex,
    pages,
    next,
    prev,
    isPortrait,
    isAnimating
  } = state;
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;
  const isSecondToLastPage = pageIndex === pages.length - 2;
  const shouldRenderLastPage = (isSecondToLastPage || isLastPage) && singleImageMode && data.length % 2 !== 0;
  const bookPageProps = {
    containerSize: containerSize,
    isAnimating: isAnimating,
    enabled,
    setIsAnimating: setIsAnimating,
    isAnimatingRef: isAnimatingRef,
    onPageFlip: onPageFlipped,
    getPageStyle,
    single: singleImageMode,
    onFlipStart,
    onPageDrag,
    onPageDragEnd,
    onPageDragStart,
    isPressable: pressable,
    renderPage
  };
  const ContentWrapper = renderContainer ? renderContainer : Wrapper;
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    onLayout: onLayout,
    children: /*#__PURE__*/_jsx(View, {
      style: [styles.contentContainer, {
        height: containerSize.height,
        width: containerSize.width
      }, contentContainerStyle],
      children: /*#__PURE__*/_jsx(ContentWrapper, {
        children: !isPortrait ? /*#__PURE__*/_jsxs(View, {
          style: styles.content,
          children: [!prev ? /*#__PURE__*/_jsx(Empty, {}) : /*#__PURE__*/_jsx(BookPage, {
            ref: prevBookPage,
            right: false,
            front: current,
            back: prev,
            ...bookPageProps
          }, `left${pageIndex}`), !next ? /*#__PURE__*/_jsx(Empty, {}) : /*#__PURE__*/_jsx(BookPage, {
            ref: nextBookPage,
            right: true,
            front: current,
            back: next,
            ...bookPageProps
          }, `right${pageIndex}`), /*#__PURE__*/_jsx(BookPageBackground, {
            left: !prev ? current.left : prev.left,
            right: !next ? current.right : next.right,
            isFirstPage: isFirstPage,
            isLastPage: isLastPage,
            getPageStyle: getPageStyle,
            containerSize: containerSize,
            renderPage: renderPage,
            renderLastPage: renderLastPage,
            shouldRenderLastPage: shouldRenderLastPage
          })]
        }) : /*#__PURE__*/_jsxs(View, {
          style: styles.portraitContent,
          children: [/*#__PURE__*/_jsx(View, {
            style: {
              ...StyleSheet.absoluteFillObject
            },
            children: /*#__PURE__*/_createElement(BookPagePortrait, {
              ...bookPageProps,
              current: current,
              prev: prev,
              next: next,
              onPageFlip: onPageFlipped,
              key: `right${pageIndex}`,
              ref: portraitBookPage
            })
          }), next && /*#__PURE__*/_jsx(View, {
            style: {
              ...StyleSheet.absoluteFillObject,
              zIndex: -5,
              overflow: 'hidden'
            },
            children: renderPage && /*#__PURE__*/_jsx(View, {
              style: getPageStyle(true, false),
              children: renderPage(next.right)
            })
          })]
        })
      })
    })
  });
});
export default /*#__PURE__*/React.memo(PageFlipper);
const Wrapper = props => /*#__PURE__*/_jsx(View, {
  style: styles.wrap,
  ...props
});
const Empty = () => /*#__PURE__*/_jsx(View, {
  style: styles.container,
  pointerEvents: "none"
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrap: {
    flex: 1
  },
  contentContainer: {
    flexDirection: 'row',
    // shadowColor: '#000',
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  portraitContent: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=index.js.map
"use strict";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BookSpine } from './BookPage/BookSpine';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BookPageBackground = ({
  left,
  right,
  isFirstPage,
  isLastPage,
  containerSize,
  getPageStyle,
  renderPage,
  renderLastPage,
  shouldRenderLastPage
}) => {
  const leftPageStyle = getPageStyle(false, true);
  const rightPageStyle = getPageStyle(true, true);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.pageContainer,
      children: [left && renderPage && /*#__PURE__*/_jsx(View, {
        style: [leftPageStyle],
        children: renderPage(left)
      }), isFirstPage && /*#__PURE__*/_jsx(BookSpine, {
        right: false,
        containerSize: containerSize
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.pageContainer,
      children: [right && renderPage && /*#__PURE__*/_jsx(View, {
        style: [rightPageStyle],
        children: renderPage(right)
      }), isLastPage && /*#__PURE__*/_jsx(BookSpine, {
        right: true,
        containerSize: containerSize
      }), shouldRenderLastPage && renderLastPage && /*#__PURE__*/_jsx(View, {
        style: [rightPageStyle, {
          zIndex: -1
        }],
        children: renderLastPage()
      })]
    })]
  });
};
export { BookPageBackground };
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    justifyContent: 'center'
    // backgroundColor: 'white',
  },
  container: {
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    width: '100%',
    flexDirection: 'row'
  }
});
//# sourceMappingURL=BookPageBackground.js.map
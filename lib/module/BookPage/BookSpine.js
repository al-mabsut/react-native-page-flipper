"use strict";

import React from 'react';
import { View } from 'react-native';
import { Gradient } from '../Components/Gradient';
import { jsx as _jsx } from "react/jsx-runtime";
const shadowColors = ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'];
const BookSpine = ({
  right,
  containerSize
}) => {
  return /*#__PURE__*/_jsx(View, {
    pointerEvents: "none",
    style: [{
      position: 'absolute',
      height: '100%',
      width: containerSize.width / 2,
      zIndex: 1,
      opacity: 0.6
    }, right ? {
      left: 0
    } : {
      right: 0
    }],
    children: /*#__PURE__*/_jsx(Gradient, {
      start: {
        x: right ? 0 : 1,
        y: 0
      },
      end: {
        x: right ? 1 : 0,
        y: 0
      },
      colors: shadowColors,
      style: {
        flex: 1
      }
    })
  });
};
export { BookSpine };
//# sourceMappingURL=BookSpine.js.map
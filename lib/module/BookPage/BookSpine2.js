"use strict";

import React from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Gradient } from '../Components/Gradient';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const shadowColors = ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'];
const BookSpine2 = ({
  right,
  degrees
  // containerSize,
}) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(Math.abs(degrees.value), [0, 150, 180], [0, 0, 0.65]);
    return {
      opacity
    };
  });
  const position1 = right ? {
    start: {
      x: 1,
      y: 0
    },
    end: {
      x: 0,
      y: 0
    }
  } : {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 1,
      y: 0
    }
  };
  const position2 = !right ? {
    start: {
      x: 1,
      y: 0
    },
    end: {
      x: 0,
      y: 0
    }
  } : {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 1,
      y: 0
    }
  };
  return /*#__PURE__*/_jsxs(Animated.View, {
    pointerEvents: "none",
    style: [{
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 10000000,
      flexDirection: 'row'
    }, style],
    children: [/*#__PURE__*/_jsx(Gradient, {
      ...position1,
      colors: shadowColors,
      style: {
        width: '100%',
        height: '100%'
      }
    }), /*#__PURE__*/_jsx(Gradient, {
      ...position2,
      colors: shadowColors,
      style: [{
        width: '100%',
        height: '100%',
        position: 'absolute'
      }, right ? {
        left: '100%'
      } : {
        right: '100%'
      }]
    })]
  });
};
export { BookSpine2 };
//# sourceMappingURL=BookSpine2.js.map
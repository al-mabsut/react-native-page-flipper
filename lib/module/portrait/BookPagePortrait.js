"use strict";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import BackShadow from '../BookPage/BackShadow';
import FrontShadow from '../BookPage/FrontShadow';
import PageShadow from '../BookPage/PageShadow';
import { clamp, snapPoint } from '../utils/utils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const timingConfig = {
  duration: 800,
  easing: Easing.inOut(Easing.cubic)
};
const BookPagePortrait = /*#__PURE__*/React.forwardRef(({
  current,
  prev,
  onPageFlip,
  containerSize,
  enabled,
  isPressable,
  setIsAnimating,
  getPageStyle,
  isAnimating,
  isAnimatingRef,
  next,
  onFlipStart,
  onPageDrag,
  onPageDragEnd,
  onPageDragStart,
  renderPage
}, ref) => {
  const containerWidth = containerSize.width;
  const pSnapPoints = !prev ? [-containerSize.width, 0] : [-containerSize.width, 0, containerSize.width];
  const x = useSharedValue(0);
  const isMounted = useRef(false);
  const rotateYAsDeg = useSharedValue(0);

  // might not need this
  // useEffect(() => {
  //   if (!enabled) {
  //     setIsDragging(false);
  //   }
  // }, [enabled]);

  const turnPage = useCallback(id => {
    setIsAnimating(true);
    if (onFlipStart && typeof onFlipStart === 'function') {
      onFlipStart(id);
    }
    rotateYAsDeg.value = withTiming(id < 0 ? -180 : 180, timingConfig, () => {
      runOnJS(onPageFlip)(id, false);
    });
  }, [onFlipStart, onPageFlip, rotateYAsDeg, setIsAnimating]);
  React.useImperativeHandle(ref, () => ({
    turnPage
  }), [turnPage]);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const getDegreesForX = x => {
    'worklet';

    const val = interpolate(x, [-containerSize.width, 0, containerSize.width], [180, 0, -180], Extrapolate.CLAMP);
    return val;
  };
  const containerStyle = useAnimatedStyle(() => {
    return {
      flex: 1
    };
  });
  const onPanGestureHandler = useAnimatedGestureHandler({
    // @ts-ignore
    onStart: (event, ctx) => {
      ctx.x = x.value;
      if (onPageDragStart && typeof onPageDragStart === 'function') {
        runOnJS(onPageDragStart)();
      }
    },
    onActive: (event, ctx) => {
      const newX = ctx.x + event.translationX;
      const degrees = getDegreesForX(newX);
      x.value = newX;
      rotateYAsDeg.value = degrees;
      if (onPageDrag && typeof onPageDrag === 'function') {
        runOnJS(onPageDrag)();
      }
    },
    onEnd: event => {
      if (onPageDragEnd && typeof onPageDragEnd === 'function') {
        runOnJS(onPageDragEnd)();
      }
      const snapTo = snapPoint(x.value, event.velocityX, pSnapPoints);
      const id = snapTo > 0 ? -1 : snapTo < 0 ? 1 : 0;
      if (!next && id > 0) {
        // reset
        x.value = withTiming(0);
        rotateYAsDeg.value = withTiming(0);
        // runOnJS(onDrag)(false);
        return;
      }
      const degrees = getDegreesForX(snapTo);
      x.value = snapTo;
      if (rotateYAsDeg.value === degrees) {
        // already same value
        // debugValue('already there');
        runOnJS(onPageFlip)(id, false);
      } else {
        runOnJS(setIsAnimating)(true);
        const progress = Math.abs(rotateYAsDeg.value - degrees) / 100;
        const duration = clamp(800 * progress - Math.abs(0.1 * event.velocityX), 350, 1000);
        rotateYAsDeg.value = withTiming(degrees, {
          ...timingConfig,
          duration: duration
        }, () => {
          if (snapTo === 0) {
            //
          }
          runOnJS(onPageFlip)(id, false);
        });
      }
    }
  });
  const gesturesEnabled = enabled && !isAnimating;
  const iPageProps = {
    containerSize,
    containerWidth,
    getPageStyle,
    rotateYAsDeg,
    renderPage
  };
  return /*#__PURE__*/_jsx(Animated.View, {
    style: containerStyle,
    children: /*#__PURE__*/_jsx(PanGestureHandler, {
      onGestureEvent: onPanGestureHandler,
      enabled: gesturesEnabled,
      children: /*#__PURE__*/_jsxs(Animated.View, {
        style: containerStyle,
        children: [isPressable && prev && /*#__PURE__*/_jsx(Pressable, {
          disabled: isAnimating,
          onPress: () => {
            if (!isAnimatingRef.current) turnPage(-1);
          },
          style: {
            position: 'absolute',
            height: '100%',
            width: '25%',
            zIndex: 10000,
            left: 0
            // backgroundColor: 'red',
            // opacity: 0.2,
          }
        }), isPressable && next && /*#__PURE__*/_jsx(Pressable, {
          disabled: isAnimating,
          onPress: () => {
            if (!isAnimatingRef.current) turnPage(1);
          },
          style: {
            position: 'absolute',
            height: '100%',
            width: '30%',
            zIndex: 10000,
            right: 0
            // backgroundColor: 'blue',
            // opacity: 0.2,
          }
        }), current && next ? /*#__PURE__*/_jsx(IPage, {
          page: current,
          right: true,
          ...iPageProps
        }) : /*#__PURE__*/_jsx(View, {
          style: {
            height: '100%',
            width: '100%'
          },
          children: renderPage && /*#__PURE__*/_jsx(View, {
            style: getPageStyle(true, true),
            children: renderPage(current.right)
          })
        }), prev && /*#__PURE__*/_jsx(IPage, {
          page: prev,
          right: false,
          ...iPageProps
        })]
      })
    })
  });
});
const IPage = ({
  right,
  page,
  rotateYAsDeg,
  containerWidth,
  containerSize,
  getPageStyle,
  renderPage
}) => {
  const [loaded, setLoaded] = useState(right);
  useEffect(() => {
    // hack fix
    setTimeout(() => {
      setLoaded(true);
    }, 50);
  }, []);
  const rotationVal = useDerivedValue(() => {
    const val = right ? rotateYAsDeg.value : interpolate(rotateYAsDeg.value, [-180, 0], [0, 180]);
    return val;
  });
  const portraitBackStyle = useAnimatedStyle(() => {
    const x = interpolate(rotationVal.value, [0, 180], [containerWidth, -containerWidth / 2]);
    const w = interpolate(rotationVal.value, [0, 180], [0, containerWidth / 2]);
    return {
      width: Math.ceil(w),
      zIndex: 2,
      opacity: 1,
      transform: [{
        translateX: x
      }]
    };
  });
  const portraitFrontStyle = useAnimatedStyle(() => {
    const w = interpolate(rotationVal.value, [0, 160], [containerWidth, -20], Extrapolate.CLAMP);
    const style = {
      zIndex: 1,
      width: Math.floor(w)
    };
    if (!right) {
      style['left'] = 0;
    } else {
      // style['right'] = 0;
    }
    return style;
  });
  const frontPageStyle = getPageStyle(right, true);
  const backPageStyle = getPageStyle(right, false);
  if (!loaded) {
    // hack fix
    return null;
  }
  const shadowProps = {
    right: true,
    degrees: rotationVal,
    width: containerSize.width,
    viewHeight: containerSize.height
  };
  return /*#__PURE__*/_jsxs(View, {
    style: {
      ...StyleSheet.absoluteFillObject,
      zIndex: !right ? 5 : 0
    },
    children: [/*#__PURE__*/_jsxs(Animated.View, {
      style: [styles.pageContainer, portraitBackStyle, {
        overflow: 'visible'
      }],
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.pageContainer,
        children: renderPage && /*#__PURE__*/_jsx(Animated.View, {
          style: [backPageStyle, {
            opacity: 0.2,
            transform: [{
              rotateX: '180deg'
            }, {
              rotateZ: '180deg'
            }]
          }],
          children: renderPage(page.left)
        })
      }), /*#__PURE__*/_jsx(BackShadow, {
        degrees: rotationVal,
        right: true
      }), /*#__PURE__*/_jsx(FrontShadow, {
        ...shadowProps
      }), /*#__PURE__*/_jsx(PageShadow, {
        ...shadowProps,
        containerSize: containerSize
      })]
    }), /*#__PURE__*/_jsx(Animated.View, {
      style: [styles.pageContainer, portraitFrontStyle],
      children: renderPage && /*#__PURE__*/_jsx(Animated.View, {
        style: [frontPageStyle],
        children: renderPage(page.left)
      })
    })]
  });
};
export { BookPagePortrait };
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    backgroundColor: 'white'
  }
});
//# sourceMappingURL=BookPagePortrait.js.map
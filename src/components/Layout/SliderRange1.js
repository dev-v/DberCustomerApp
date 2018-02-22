import React from "react";

import {
  Animated,
  Image,
  StyleSheet,
  PanResponder,
  View,
  Easing,
  ViewPropTypes
} from "react-native";

import PropTypes from 'prop-types';
import {Util} from "../../util/Util";

let TRACK_SIZE = 4;
let THUMB_SIZE = 20;

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rect.prototype.containsPoint = function (x, y) {
  return (x >= this.x
      && y >= this.y
      && x <= this.x + this.width
      && y <= this.y + this.height);
};

let DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0
  },
  // decay : { // This has a serious bug
  //   velocity     : 1,
  //   deceleration : 0.997
  // }
};

export default class SliderRange extends React.PureComponent {
  static propTypes = {
    /**
     * Initial value of the slider. The value should be between min
     * and max, which default to 0 and 1 respectively.
     * Default value is 0.
     *
     * *This is not a controlled component*, e.g. if you don't update
     * the value, the component won't be reset to its inital value.
     */
    value: PropTypes.array,

    /**
     * If true the user won't be able to move the slider.
     * Default value is false.
     */
    disabled: PropTypes.bool,

    /**
     * Initial minimum value of the slider. Default value is 0.
     */
    min: PropTypes.number,

    /**
     * Initial maximum value of the slider. Default value is 1.
     */
    max: PropTypes.number,

    /**
     * Step value of the slider. The value should be between 0 and
     * (max - min). Default value is 0.
     */
    step: PropTypes.number,

    /**
     * The color used for the track to the left of the button. Overrides the
     * default blue gradient image.
     */
    selectedColor: PropTypes.string,

    /**
     * The color used for the track to the right of the button. Overrides the
     * default blue gradient image.
     */
    unSelectedColor: PropTypes.string,

    /**
     * The color used for the thumb.
     */
    thumbColor: PropTypes.string,

    /**
     * The size of the touch area that allows moving the thumb.
     * The touch area has the same center has the visible thumb.
     * This allows to have a visually small thumb while still allowing the user
     * to move it easily.
     * The default is {width: 40, height: 40}.
     */
    thumbTouchSize: PropTypes.shape(
        {width: PropTypes.number, height: PropTypes.number}
    ),

    /**
     * Callback continuously called while the user is dragging the slider.
     */
    onChange: PropTypes.func,

    /**
     * Callback called when the user starts changing the value (e.g. when
     * the slider is pressed).
     */
    onSlidingStart: PropTypes.func,

    /**
     * Callback called when the user finishes changing the value (e.g. when
     * the slider is released).
     */
    onSlidingComplete: PropTypes.func,

    /**
     * The style applied to the slider container.
     */
    style: ViewPropTypes.style,

    /**
     * The style applied to the track.
     */
    trackStyle: ViewPropTypes.style,

    /**
     * The style applied to the thumb.
     */
    thumbStyle: ViewPropTypes.style,

    /**
     * Sets an image for the thumb.
     */
    thumbImage: Image.propTypes.source,

    /**
     * Set this to true to visually see the thumb touch rect in green.
     */
    debugTouchArea: PropTypes.bool,
  };

  static defaultProps = {
    value: [0, 0.5],
    min: 0,
    max: 1,
    step: 0,
    selectedColor: '#3f3f3f',
    unSelectedColor: '#b3b3b3',
    thumbColor: '#343434',
    thumbTouchSize: {width: 40, height: 40},
    debugTouchArea: false,
  };

  state = {
    containerSize: {width: 0, height: 0},
    trackSize: {width: 0, height: 0},
    thumbSize: {width: 0, height: 0},
    allMeasured: false,
    value: new Animated.Value(this.props.value),
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  };

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;

    if (!Util.isSame(this.state.value, value)) {
      this._setCurrentValue(value);
    }
  };

  render() {
    const {
      min,
      max,
      selectedColor,
      unSelectedColor,
      thumbColor,
      thumbImage,
      styles,
      style,
      trackStyle,
      thumbStyle,
      debugTouchArea,
      ...other
    } = this.props;
    let {value, containerSize, trackSize, thumbSize, allMeasured} = this.state;
    let mainStyles = styles || defaultStyles;
    let thumbLeft = value.interpolate({
      inputRange: [min, max],
      outputRange: [0, containerSize.width - thumbSize.width],
      //extrapolate: 'clamp',
    });
    let valueVisibleStyle = {};
    if (!allMeasured) {
      valueVisibleStyle.opacity = 0;
    }

    let minimumTrackStyle = {
      position: 'absolute',
      width: Animated.add(thumbLeft, thumbSize.width / 2),
      backgroundColor: selectedColor,
      ...valueVisibleStyle
    };

    let touchOverflowStyle = this._getTouchOverflowStyle();

    return (
        <View {...other} style={[mainStyles.container, style]} onLayout={this._measureContainer}>
          <View
              style={[{backgroundColor: unSelectedColor,}, mainStyles.track, trackStyle]}
              renderToHardwareTextureAndroid={true}
              onLayout={this._measureTrack}/>
          <Animated.View
              renderToHardwareTextureAndroid={true}
              style={[mainStyles.track, trackStyle, minimumTrackStyle]}/>
          <Animated.View
              onLayout={this._measureThumb}
              renderToHardwareTextureAndroid={true}
              style={[
                {backgroundColor: thumbColor},
                mainStyles.thumb, thumbStyle,
                {
                  transform: [
                    {translateX: thumbLeft},
                    {translateY: 0}
                  ],
                  ...valueVisibleStyle
                }
              ]}
          >
            {this._renderThumbImage()}
          </Animated.View>
          <View
              renderToHardwareTextureAndroid={true}
              style={[defaultStyles.touchArea, touchOverflowStyle]}
              {...this._panResponder.panHandlers}>
            {debugTouchArea === true && this._renderDebugThumbTouchRect(thumbLeft)}
          </View>
        </View>
    );
  };

  _getPropsForComponentUpdate(props) {
    let {
      value,
      onChange,
      onSlidingStart,
      onSlidingComplete,
      style,
      trackStyle,
      thumbStyle,
      ...otherProps,
    } = props;

    return otherProps;
  };

  _handleStartShouldSetPanResponder = (e: Object, /*gestureState: Object*/): boolean => {
    // Should we become active when the user presses down on the thumb?
    return this._thumbHitTest(e);
  };

  _handleMoveShouldSetPanResponder(/*e: Object, gestureState: Object*/): boolean {
    // Should we become active when the user moves a touch over the thumb?
    return false;
  };

  _handlePanResponderGrant = (/*e: Object, gestureState: Object*/) => {
    this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    this._fireChangeEvent('onSlidingStart');
  };

  _handlePanResponderMove = (e: Object, gestureState: Object) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onChange');
  };

  _handlePanResponderRequestEnd(e: Object, gestureState: Object) {
    // Should we allow another component to take over this pan?
    return false;
  };

  _handlePanResponderEnd = (e: Object, gestureState: Object) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onSlidingComplete');
  };

  _measureContainer = (x: Object) => {
    this._handleMeasure('containerSize', x);
  };

  _measureTrack = (x: Object) => {
    this._handleMeasure('trackSize', x);
  };

  _measureThumb = (x: Object) => {
    this._handleMeasure('thumbSize', x);
  };

  _handleMeasure = (name: string, x: Object) => {
    let {width, height} = x.nativeEvent.layout;
    let size = {width: width, height: height};

    let storeName = `_${name}`;
    let currentSize = this[storeName];
    if (currentSize && width === currentSize.width && height === currentSize.height) {
      return;
    }
    this[storeName] = size;

    if (this._containerSize && this._trackSize && this._thumbSize) {
      this.setState({
        containerSize: this._containerSize,
        trackSize: this._trackSize,
        thumbSize: this._thumbSize,
        allMeasured: true,
      })
    }
  };

  _getRatio = (value: number) => {
    return (value - this.props.min) / (this.props.max - this.props.min);
  };

  _getThumbLeft = (value: number) => {
    let ratio = this._getRatio(value);
    return ratio * (this.state.containerSize.width - this.state.thumbSize.width);
  };

  _getValue = (gestureState: Object) => {
    let length = this.state.containerSize.width - this.state.thumbSize.width;
    let thumbLeft = this._previousLeft + gestureState.dx;

    let ratio = thumbLeft / length;

    if (this.props.step) {
      return Math.max(this.props.min,
          Math.min(this.props.max,
              this.props.min + Math.round(ratio * (this.props.max - this.props.min) / this.props.step) * this.props.step
          )
      );
    } else {
      return Math.max(this.props.min,
          Math.min(this.props.max,
              ratio * (this.props.max - this.props.min) + this.props.min
          )
      );
    }
  };

  _getCurrentValue = () => {
    return this.state.value.__getValue();
  };

  _setCurrentValue = (value: number) => {
    this.state.value.setValue(value);
  };

  _fireChangeEvent = (event) => {
    if (this.props[event]) {
      this.props[event](this._getCurrentValue());
    }
  };

  _getTouchOverflowSize = () => {
    let state = this.state;
    let props = this.props;

    let size = {};
    if (state.allMeasured === true) {
      size.width = Math.max(0, props.thumbTouchSize.width - state.thumbSize.width);
      size.height = Math.max(0, props.thumbTouchSize.height - state.containerSize.height);
    }

    return size;
  };

  _getTouchOverflowStyle = () => {
    let {width, height} = this._getTouchOverflowSize();

    let touchOverflowStyle = {};
    if (width !== undefined && height !== undefined) {
      let verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;

      let horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }

    return touchOverflowStyle;
  };

  _thumbHitTest = (e: Object) => {
    let nativeEvent = e.nativeEvent;
    let thumbTouchRect = this._getThumbTouchRect();
    return thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
  };

  _getThumbTouchRect = () => {
    let state = this.state;
    let props = this.props;
    let touchOverflowSize = this._getTouchOverflowSize();

    return new Rect(
        touchOverflowSize.width / 2 + this._getThumbLeft(this._getCurrentValue()) + (state.thumbSize.width - props.thumbTouchSize.width) / 2,
        touchOverflowSize.height / 2 + (state.containerSize.height - props.thumbTouchSize.height) / 2,
        props.thumbTouchSize.width,
        props.thumbTouchSize.height
    );
  };

  _renderDebugThumbTouchRect = (thumbLeft) => {
    let thumbTouchRect = this._getThumbTouchRect();
    let positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height,
    };

    return (
        <Animated.View
            style={[defaultStyles.debugThumbTouchArea, positionStyle]}
            pointerEvents='none'
        />
    );
  };

  _renderThumbImage = () => {
    let {thumbImage} = this.props;

    if (!thumbImage) return;

    return <Image source={thumbImage}/>;
  };
}

let defaultStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  }
});

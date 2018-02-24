import React from "react";

import {
  Animated,
  Image,
  StyleSheet,
  PanResponder,
  View,
  ViewPropTypes,
  Text,
} from "react-native";

import PropTypes from 'prop-types';
import {Colors7, TextStyle} from "../themes/Styles";
import {Util} from "../../util/Util";

const TRACK_SIZE = 2;
const THUMB_SIZE = 22;
const LABEL_SIZE = 10;

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  containsPoint = function (x, y) {
    return (x >= this.x
        && y >= this.y
        && x <= this.x + this.width
        && y <= this.y + this.height);
  }
}

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
    value: PropTypes.shape({
      min: PropTypes.number, max: PropTypes.number,
    }),

    markers: PropTypes.array,
    markerFormat: PropTypes.func,
    showMarkerLabel: PropTypes.bool,

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
    value: {min: 0, max: 0},
    min: 0,
    max: 1,
    step: 0,
    selectedColor: Colors7.blue,
    unSelectedColor: Colors7.gray,
    thumbColor: Colors7.white,
    thumbTouchSize: {width: 40, height: 40},
    debugTouchArea: false,
    markerFormat: (val) => val,
    showMarkerLabel: true,
  };

  state = {
    containerSize: {width: 0, height: 0},
    trackSize: {width: 0, height: 0},
    thumbSize: {width: 0, height: 0},
    allMeasured: false,
    value: new Animated.ValueXY({x: this.props.value.min, y: this.props.value.max}),
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });


    const {
      min,
      max,
      selectedColor,
      unSelectedColor,
      thumbColor,
      styles,
      style,
      trackStyle,
      thumbStyle,
      markers,
      markerFormat,
      showMarkerLabel,
      ...other
    } = this.props;


    this.config = {
      mainStyles: styles || defaultStyles,
      other,
    }
  };

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
    if (!Util.isSame(value, this._getCurrentValue())) {
      const {min, max} = value;
      this.state.value.setValue({x: min, y: max});
    }
  };

  render() {
    const {containerStyle, mainStyles, unSelectedStyle, touchStyle, other, selectedStyle, minThumbStyle, maxThumbStyle, markers} = this.getConfig();
    const {disabled} = this.props;
    return (
        <View {...other} style={[containerStyle]} onLayout={this._measureContainer}>
          <View
              style={unSelectedStyle}
              renderToHardwareTextureAndroid={true}
              onLayout={this._measureTrack}>
          </View>
          <Animated.View
              renderToHardwareTextureAndroid={true}
              style={[selectedStyle, disabled && mainStyles.disabled]}/>
          {this.getMarkerViews()}
          <Animated.View
              onLayout={this._measureThumb}
              renderToHardwareTextureAndroid={true}
              style={[minThumbStyle, disabled && mainStyles.disabled]}
          />
          <Animated.View
              onLayout={this._measureThumb}
              renderToHardwareTextureAndroid={true}
              style={[maxThumbStyle, disabled && mainStyles.disabled]}
          />
          <View
              renderToHardwareTextureAndroid={true}
              style={touchStyle}
              {...this._panResponder.panHandlers}>
          </View>
        </View>
    );
  };

  cacheMarkers;
  getMarkerViews = (force = false) => {
    const {cacheMarkers, props, config} = this;
    const {markers, markerFormat, showMarkerLabel} = props;
    const {mainStyles, interpolateRange} = config;
    if (interpolateRange && (!Util.isSame(markers, cacheMarkers) || force)) {
      this.cacheMarkers = markers;
      if (markers) {
        const cacheLabels = {};
        const m = new Animated.Value(0), res = m.interpolate(interpolateRange);
        let left, width;
        const markerViews = [];
        markers.map((marker) => {
          const {min, max} = marker;
          m.setValue(min);
          left = res.__getValue();
          m.setValue(max);
          width = res.__getValue() - left;
          markerViews.push(<View key={`${min}-${max}`} style={[mainStyles.markerLineStyle, {left, width}]}/>);
          cacheLabels[min] = left;
          cacheLabels[max] = left + width - LABEL_SIZE * 2.5;
        });

        if (showMarkerLabel) {
          let i = 0;
          for (let val in cacheLabels) {
            i++;
            const left = cacheLabels[val];
            markerViews.push(<Text key={`${val}`} style={[TextStyle.small, {
              position: 'absolute',
              fontSize: LABEL_SIZE,
              left,
              top: i % 2 == 0 ? 22 : 2,
            }]}>{markerFormat(Number(val))}</Text>)
          }
        }
        this.markers = markerViews;
      }
    }
    return this.markers;
  }

  times = 0;
  config;
  getConfig = () => {
    if (this.times < 3) {
      this.times++;

      const {
        min,
        max,
        selectedColor,
        unSelectedColor,
        thumbColor,
        style,
        trackStyle,
        thumbStyle,
      } = this.props;
      const {mainStyles} = this.config;

      const {value, containerSize, thumbSize, allMeasured} = this.state;

      const touchOverflowStyle = this._getTouchOverflowStyle();

      const valueVisibleStyle = allMeasured ? undefined : {opacity: 0};

      const interpolateRange = {
        inputRange: [min, max],
        outputRange: [0, containerSize.width - thumbSize.width],
      };

      const x = value.x.interpolate(interpolateRange);
      const y = value.y.interpolate(interpolateRange);

      const selectedStyle = {
        position: 'absolute',
        left: x,
        width: Animated.add(y, x.interpolate({inputRange: [0, 1], outputRange: [0, -1]})),
        backgroundColor: selectedColor,
        ...valueVisibleStyle
      };

      Object.assign(this.config, {
        interpolateRange,
        containerStyle: [mainStyles.container, style],
        unSelectedStyle: [{backgroundColor: unSelectedColor,}, mainStyles.track, trackStyle],
        touchStyle: [defaultStyles.touchArea, touchOverflowStyle],
        selectedStyle: [mainStyles.track, trackStyle, selectedStyle],
        minThumbStyle: [
          {backgroundColor: thumbColor},
          mainStyles.thumb, thumbStyle,
          {
            transform: [
              {translateX: x},
              {translateY: 0}
            ],
            ...valueVisibleStyle
          }
        ],
        maxThumbStyle: [
          {backgroundColor: thumbColor},
          mainStyles.thumb, thumbStyle,
          {
            transform: [
              {translateX: y},
              {translateY: 0}
            ],
            ...valueVisibleStyle
          }
        ],
      });

      this.getMarkerViews(true);
    }
    return this.config;
  }

  _handleStartShouldSetPanResponder = (e: Object): boolean => {
    if (this.props.disabled) {
      return;
    }
    return this._thumbHitTest(e);
  };

  _handleMoveShouldSetPanResponder() {
    return false;
  };

  _handlePanResponderGrant = () => {
    this._previousLeft = this._getThumbLeft(this.currentTouch.touch);
  };

  _handlePanResponderMove = (e: Object, gestureState: Object) => {
    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onChange');
  };

  _handlePanResponderEnd = this._handlePanResponderMove;

  _handlePanResponderRequestEnd() {
    return false;
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
    const {width, height} = x.nativeEvent.layout;
    const size = {width: width, height: height};

    const storeName = `_${name}`;
    const currentSize = this[storeName];
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
      });
    }
  };

  _getRatio = (value: number) => {
    return (value - this.props.min) / (this.props.max - this.props.min);
  };

  _getThumbLeft = (value: number) => {
    const ratio = this._getRatio(value);
    return ratio * (this.state.containerSize.width - this.state.thumbSize.width);
  };

  _getValue = (gestureState: Object) => {
    const length = this.state.containerSize.width - this.state.thumbSize.width;
    const thumbLeft = this._previousLeft + gestureState.dx;

    const ratio = thumbLeft / length;

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
    const {x, y} = this.state.value.__getValue();
    return {min: x, max: y};
  };

  _setCurrentValue = (value: number) => {
    const old = this.currentTouch.other;
    let newValue;

    if (value > old) {
      newValue = {x: old, y: value};
    } else {
      newValue = {x: value, y: old};
    }

    this.state.value.setValue(newValue);
  };

  _fireChangeEvent = (event) => {
    if (this.props[event]) {
      this.props[event](this._getCurrentValue());
    }
  };

  _getTouchOverflowSize = () => {
    const {state, props} = this;

    const size = {};
    if (state.allMeasured === true) {
      size.width = Math.max(0, props.thumbTouchSize.width - state.thumbSize.width);
      size.height = Math.max(0, props.thumbTouchSize.height - state.containerSize.height);
    }

    return size;
  };

  _getTouchOverflowStyle = () => {
    const {width, height} = this._getTouchOverflowSize();

    const touchOverflowStyle = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;

      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }

    return touchOverflowStyle;
  };

  _thumbHitTest = ({nativeEvent}) => {
    const {locationX, locationY} = nativeEvent;
    const {min, max} = this._getCurrentValue();
    if (this._getThumbTouchRect(min).containsPoint(locationX, locationY)) {
      this.currentTouch = {touch: min, other: max};
      return true;
    } else if (this._getThumbTouchRect(max).containsPoint(locationX, locationY)) {
      this.currentTouch = {touch: max, other: min};
      return true;
    }
    return false;
  };

  _getThumbTouchRect = (x) => {
    const {state, props} = this;
    const touchOverflowSize = this._getTouchOverflowSize();

    const y = touchOverflowSize.height / 2 + (state.containerSize.height - props.thumbTouchSize.height) / 2;
    const width = props.thumbTouchSize.width;
    const height = props.thumbTouchSize.height;

    return new Rect(touchOverflowSize.width / 2 + this._getThumbLeft(x) + (state.thumbSize.width - props.thumbTouchSize.width) / 2, y, width, height);
  };

}

const defaultStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
    justifyContent: 'center',
  },
  markerLineStyle: {
    position: 'absolute',
    borderColor: Colors7.volcano,
    borderWidth: TRACK_SIZE / 2,
  },
  disabled: {
    opacity: 0,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 2,
    borderColor: Colors7.blue,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

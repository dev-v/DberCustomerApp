import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {DatePicker} from 'antd-mobile';
import SliderRange from "./SliderRange";
import {Time} from "../../util/Util";
import FlexBetween from "../Layout/FlexBetween";
import Label from "../Label";


const format = (value) => {
  return {min: Time.formatTime(value.min), max: Time.formatTime(value.max)};
}

export default class SliderRangeTime extends React.PureComponent {

  static propTypes = {
    ...SliderRange.propTypes,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    step: 5,
    value: {min: 600, max: 660},
    step: 5,
    min: 600,
    max: 1320,
    disabled: false,
  }

  state = {
    visible: false,
    editVal: undefined,
    value: this.props.value,
    formatValue: format(this.props.value),
  }

  componentDidMount() {
    const {value, formatValue} = this.state;
    this.onChange(value, formatValue)
  }

  onEdit = (editVal) => {
    this.setState({
      ...this.state,
      visible: true,
      editVal,
    });
  }

  onDismiss = () => {
    this.setState({
      ...this.state,
      visible: false,
    });
  }

  ensureVal = (val) => {
    const {min, max} = this.props;
    val = Time.toMinute(val);
    if (val < min) {
      return min;
    } else if (val > max) {
      return max;
    }
    return val;
  }

  onOk = (val) => {
    let {value, editVal} = this.state;
    val = this.ensureVal(val);
    const {min, max} = value;
    if (editVal == max) {
      if (val < min) {
        value = {min: val, max: min};
      } else {
        value.max = val;
      }
    } else {
      if (val > max) {
        value = {min: max, max: val};
      } else {
        value.min = val;
      }
    }
    const formatValue = format(value);

    this.setState({
      ...this.state,
      visible: false,
      value,
      formatValue,
    });

    this.onChange(value, formatValue);
  }

  onSliderChange = (value) => {
    const formatValue = format(value);
    this.setState({
      ...this.state,
      value,
      formatValue,
    });
    this.onChange(value, formatValue);
  }

  onChange = (value, formatValue) => {
    if (this.props.onChange) {
      this.props.onChange(value, formatValue);
    }
  }

  render() {
    const {props, state, onSliderChange, onEdit, onDismiss, onOk} = this;
    const {step, disabled, ...other} = props;
    const {visible, value, editVal, formatValue} = state;
    const {min, max} = value;

    return (<View>
      {disabled || <FlexBetween>
        <TouchableOpacity onPress={() => onEdit(min)}>
          <Label text={formatValue.min}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(max)}>
          <Label text={formatValue.max}/>
        </TouchableOpacity>
      </FlexBetween>}
      <SliderRange {...other} disabled={disabled} step={step} value={value} markerFormat={Time.formatTime}
                   onChange={onSliderChange}/>
      {visible && disabled || <DatePicker mode='time' minuteStep={step} format={Time.format_time}
                                          value={Time.fromMinute(editVal).toDate()} visible={visible}
                                          onOk={onOk}
                                          onDismiss={onDismiss}/>}
    </View>);
  }
}

import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import SliderRange from "./SliderRange";
import {Time} from "../../util/Util";
import FlexBetween from "../Layout/FlexBetween";

export default class SliderRangeTime extends React.PureComponent {

  static propTypes = {
    ...SliderRange.propTypes,
  }

  static defaultProps = {
    value: {min: 600, max: 660},
    step: 5,
    min: 600,
    max: 1320,
  }

  render() {

    const {onChange, ...other} = this.props;

    return (<View>
      <FlexBetween>
        <DatePicker mode='time'/>
        <DatePicker mode='time'/>
      </FlexBetween>
      <SliderRange {...other} markerFormat={Time.formatTime} onChange={onChange}/>
    </View>);
  }
}

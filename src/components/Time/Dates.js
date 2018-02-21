import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Time} from "../../util/Util";
import ArrowButton from "./ArrowButton";
import Styles, {TextStyle} from "../themes/Styles";

export default class Dates extends React.PureComponent {

  leftIconBtn = <ArrowButton direction='left' ref={ref => this.leftIcon = ref}/>;
  rightIconBtn = <ArrowButton direction='right' ref={ref => this.rightIcon = ref}/>;

  componentWillMount() {
    const {minDate = Time.formatDate(Time.today()), rangeCount = 90} = this.props;
    const maxDate = Time.formatDate(Time.parse(minDate).add(rangeCount, 'd'));
    this.setState({
      minDate,
      maxDate
    });
  }

  selectDate = (date) => {
    this.setState({
      ...this.state,
      selectedDate: date.dateString,
    });
    this.props.onSelect && this.props.onSelect(date);
  }

  onMonthChange = ({dateString}) => {
    const {state, leftIcon, rightIcon} = this;
    const {minDate, maxDate} = state;

    if (dateString < minDate) {
      leftIcon.hide(true);
    } else {
      leftIcon.hide(false);
    }

    if (dateString > maxDate) {
      rightIcon.hide(true);
    } else {
      rightIcon.hide(false);
    }
  }

  renderArrow = (direction) => {
    if (direction == 'left') {
      return this.leftIconBtn;
    } else {
      return this.rightIconBtn;
    }
  }

  render() {
    const {selectedDate, minDate, maxDate} = this.state;
    const markedDates = selectedDate && {[selectedDate]: {selected: true}};
    return <Calendar
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={this.selectDate}
        markedDates={markedDates}
        onMonthChange={this.onMonthChange}
        renderArrow={this.renderArrow}
    />;
  }
}
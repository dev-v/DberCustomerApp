import React from 'react';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import {Time, Util} from "../../util/Util";


const tomorrow = Time.tomorrow();
const today = Time.today();

export default class Calendars extends React.PureComponent {

  state = {
    selectedDates: [],
    markedDates: undefined,
  }

  componentWillMount() {
    const {rangeCount = 90, minDate = tomorrow, pastScrollRange = today.month()} = this.props;
    const maxDate = moment(minDate).add(rangeCount, 'd');
    this.calendarProps = {
      minDate: Time.formatDate(minDate),
      maxDate: Time.formatDate(maxDate),
      pastScrollRange,
      futureScrollRange: rangeCount / 30,
    };

    this.initMarkedDates();
  }

  initMarkedDates = () => {
    const {markedDates} = this.props;
    const {selectedDates} = this.state;
    if (markedDates && Array.isArray(markedDates)) {
      const {minDate, maxDate} = this.calendarProps, dates = {};
      markedDates.map((date) => {
        if (date < minDate || date > maxDate) {
          dates[date] = {marked: true};
        } else {
          selectedDates[date] = dates[date] = {selected: true};
        }
      });
      this.state.markedDates = dates;
    } else {
      this.state.markedDates = markedDates || {};
    }

    this.cache = {...selectedDates};
  }

  onDayPress = ({dateString}) => {
    const {selectedDates, markedDates} = this.state;
    if (selectedDates[dateString]) {
      delete selectedDates[dateString];
      delete markedDates[dateString];
    } else {
      selectedDates[dateString] = markedDates[dateString] = {selected: true};
    }
    this.setState({selectedDates, markedDates: {...markedDates}});

    if (this.props.onChange) {
      const dates = Object.keys(selectedDates);
      this.props.onChange(dates, Util.isSame(Object.keys(this.cache), dates));
    }
  };

  render() {
    return <CalendarList {...this.calendarProps} markedDates={this.state.markedDates} onDayPress={this.onDayPress}/>;
  }
}
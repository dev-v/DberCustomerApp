import React from 'react';
import {Text, View, FlatList} from 'react-native';
import moment from 'moment';
import {BaseStyle, TextStyle} from "../../components/themes/Styles";
import {CalendarList} from 'react-native-calendars';
import {Time} from "../../util/Util";

const init = () => {
  const minDate = Time.tomorrow();
  const maxDate = moment(minDate).add(90, 'd');
  return {
    minDate: minDate.format(),
    maxDate: maxDate.format(),
    pastScrollRange: Time.today().month(),
    futureScrollRange: 3
  };
};

const initData = init();

export default class AddHoliday extends React.PureComponent {

  render() {
    return (
        <View style={BaseStyle.container}>
          <CalendarList {...initData}/>
        </View>
    );
  }
}

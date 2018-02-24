import React, {Component} from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

import {DatePicker} from 'antd-mobile';

const FORMATS = {
  'time': 'HH:mm'
};


export default class TimePicker extends React.PureComponent {

  render() {
    return (<View style={styles.container}>
      <DatePicker/>
    </View>)
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 1,
  }
});

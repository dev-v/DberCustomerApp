import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "./themes/Styles";

export default class Label extends React.PureComponent {

  static getLabels(dataSource, field = 'name') {
    if (Array.isArray(dataSource)) {
      return dataSource.map((data) => {
        const text = data[field];
        return <Label key={text} text={text}/>
      });
    }
  }

  render() {
    return (<View style={styles.container}>
      <Text style={styles.text}>{this.props.text}</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Colors7.blue,
    borderRadius: BaseStyle.borderRadius,
    borderWidth: 1,
    borderStyle: 'dotted',
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 1.5,
  },
  text: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 13,
    color: BaseStyle.color,
  }
});
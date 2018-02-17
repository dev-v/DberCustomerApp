import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BaseStyle, Colors7} from "./themes/Styles";

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
    backgroundColor: Colors7.blue,
    borderRadius: BaseStyle.borderRadius,
    padding: 5,
    marginHorizontal: 1.5,
  },
  text: {
    color: '#fff',
  }
});
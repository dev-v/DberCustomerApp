import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "./themes/Styles";
import PropTypes from 'prop-types';
import Styles from "./themes/Styles";

export default class Label extends React.PureComponent {

  static propTypes = {
    text: PropTypes.any,
    disabled: PropTypes.bool,
  }

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
      <Text style={TextStyle.base}>{this.props.text}</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Colors7.gray,
    borderRadius: BaseStyle.borderRadius,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
});

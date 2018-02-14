import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "./Icon";
import {BaseStyle} from "../themes/Styles";

export default class IconButton extends React.PureComponent {
  render() {
    const {onPress, name} = this.props;
    return <TouchableOpacity onPress={onPress}>
      <Icon name={name} style={styles.icon}/>
    </TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    paddingHorizontal: BaseStyle.edgeHorizontal,
  }
});
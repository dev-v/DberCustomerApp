import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon, {Icons} from "./Icon";
import {BaseStyle, TextStyle} from "../themes/Styles";

const Size = {
  large: {
    text: {...TextStyle.title, paddingLeft: 16},
    icon: Icon.size.large,
  },
  normal: {
    text: {...TextStyle.base, paddingLeft: 12},
    icon: Icon.size.normal,
  },
  small: {
    text: {...TextStyle.extra, paddingLeft: 8},
    icon: Icon.size.small,
  }
}

export default class IconButton extends React.PureComponent {
  static size = Size;

  componentWillMount() {
    const {name, text, size = Size.small, iconStyle, source = Icons.Ionicons} = this.props;
    this.icon = <Icon size={size.icon} style={{...iconStyle,}} name={name} source={source}/>;
    this.text = text && <Text style={size.text}>{text}</Text>;
  }

  render() {
    const {disabled = false, onPress} = this.props;
    const {icon, text} = this;
    return (<TouchableOpacity style={styles.view} onPress={onPress} disabled={disabled}>
      {icon}
      {text && text}
    </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 6
  }
});
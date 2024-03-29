import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconSource} from "./Icon";
import {TextStyle} from "../themes/Styles";

const Size = {
  large: {
    text: [TextStyle.title, {paddingLeft: 10}],
    icon: Icon.size.large,
  },
  normal: {
    text: [TextStyle.base, {paddingLeft: 8}],
    icon: Icon.size.normal,
  },
  small: {
    text: [TextStyle.extra, {paddingLeft: 6}],
    icon: Icon.size.small,
  }
}

export default class IconButton extends React.PureComponent {
  static size = Size;

  componentWillMount() {
    const {name, text, size = Size.small, iconStyle, textStyle, source = IconSource.Ionicons} = this.props;
    this.icon = <Icon size={size.icon} style={iconStyle} name={name} source={source}/>;
    this.text = text && <Text style={[size.text, textStyle]}>{text}</Text>;
  }

  render() {
    const {disabled = false, onPress} = this.props;
    const {icon, text} = this;
    const view = <View style={styles.view}>
      {icon}
      {text && text}
    </View>;
    return ((disabled || !onPress) ? view : <TouchableOpacity onPress={onPress}>
      {view}
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

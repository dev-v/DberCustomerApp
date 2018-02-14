import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon, {Icons} from "./Icon";
import {TextStyle} from "../themes/Styles";

const Size = {
  normal: {
    text: TextStyle.base,
    icon: {
      fontSize: 18,
      marginRight: 6,
    }
  },
  small: {
    text: TextStyle.extra,
    icon: {
      fontSize: 14,
      marginRight: 3,
    }
  }
}

export default class IconLabel extends React.PureComponent {
  static size = Size;

  render() {
    const {name, text, size = Size.normal, iconStyle, source = Icons.SimpleLineIcons} = this.props;
    return (<View style={styles.view}>
      <Icon style={{...size.icon, ...iconStyle}} name={name} source={source}/>
      <Text style={size.text}>{text}</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 6,
  }
});
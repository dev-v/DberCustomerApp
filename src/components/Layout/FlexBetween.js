import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BaseStyle} from "../themes/Styles";

export default class FlexBetween extends React.PureComponent {
  render() {
    const {children, onPress, disabled} = this.props;
    const view = <View style={BaseStyle.flexBetween}>
      {children}
    </View>;
    return (disabled || !onPress ? view : <TouchableOpacity onPress={onPress}>
      {view}
    </TouchableOpacity>);
  }
}
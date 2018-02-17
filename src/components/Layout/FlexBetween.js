import React from 'react';
import {View} from 'react-native';
import {BaseStyle} from "../themes/Styles";

export default class FlexBetween extends React.PureComponent {
  render() {
    return (<View style={BaseStyle.flexBetween}>
      {this.props.children}
    </View>);
  }
}
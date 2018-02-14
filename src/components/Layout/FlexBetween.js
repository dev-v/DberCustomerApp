import React from 'react';
import {View} from 'react-native';
import {BaseStyle} from "../themes/Styles";

export default class FlexBetween extends React.PureComponent {
  componentWillMount() {
    this.style = {
      ...BaseStyle.flexBetween,marginVertical:6, ...(this.props.border ? {
        borderColor: BaseStyle.borderColor,
        borderWidth: 1
      } : undefined)
    }
  }

  render() {
    return (<View style={this.style}>
      {this.props.children}
    </View>);
  }
}
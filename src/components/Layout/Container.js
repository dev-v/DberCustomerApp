import React from 'react';
import {View, StatusBar} from 'react-native';
import Styles, {Colors7} from "../themes/Styles";

const statusBar = <StatusBar
    barStyle={'dark-content'}
    translucent={false}
    animated={false}
    backgroundColor={Colors7.statusBgColor}
/>;

export default class Container extends React.PureComponent {
  render() {
    const {style, children} = this.props;
    return (
        <View style={[Styles.container, style]}>
          {statusBar}
          {children}
        </View>);
  }
}
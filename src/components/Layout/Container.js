import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import Styles, {Colors7} from "../themes/Styles";

export default class Container extends React.PureComponent {
  render() {
    const {style, children} = this.props;
    return (
        <SafeAreaView style={[Styles.container, style]}>
          <StatusBar
              barStyle={'dark-content'}
              translucent={false}
              animated={false}
              backgroundColor={Colors7.statusBgColor}
          />
          {children}
        </SafeAreaView>);
  }
}
import React from 'react';
import {StatusBar, SafeAreaView, ScrollView} from 'react-native';
import Styles, {Colors7} from "../themes/Styles";

export default class ScrollContainer extends React.PureComponent {
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
          <ScrollView style={Styles.fill}>
            {children}
          </ScrollView>
        </SafeAreaView>)
        ;
  }
}
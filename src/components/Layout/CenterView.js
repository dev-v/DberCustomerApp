import React from 'react';
import {StyleSheet, View} from 'react-native';

export default class CenterView extends React.PureComponent {
  render() {
    return <View style={styles.container}>
      {this.props.children}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
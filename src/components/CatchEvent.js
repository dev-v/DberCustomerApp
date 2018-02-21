import React from 'react';
import {PanResponder, View, Text} from 'react-native';

export default class CatchEvent extends React.PureComponent {
  componentWillMount() {
    this.responder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: () => true,
    });
  }

  render() {
    return <View {...this.responder.panHandlers} style={this.props.style}>{this.props.children || <Text/>}</View>
  }
}
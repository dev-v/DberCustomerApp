import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {BaseStyle, Colors7} from "../themes/Styles";

export default class ImageLoading extends React.PureComponent {

  static propTypes = {
    source: FastImage.propTypes.source,
    imgStyle: PropTypes.any,
  }

  state = {
    animating: true,
  }

  onLoaded = () => this.setState({animating: false});

  render() {
    const {source, imgStyle, ...other} = this.props;
    return <View {...other}>
      <FastImage resizeMode={FastImage.resizeMode.cover}
                 borderRadius={BaseStyle.borderRadius}
                 onLoadEnd={() => this.onLoaded()}
                 indicator={ActivityIndicator}
                 style={imgStyle}
                 source={source}>
      </FastImage>
      <ActivityIndicator size='large' style={StyleSheet.absoluteFill} color={Colors7.blue}
                         animating={this.state.animating}/>
    </View>
  }
}

import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';

export default class ImageEntry extends Component {

  get image() {
    return <FastImage
        style={{flex: 1}}
        source={{
          uri: this.props.uri,
          headers: {Authorization: 'someAuthToken'},
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
  }

  render() {
    return (
        <TouchableOpacity>
          {this.image}
        </TouchableOpacity>
    );
  }
}

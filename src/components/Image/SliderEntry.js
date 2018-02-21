import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {IS_IOS, Util} from "../../util/Util";
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";

const itemHorizontalMargin = Util.wp(2);
export default class SliderEntry extends React.PureComponent {

  static itemHeight = Util.hp(36);
  static sliderWidth = Util.hp(100);
  static itemWidth = Util.wp(78) + itemHorizontalMargin * 2;

  static propTypes = {
    uri: PropTypes.string,
  };

  render() {
    const {uri} = this.props;
    return (
        <View style={styles.slideInnerContainer}>
          {uri ? <FastImage resizeMode={FastImage.resizeMode.cover}
                            borderRadius={BaseStyle.borderRadius}
                            style={styles.image}
                            source={{uri: this.props.uri}}/> : <Text style={styles.noImage}>没有图片</Text>}

        </View>
    );
  }
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    height: SliderEntry.itemHeight,
    width: SliderEntry.itemWidth,
    paddingBottom: 18, // needed for shadow
    marginBottom: IS_IOS ? 0 : -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: SliderEntry.itemHeight,
    width: SliderEntry.itemWidth,
    paddingHorizontal: itemHorizontalMargin,
  },
  noImage: {
    ...TextStyle.title,
    color: Colors7.white,
  },
  // slideInnerContainer: {
  //   height: SliderEntry.itemHeight,
  //   width: SliderEntry.itemWidth,
  //   paddingHorizontal: itemHorizontalMargin,
  //   paddingBottom: 18 // needed for shadow
  // },
  // imageContainer: {
  //   flex: 1,
  //   marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
  //   backgroundColor: 'white',
  //   borderTopLeftRadius: BaseStyle.borderRadius,
  //   borderTopRightRadius: BaseStyle.borderRadius
  // },
  // shadow: {
  //   position: 'absolute',
  //   top: 0,
  //   left: itemHorizontalMargin,
  //   right: itemHorizontalMargin,
  //   bottom: 18,
  //   shadowColor: Colors7.black,
  //   shadowOpacity: 0.25,
  //   shadowOffset: {width: 0, height: 10},
  //   shadowRadius: 10,
  //   borderRadius: BaseStyle.borderRadius
  // },
  // imageContainer: {
  //   flex: 1,
  //   marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
  //   backgroundColor: 'white',
  //   borderTopLeftRadius: BaseStyle.borderRadius,
  //   borderTopRightRadius: BaseStyle.borderRadius
  // },
  // imageContainerEven: {
  //   backgroundColor: Colors7.black
  // },
  // image: {
  //   ...StyleSheet.absoluteFillObject,
  //   flex: 1,
  //   borderRadius: IS_IOS ? BaseStyle.borderRadius : 0,
  //   borderTopLeftRadius: BaseStyle.borderRadius,
  //   borderRadius: BaseStyle.borderRadius
  // },
  // // image's border radius is buggy on iOS; let's hack it!
  // radiusMask: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: BaseStyle.borderRadius,
  //   backgroundColor: 'white'
  // },
  // radiusMaskEven: {
  //   backgroundColor: Colors7.black
  // },
  // textContainer: {
  //   justifyContent: 'center',
  //   paddingTop: 20 - BaseStyle.borderRadius,
  //   paddingBottom: 20,
  //   paddingHorizontal: 16,
  //   backgroundColor: 'white',
  //   borderBottomLeftRadius: BaseStyle.borderRadius,
  //   borderBottomRightRadius: BaseStyle.borderRadius
  // },
  // textContainerEven: {
  //   backgroundColor: Colors7.black
  // },
  // title: {
  //   color: Colors7.black,
  //   fontSize: 13,
  //   fontWeight: 'bold',
  //   letterSpacing: 0.5
  // },
  // titleEven: {
  //   color: 'white'
  // },
  // subtitle: {
  //   marginTop: 6,
  //   color: Colors7.gray,
  //   fontSize: 12,
  //   fontStyle: 'italic'
  // },
  // subtitleEven: {
  //   color: 'rgba(255, 255, 255, 0.7)'
  // }
});



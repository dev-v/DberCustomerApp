import React from 'react';
import {View, StyleSheet, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Colors7} from "../components/themes/Styles";
import SliderEntry from "../components/Image/SliderEntry";
import Container from "../components/Layout/Container";
import ImageCarousel from "../components/Image/ImageCarousel";

/**
 * 共享场地服务
 */
export default class ShareServiceDetail extends React.PureComponent {

  state = {
    images: [
      'http://p31z7ux9b.bkt.clouddn.com/2123f7686d354b4d1b67b99a7f657747.jpg',
      'http://p31z7ux9b.bkt.clouddn.com/102.jpg',
      'http://p31z7ux9b.bkt.clouddn.com/102.jpg',
    ],
  }

  componentWillMount() {
    // const {service} = this.props.navigation.state.params;
    // this.state = {
    //   images: [1, 2, 3],
    //   service,
    // }
  }

  renderItem = ({item}) => {
    return <SliderEntry uri={item}/>
  }


  render() {
    const {images} = this.state;
    return (
        <ImageCarousel
            dataSource={[{title: '测了哦', images}, {title: '测试1哦', images}, {
              title: '测试2哦',
              images
            }, {
              title: '测试3哦',
              images
            }, {
              title: '测试4哦',
              images
            }, {
              title: '测试5哦',
              images
            }, {
              title: '测试6哦',
              images
            }, {
              title: '测试7哦',
              images
            }, {
              title: '测试8哦',
              images
            }, {
              title: '测试9哦',
              images
            }]}/>)
  }
}
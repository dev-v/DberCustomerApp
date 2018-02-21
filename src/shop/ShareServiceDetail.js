import React from 'react';
import {View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Colors7} from "../components/themes/Styles";
import SliderEntry from "../components/Image/SliderEntry";
import Container from "../components/Layout/Container";
import ImageCarousel from "../components/Image/ImageCarousel";
import FastImage from "react-native-fast-image";

/**
 * 共享场地服务
 */
export default class ShareServiceDetail extends React.PureComponent {

  state = {
    images: [
      'http://p31z7ux9b.bkt.clouddn.com/102.jpg',
      'https://cdn.pixabay.com/photo/2017/11/15/20/17/beach-2952391_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/02/07/17/53/poppy-3137588_1280.jpg',
    ],
  }

  componentWillMount() {
    const {service} = this.props;
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
    return (<ImageCarousel dataSource={{title: this.props.service.serviceName, images}}/>)
  }
}
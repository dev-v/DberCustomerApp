import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry from "../Image/SliderEntry";
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";
import IconButton from "../Icon/IconButton";
import Button from "../Button";
import ImageButton from "./ImageButton";

/**
 * 共享场地服务
 */
export default class ImageCarousel extends React.PureComponent {

  state = {
    bottom: undefined,
    uris: undefined,
    buttonObj: undefined,
    title: undefined,
  }

  renderItem = ({item}) => {
    return <SliderEntry uri={item}/>
  }

  onSnapToItem = (idx) => {
    const {buttonObj} = this.state;
    for (let i in buttonObj) {
      if (buttonObj[i].checkIdx(idx)) {
        return;
      }
    }
  }

  componentWillMount() {
    const {dataSource} = this.props;
    if (dataSource) {
      const uris = [];
      let buttonObj, bottom;
      if (Array.isArray(dataSource)) {
        bottom = [], buttonObj = [];
        let start = 0;
        dataSource.map((data) => {
          const {title, images} = data, end = start + images.length;

          bottom.push(<ImageButton
              active={start == 0} key={title} ref={ref => buttonObj.push(ref)} title={title} start={start} end={end}
              onPress={({start}) => {
                this.carousel.snapToItem(start);
              }}
              onActive={({title}) => {
                this.setState({
                  ...this.state,
                  title,
                });
              }}/>);

          uris.push(...images);

          start = end;
        });
      }

      this.setState({
        uris, buttonObj, bottom
      });
    }
  }

  render() {
    const {title, bottom, uris} = this.state;
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Carousel
              slideStyle={{alignSelf: 'center'}}
              ref={ref => this.carousel = ref}
              data={uris}
              renderItem={this.renderItem}
              sliderWidth={SliderEntry.sliderWidth}
              itemWidth={SliderEntry.itemWidth}
              onSnapToItem={this.onSnapToItem}

              inactiveSlideScale={0.95}
              inactiveSlideOpacity={1}
              activeSlideAlignment={'center'}
              activeAnimationType={'spring'}
              enableMomentum={true}
              activeAnimationOptions={{
                friction: 4,
                tension: 5
              }}
              layout='default'

          />
          <View style={styles.bottom}>
            {bottom}
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors7.black,
    justifyContent: 'space-between',
  },
  title: {
    ...TextStyle.subTitle,
    color: Colors7.white,
    padding: 6,
  },
  carousel: {
    alignSelf: 'flex-end',
  },
  bottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 6,
  },
});
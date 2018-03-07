import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry from "../Image/SliderEntry";
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";
import IconButton from "../Icon/IconButton";
import Button from "../Form/Button";
import ImageButton from "./ImageButton";
import ImageButtons from "./ImageButtons";
import {Util} from "../../util/Util";

/**
 * 共享场地服务
 */
export default class ImageCarousel extends React.PureComponent {

  state = {
    uris: [],
    idx: 0,
  }

  renderItem = ({item}) => {
    return <SliderEntry uri={item}/>
  }

  onSnapToItem = (idx) => {
    this.setState({
      ...this.state,
      title: this.getTitle(idx),
      idx,
    });
  }


  componentWillMount() {
    let {dataSource} = this.props;
    if (dataSource) {
      if (Array.isArray(dataSource)) {
        if (dataSource.length == 1) {
          dataSource = dataSource[0];
        } else {
          const uris = [], btnDataSource = [];
          let start = 0;
          dataSource.map((data) => {
            const {title, images} = data;
            let end;
            if (images && images.length > 0) {
              end = start + images.length;
              uris.push(...images);
              btnDataSource.push({title, start, end});
            } else {
              end = start + 1;
              uris.push(null);
              btnDataSource.push({title, start, end, offset: 1});
            }
            start = end;
          });

          this.setState({
            uris, btnDataSource, isArray: true,
          });
          return;
        }
      }

      // 非数组数据源
      const {title, images = []} = dataSource;
      this.setState({
        title,
        uris: images.length == 0 ? [null] : images,
      });
      this.triggerTitle(title)
    }
  }

  triggerTitle = (title) => {
    if (this.props.triggerTitle && title != this.state.title) {
      const trigger = setTimeout(() => {
        this.props.triggerTitle(title);
        clearTimeout(trigger);
      }, 500);
    }
  }

  getTitle = (idx) => {
    const {btnDataSource, title} = this.state;
    if (btnDataSource) {
      for (let i in btnDataSource) {
        const {title, start, end} = btnDataSource[i];
        if (Util.range(idx, start, end)) {
          this.triggerTitle(title);
          return title;
        }
      }
    } else {
      return title;
    }
  }

  onButtonPress = ({title, start}) => {
    this.triggerTitle(title);
    this.carousel.snapToItem(start);
    this.setState({
      ...this.state,
      title,
      idx: start,
    });
  }

  render() {
    const {title, uris, idx, btnDataSource, isArray} = this.state;
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{title || this.getTitle(idx)}</Text>
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

              firstItem={idx}
          />
          <View style={styles.bottom}>
            {isArray ?
                <ImageButtons dataSource={btnDataSource} idx={idx} onPress={this.onButtonPress}/> :
                <Pagination dotsLength={uris.length} activeDotIndex={idx} dotColor={Colors7.white}
                            dotStyle={styles.dot}
                            inactiveDotColor={Colors7.gray}/>
            }
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: BaseStyle.borderRadius
  },
  title: {
    ...TextStyle.title,
    color: Colors7.white,
    padding: 6,
  },
  bottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 6,
  },
});

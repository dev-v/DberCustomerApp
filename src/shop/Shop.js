import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../components/themes/Styles";
import AMap from "../components/AMap3D/AMap";
import ShopMarker from "./ShopMarker";
import ShopMapDetail from "./detail/ShopMapDetail";
import {CircleMarker} from "../components/AMap3D/Markers";
import {Util} from "../util/Util";
import Container from "../components/Layout/Container";
import ShopService from '../service/ShopService';

//店铺收藏功能放shop模块
const noService = 8;
const staticsServie = 9;
// zoomLevel <10 不作处理 <14 统计
export default class Shop extends React.PureComponent {
  state = {
    activeMarker: undefined,
    content: undefined,
  }

  closeBottom = () => {
    const {activeMarker} = this.state;
    if (activeMarker) {
      activeMarker.setActive(false);
      this.setState({
        ...this.state,
        activeMarker: undefined,
        showShopDetail: false,
      });
    }
  }

  // triggerMapMove = false;
  onChange = (location, userLocation) => {
    // const {activeMarker} = this.state;
    //
    // if (activeMarker && this.triggerMapMove) {
    //   activeMarker.setActive(false);
    //   this.state.activeMarker = undefined;
    //   this.state.activeData = undefined;
    //   this.triggerMapMove = false;
    // }
    //
    // if (this.state.activeMarker) {
    //   this.triggerMapMove = true;
    // }

    this.setState({
      ...this.state,
      content: <Text style={TextStyle.base}>搜索中...</Text>,
    });

    const {zoomLevel, latitude, longitude} = location;
    if (zoomLevel < noService) {
      this.setState({
        ...this.state,
        content: <Text style={TextStyle.base}>没有找到门店，放大地图后试试！</Text>,
        markers: undefined,
      });
      return;
    }
    if (zoomLevel < staticsServie) {
      ShopService.count(location).then(({response: count}) => {
        this.setState({
          ...this.state,
          content: <Text style={TextStyle.base}>{`附近共找到${count}家店铺！`}</Text>,
          markers: CircleMarker({latitude, longitude}, zoomLevel, count + ''),
        });
      });
    } else {
      ShopService.shops(location).then(({response = []}) => {
        this.setState({
          ...this.state,
          content: <Text style={TextStyle.base}>{`附近共找到${response.length}家店铺！`}</Text>,
          markers: this.generateMarkers(response),
        });
      });
    }
  }

  renderShopDetail = (activeData, activeMarker) => {
    if (!Util.isSame(this.state.activeData, activeData)) {
      storage.load({key: 'shop', id: activeData.id}).then(activeData => {
        this.setState({
          ...this.state,
          activeMarker,
          activeData,
          showShopDetail: true,
        });
      });
    }
  }

  generateMarkers = (dataSource) => {
    const unit = AMap.coordinateUnit;
    return dataSource.map((data) => {
      const {id, lat, lng, name} = data;
      return <ShopMarker
          key={id}
          text={name}
          coordinate={{latitude: lat / unit, longitude: lng / unit,}}
          onPress={(marker) => {
            this.renderShopDetail(data, marker);
          }}/>
    });
  }

  render() {
    const {markers, content, activeData, showShopDetail} = this.state;
    return (
        <Container style={styles.container}>
          <AMap config={{zoomLevel: 7, onPress: this.closeBottom}} onChange={this.onChange} markers={markers}>
            <View style={styles.content}>
              {content}
            </View>
            <ShopMapDetail shop={activeData} show={showShopDetail}/>
          </AMap>
        </Container>);
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0, paddingHorizontal: 0, paddingVertical: 0
  },
  content: {
    backgroundColor: Colors7.white,
    borderRadius: BaseStyle.borderRadius,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 9,
  }
});

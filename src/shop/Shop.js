import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../components/themes/Styles";
import AMap from "../components/AMap3D/AMap";
import ShopMarker from "./ShopMarker";
import ShopMapDetail from "./ShopMapDetail";
import {CircleMarker} from "../components/AMap3D/Markers";
import {Util} from "../util/Util";
import Container from "../components/Layout/Container";


//店铺收藏功能放shop模块
const noService = 8;
const staticsServie = 9;
// zoomLevel <10 不作处理 <14 统计
export default class Shop extends React.PureComponent {
  state = {
    activeMarker: undefined,
    content: undefined,
    activeShop: undefined,//激活店铺详情
  }

  closeBottom = () => {
    const {activeMarker} = this.state;
    if (activeMarker) {
      activeMarker.setActive(false);
      this.setState({
        ...this.state,
        activeMarker: undefined,
        activeShop: undefined,
        activeData: undefined,
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
    //   this.state.activeShop = undefined;
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
        content: <Text style={TextStyle.base}>没有找到服务，放大地图后试试！</Text>,
        markers: undefined,
      });
      return;
    }
    if (zoomLevel < staticsServie) {
      // load-data
      const count = 20;
      this.setState({
        ...this.state,
        content: <Text style={TextStyle.base}>{`附近共找到${count}家店铺！`}</Text>,
        markers: CircleMarker({latitude, longitude}, zoomLevel, count),
      });
    } else {
      const dataSource = [{id: 1, lat: 30605382, lng: 104056427, name: '传奇健身（凯德天府店）'}, {
        id: 2,
        lat: 30537549,
        lng: 104082147,
        name: '奇迹健身（苏宁店）',
        price: 5,
        address: '我在这里非理发都是浪费手机费拉升房间打扫是否'
      }], count = dataSource.length;
      this.setState({
        ...this.state,
        content: <Text style={TextStyle.base}>{`附近共找到${count}家店铺！`}</Text>,
        markers: this.generateMarkers(dataSource),
      });
    }
  }

  renderShopDetail = (activeData, activeMarker) => {
    if (!Util.isSame(this.state.activeData, activeData)) {
      this.setState({
        ...this.state,
        activeShop: <ShopMapDetail shop={activeData}/>,
        activeMarker,
        activeData,
      });
      // this.triggerMapMove = false;
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
    const {markers, activeShop, content} = this.state;
    return (
        <Container style={styles.container}>
          <AMap config={{zoomLevel: 7, onPress: this.closeBottom}} onChange={this.onChange} markers={markers}>
            <View style={styles.content}>
              {content}
            </View>
            {activeShop}
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
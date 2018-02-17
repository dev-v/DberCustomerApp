import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Circle, Marker} from 'react-native-amap3d';
import IconButton from "../components/Icon/IconButton";
import {BaseStyle, Colors7, TextStyle} from "../components/themes/Styles";
import Styles from "../components/themes/Styles";
import CenterView from "../components/Layout/CenterView";
import Icon, {Icons} from "../components/Icon/Icon";
import AMap from "../components/AMap3D/AMap";
import {RectangleMarker} from "../components/AMap3D/Invalide/RectangleMarker";
import Modals from "../components/Modal/Modals";
import ShopMarker from "./ShopMarker";
import ShopService from "./ShopService";
import ShopMapDetail from "./ShopMapDetail";
import {CircleMarker} from "../components/AMap3D/Markers";
import {Util} from "../util/Util";


//店铺收藏功能放shop模块
const noService = 10;
const staticsServie = 14;
// zoomLevel <10 不作处理 <14 统计
export default class Shop extends React.PureComponent {
  state = {
    activeMarker: undefined,
    content: undefined,
    activeShop: undefined,//激活店铺详情
  }

  onChange = (location, userLocation) => {
    const {activeMarker} = this.state;

    if (activeMarker && this.triggerMapMove) {
      activeMarker.setActive(false);
      this.state.activeMarker = undefined;
      this.state.activeShop = undefined;
      this.state.activeData = undefined;
      this.triggerMapMove = false;
    }

    if (this.state.activeMarker) {
      this.triggerMapMove = true;
    }

    this.setState({
      ...this.state,
      content: <Text style={TextStyle.base}>正在加载数据...</Text>,
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
      }], count = dataSource.length;
      this.setState({
        ...this.state,
        content: <Text style={TextStyle.base}>{`附近共找到${count}家店铺！`}</Text>,
        markers: this.generateMarkers(dataSource),
      });
    }
  }

  triggerMapMove = false;
  renderShopDetail = (activeData, activeMarker) => {
    if (!Util.isSame(this.state.activeData, activeData)) {
      this.setState({
        ...this.state,
        activeShop: <ShopMapDetail shop={activeData}/>,
        activeMarker,
        activeData,
      });
      this.triggerMapMove = false;
    }
  }

  generateMarkers = (dataSource) => {
    const unit = AMap.coordinateUnit;
    return dataSource.map((data) => {
      const {id, lat, lng, name} = data;
      return <ShopMarker key={id} text={name}
                         coordinate={{latitude: lat / unit, longitude: lng / unit,}}
                         onPress={(marker) => {
                           this.renderShopDetail(data, marker);
                         }}/>
    });
  }

  render() {
    const {markers, activeShop, content} = this.state;
    return (<AMap onChange={this.onChange} markers={markers}>
      <View style={styles.content}>
        {content}
      </View>
      {activeShop}
    </AMap>);
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    borderRadius: BaseStyle.borderRadius,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 6,
  }
});
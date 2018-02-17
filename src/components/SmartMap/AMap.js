import React from 'react';
import {StyleSheet, Text, View, NativeAppEventEmitter, Platform} from 'react-native';
import AMapLocation from 'react-native-smart-amap-location'
import AMap from 'react-native-smart-amap'
import Icon, {Icons} from "../Icon/Icon";
import IconButton from "../Icon/IconButton";
import {Colors7} from "../themes/Styles";

let userLocation;

export default class AMap extends React.PureComponent {

  componentDidMount() {
    NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult);
    // NativeAppEventEmitter.addListener('amap.onPOISearchDone', this._onPOISearchDone);
    //NativeAppEventEmitter.addListener('amap.onPOISearchFailed', this._onPOISearchFailed)
  }

  _onLocationResult = (result) => {
    if (result.error) {
      console.log(`map-错误代码: ${result.error.code}, map-错误信息: ${result.error.localizedDescription}`)
    }
    else {
      if (result.formattedAddress) {
        console.log(`map-格式化地址 = ${result.formattedAddress}`)
      }
      else {
        console.log(`map-纬度 = ${result.coordinate.latitude}, map-经度 = ${result.coordinate.longitude}`)
        this._coordinate = {
          latitude: result.coordinate.latitude,
          longitude: result.coordinate.longitude,
        }
        this._amap.setOptions({
          zoomLevel: 18.1,
        })
        this._amap.setCenterCoordinate(this._coordinate)
      }
    }
  }

  static coordinateUnit = 1000000;

  state = {}

  /**
   * 地图状态变化事件
   *
   * @param {{
     *   nativeEvent: {
     *     longitude: number,
     *     latitude: number,
     *     rotation: number,
     *     zoomLevel: number,
     *     tilt: number,
     *   }
     * }}
   */
  onLocation = ({nativeEvent}) => {
    if (!userLocation) {
      userLocation = nativeEvent;
      // this.toUserLocation();
    }
    userLocation = nativeEvent;
  }

  getUserLocation = () => {
    return userLocation;
  }


  // this.mapView.animateTo({
  //   tilt: 45,
  //   rotation: 90,
  //   zoomLevel: 18,
  //   coordinate: {
  //     latitude: 39.97837,
  //     longitude: 116.31363,
  //   },
  // })
  toUserLocation = () => {
    const {longitude, latitude, rotation, zoomLevel, tilt} = userLocation;
    this.map.animateTo({
      tilt,
      rotation,
      zoomLevel,
      coordinate: {
        longitude: longitude < 0 ? -longitude : longitude,
        latitude,
      }
    }, 500);
  }


  /**
   * 地图状态变化事件
   *
   * @param {{
     *   nativeEvent: {
     *     longitude: number,
     *     latitude: number,
     *     rotation: number,
     *     zoomLevel: number,
     *     tilt: number,
     *   }
     * }}
   */
  onStatusChange = ({nativeEvent}) => {
    nativeEvent
    // this.setCoordinate(nativeEvent);
  }
  nativeEvent


  /**
   * 地图状态变化完成事件
   *
   * @param {{
     *   nativeEvent: {
     *     longitude: number,
     *     latitude: number,
     *     longitudeDelta: number,
     *     latitudeDelta: number,
     *     rotation: number,
     *     zoomLevel: number,
     *     tilt: number,
     *   }
     * }}
   */
  onStatusChangeComplete = ({nativeEvent}) => {
    this.props.onChange && this.props.onChange(nativeEvent, userLocation);
  }

  _onLayout = (props) => {
    console.warn(props)
  }

  _onDidMoveByUser = (e) => {
    console.warn(e)
  }


  render() {
    const {config, style, children, markers} = this.props;
    return (
        <View style={styles.container}>
          <AMap
              ref={component => this._amap = component}
              style={{flex: 1,}}
              options={{
                // frame: {
                //     width: deviceWidth,
                //     height: (deviceHeight - 64) - 50 * 5
                // },
                showsUserLocation: false,
                userTrackingMode: Platform.OS == 'ios' ? AMap.constants.userTrackingMode.none : null,
                // centerCoordinate: {
                //     latitude: this._coordinate.latitude,
                //     longitude: this._coordinate.longitude,
                // },
                zoomLevel: 18.1,
                centerMarker: Platform.OS == 'ios' ? 'icon_location' : 'poi_marker',
              }}
              onLayout={this._onLayout}
              onDidMoveByUser={this._onDidMoveByUser}
          >
            {markers}
          </AMap>
          <Icon style={centerIconStyle} name='location-pin' source={Icons.Entypo}/>
          <View style={styles.bottom}>
            <View style={styles.locationWrapStyle}>
              <IconButton size={IconButton.size.large} name='my-location' iconStyle={{paddingVertical: 5,}}
                          source={Icons.MaterialIcons}
                          onPress={this.toUserLocation}/>
            </View>
            <View style={{...childrenStyle, ...style}}>
              {children}
            </View>
          </View>
        </View>
    );
  }
}

const centerIconStyle = {
  position: 'absolute',
  alignSelf: 'center',
  fontSize: 32,
  color: Colors7.cyan,
}

const childrenStyle = {
  backgroundColor: 'white',
  width: '100%',
  marginTop: 6
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  bottom: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: '98%',
    marginHorizontal: '1%',
    bottom: 3,
  },
  locationWrapStyle: {
    borderRadius: 560,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MapView} from 'react-native-amap3d';
import Icon, {IconSource} from "../Icon/Icon";
import IconButton from "../Icon/IconButton";
import {Colors7} from "../themes/Styles";

let userLocation;

export default class AMap extends React.PureComponent {

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
      this.toUserLocation();
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

  render() {
    const {config, style, children, markers} = this.props;
    return (
        <View style={styles.container}>
          <MapView
              showsLocationButton={false}
              showsBuildings={false}
              showsZoomControls={false}

              rotateEnabled={false}
              tiltEnabled={false}
              zoomEnabled={true}

              locationEnabled
              locationInterval={1000 * 30}

              maxZoomLevel={18}
              minZoomLevel={5}
              zoomLevel={15}

              // limitRegion={}

              onLocation={this.onLocation}
              // onStatusChange={this.onStatusChange}
              onStatusChangeComplete={this.onStatusChangeComplete}
              // onAnimateFinish={this.onAnimateFinish}

              style={styles.map}

              {...config}

              ref={ref => this.map = ref}

              children={markers}
          />
          {centerIcon}
          <View style={styles.bottom}>
            <View style={styles.locationWrapStyle}>
              <IconButton size={IconButton.size.large} name='my-location' iconStyle={{paddingVertical: 5,}}
                          source={IconSource.MaterialIcons}
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


const centerIcon = <Icon style={{
  position: 'absolute',
  alignSelf: 'center',
  fontSize: 32,
  color: Colors7.cyan,
  padding: 0,
  margin: 0,
}} name='location-pin' source={IconSource.Entypo}/>;

const childrenStyle = {
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
    backgroundColor: Colors7.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

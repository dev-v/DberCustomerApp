import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Marker} from 'react-native-amap3d';
import {BaseStyle, Colors7} from "../components/themes/Styles";
import {Polygon, Svg} from 'react-native-svg';

let activeMarker;
export default class ShopMarker extends React.PureComponent {
  onPress = () => {
    this.props.onPress && this.props.onPress(this);
    this.setActive(true)
  }

  setActive = (active) => {
    let iconStyle, pol;
    if (active) {
      activeMarker && activeMarker.setActive(false);
      activeMarker = this;
      iconStyle = styles.activeMarker;
      pol = activePolygon;
    } else {
      iconStyle = styles.marker;
      pol = polygon;
    }
    this.setState({
      icon: () => <View style={styles.container}>
        <View style={iconStyle}><Text style={styles.markerText}>{this.props.text}</Text></View>
        <Svg width='10' height='10'>
          {pol}
        </Svg>
      </View>
    });
  }

  componentWillMount() {
    this.setActive(this.props.active)
  }

  render() {
    return (<Marker infoWindowDisabled={true} {...this.props} onPress={this.onPress} icon={this.state.icon}/>)
  }
}

const polygon = <Polygon points="0,0 5,10 10,0" fill={Colors7.lime}/>;

const activePolygon = <Polygon points="0,0 5,10 10,0" fill={Colors7.orange}/>;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: BaseStyle.borderRadius,
  },
  marker: {
    alignItems: 'center',
    backgroundColor: Colors7.lime,
    borderRadius: BaseStyle.borderRadius,
    padding: 5,
  },
  activeMarker: {
    backgroundColor: Colors7.orange,
    alignItems: 'center',
    borderRadius: BaseStyle.borderRadius,
    padding: 5,
  },
  markerText: {
    color: '#fff',
  }
});
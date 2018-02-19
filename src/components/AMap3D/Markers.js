import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Marker, Circle} from 'react-native-amap3d';
import {BaseStyle, Colors7} from "../themes/Styles";

const styles = StyleSheet.create({
  text: {
    color: Colors7.white,
    fontSize: 36,
    fontFamily: BaseStyle.fontFamily,
    paddingBottom: 8,
  }
});

const CircleMarker = (coordinate, zoomLevel, text) => {
  const radius = 100000000000 / Math.pow(zoomLevel, 7);
  const res = [<Circle key={Math.random()} coordinate={coordinate}
                       fillColor={'#d9f7be'}
                       radius={radius}/>];
  text && res.push(<Marker clickDisabled={true} infoWindowDisabled={true} key={Math.random()} coordinate={coordinate}
                           icon={() => <Text style={styles.text}>{text}</Text>}/>);
  return res;
};

export {CircleMarker};
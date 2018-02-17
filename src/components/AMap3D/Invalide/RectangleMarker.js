import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modals from "../../Modal/Modals";
import {BaseStyle, Colors7} from "../../themes/Styles";

class RectangleMarker extends React.PureComponent {

  render() {
    return (
        <View style={styles.marker}>
          <TouchableOpacity style={{padding: 20}} onPress={() => {
            Modals.alert('1111')
          }}>
            <View>
              <TouchableOpacity style={{padding: 30}} onPress={() => {
                Modals.alert('1111')
              }}>
                <Text style={styles.markerText}>{this.props.text}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>)
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    backgroundColor: Colors7.lime,
    alignItems: 'center',
    borderRadius: BaseStyle.borderRadius,
    padding: 5,
    zIndex: 999999999,
  },
  markerText: {
    color: '#fff',
  }
});

export {RectangleMarker};


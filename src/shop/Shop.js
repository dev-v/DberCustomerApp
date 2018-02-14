import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconButton from "../components/Icon/IconButton";
import {BaseStyle} from "../components/themes/Styles";


const styles = StyleSheet.create({
  map: {},
  bottom: {},
});
//店铺收藏功能放shop模块
export default class Shop extends React.PureComponent {

  static navigationOptions = {
    title: '成都市',
    headerLeft: <IconButton name='md-qr-scanner'/>,
  };

  render() {
    return (<View style={BaseStyle.container}>
      <View style={styles.map}><Text>aaa</Text></View>
      <View style={styles.bottom}></View>
    </View>);
  }
}

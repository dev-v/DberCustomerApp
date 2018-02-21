import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Avatar from 'react-native-interactive-avatar';
import IconButton from "../../components/Icon/IconButton";
import CheckLabel from "../../components/Icon/CheckLabel";
import Styles, {TextStyle} from "../../components/themes/Styles";
import {IconSource} from "../../components/Icon/Icon";
import Container from "../../components/Layout/Container";

const size = IconButton.size.normal;
export default class Setting extends React.PureComponent {
  render() {
    return (<Container>
      <View style={styles.head}>
        <Avatar username='abc' size={'default'} style={{marginBottom: 10}}
                placeholderURI='http://p31z7ux9b.bkt.clouddn.com/2123f7686d354b4d1b67b99a7f657747.jpg'/>
        <Text style={TextStyle.title}>陈先生</Text>
      </View>
      <View style={styles.row}>
        <IconButton size={size} name='perm-identity' text='头像认证' source='MaterialIcons'/>
        <CheckLabel checked={false} text='未认证'/>
      </View>
      <View style={styles.row}>
        <IconButton size={size} name='timer-sand' source='MaterialCommunityIcons' text='运动积分'/>
        <CheckLabel text='10'/>
      </View>
      <View style={styles.row}>
        <IconButton size={size} name='badge' source={IconSource.SimpleLineIcons} text='元素勋章'/>
        <CheckLabel text='氢'/>
      </View>
    </Container>);
  }
}

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    marginBottom: 56,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Avatar from 'react-native-interactive-avatar';
import IconButton from "../components/Icon/IconButton";
import CheckLabel from "../components/Icon/CheckLabel";
import {TextStyle} from "../components/themes/Styles";
import {IconSource} from "../components/Icon/Icon";
import Container from "../components/Layout/Container";
import FlexBetween from "../components/Layout/FlexBetween";

const size = IconButton.size.normal;
export default class Setting extends React.PureComponent {
  render() {
    return (<Container>
      <View style={styles.head}>
        <Avatar username='abc' size={'default'}
                placeholderURI='http://p31z7ux9b.bkt.clouddn.com/2123f7686d354b4d1b67b99a7f657747.jpg'/>
        <Text style={TextStyle.title}>陈先生</Text>
      </View>
      <FlexBetween>
        <IconButton size={size} name='perm-identity' text='头像认证' source='MaterialIcons'/>
        <CheckLabel checked={false} text='未认证'/>
      </FlexBetween>
      <FlexBetween>
        <IconButton size={size} name='timer-sand' source='MaterialCommunityIcons' text='运动积分'/>
        <CheckLabel text='10'/>
      </FlexBetween>
      <FlexBetween>
        <IconButton size={size} name='badge' source={IconSource.SimpleLineIcons} text='元素勋章'/>
        <CheckLabel text='氢'/>
      </FlexBetween>
    </Container>);
  }
}

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    marginBottom: 36,
  }
});

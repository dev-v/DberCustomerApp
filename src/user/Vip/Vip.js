import React from 'react';
import {View} from 'react-native';
import Styles from "../../components/themes/Styles";
import Card from "../../components/Layout/Card";
import ShopCard from "./ShopCard";
import GlobalCard from "./GlobalCard";

export default class Vip extends React.PureComponent {
  render() {
    return (<View style={Styles.container}>
      <Card title='全城卡' extra={<GlobalCard/>}>
        您还没有全城卡！
      </Card>
      <Card title='店铺会员卡' extra={<ShopCard/>}>您还没有会员卡！</Card>
    </View>);
  }
}
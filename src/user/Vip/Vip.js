import React from 'react';
import Card from "../../components/Layout/Card";
import ShopCard from "./ShopCard";
import GlobalCard from "./GlobalCard";
import Container from "../../components/Layout/Container";

export default class Vip extends React.PureComponent {
  render() {
    return (<Container>
      <Card title='全城卡' extra={<GlobalCard/>}>
        您还没有全城卡！
      </Card>
      <Card title='店铺会员卡' extra={<ShopCard/>}>您还没有会员卡！</Card>
    </Container>);
  }
}
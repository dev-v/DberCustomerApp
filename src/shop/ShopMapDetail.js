import React from 'react';
import {View} from 'react-native';
import ShopService from "./ShopService";
import Calendars from "../components/Time/Calendars";
import Card from "../components/Layout/Card";


export default class ShopMapDetail extends React.PureComponent {
  render() {
    const {shop} = this.props;
    const {id} = shop;
    return (<Card title={shop.name} style={{marginTop: 3}}>
      <ShopService shopId={id}/>
    </Card>);
  }
}
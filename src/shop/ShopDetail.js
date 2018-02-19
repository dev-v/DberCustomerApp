import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import ShopService from "./ShopService";
import Card from "../components/Layout/Card";
import Icon from "../components/Icon/Icon";
import {Colors7, TextStyle} from "../components/themes/Styles";
import {Time, Util} from "../util/Util";

const extra = <Icon name='chevron-right' source={Icon.source.Entypo}/>;

export default class ShopDetail extends React.PureComponent {


  getTitle = (shop) => {
    const {name, businessBegin, businessEnd, address} = shop;
    return <View style={styles.title}>
      <View>
        <Text style={TextStyle.subTitle}>
          {name}
        </Text>
        <Text style={TextStyle.extra}>
          {`营业时段：${Time.formatTime(businessBegin)} - ${Time.formatTime(businessEnd)}`}
        </Text>
        <Text style={TextStyle.small}>{address}</Text>
      </View>
    </View>
  };

  onTitlePress = () => {
    this.props.navigation.navigate('ShopDetail', {shop: this.props.navigation.state.params.shop});
  }


  render() {
    const {shop} = this.props.navigation.state.params;
    const {id, address, price} = shop;
    const title = this.getTitle(shop);

    return (
        <Card title={title} style={{marginTop: 3}}
              extra={<View style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
                {extra}
                <Text style={{...TextStyle.small, color: Colors7.volcano}}>
                  {`${price}元/门店价`}
                </Text>
              </View>} onTitlePress={this.onTitlePress}>
          <ShopService shopId={id}/>
        </Card>);
  }
}

const styles = StyleSheet.create({
  title: {flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, marginRight: 22}
});
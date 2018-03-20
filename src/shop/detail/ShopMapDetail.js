import React from 'react';
import {View, Text, StyleSheet, Animated, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import Card from "../../components/Layout/Card";
import {Colors7, TextStyle} from "../../components/themes/Styles";
import {Time} from "../../util/Util";
import {Icons} from "../../components/Icon/Icon";
import PropTypes from 'prop-types';
import {AnimatedConfig} from "../../components/Config";
import Label from "../../components/Layout/Label";
import ShopDetail from "./ShopDetail";

class ShopMapDetail extends React.PureComponent {

  static propTypes = {
    shop: PropTypes.object,
    show: PropTypes.bool,
  }

  static defaultProps = {
    show: false,
    shop: {},
  }
  state = {
    height: new Animated.Value(0),
  }

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
    ShopDetail.setShop(this.props.shop);
    this.props.navigation.navigate('ShopDetail');
  }

  getExtra = (shop) => {
    return <Text style={{...TextStyle.small, color: Colors7.volcano}}>
      {`${shop.price}元/门店价`}
    </Text>
  }

  componentWillReceiveProps(nextProps) {
    const {id} = nextProps.shop;
    id && storage.load({key: 'shopServices', id}).then(services => {
      this.setState({
        services,
      });
    });
  }

  render() {
    const {shop, show} = this.props;
    const {services = [], height} = this.state;

    Animated.timing(height, {
      ...AnimatedConfig.cubic,
      toValue: show ? 190 : 0,
    }).start();

    return (<Animated.View style={{height}}>
      <Card title={this.getTitle(shop)}
            extra={<View style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
              {Icons.arrowRight}
              {this.getExtra(shop)}
            </View>} onTitlePress={this.onTitlePress}>
        <View style={Label.labelContentStyle}>
          {
            Label.getLabels({dataSource: services, field: 'serviceName'})
          }
        </View>
      </Card>
    </Animated.View>);
  }
}

const styles = StyleSheet.create({
  title: {flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, marginRight: 22},
});

export default withNavigation(ShopMapDetail);

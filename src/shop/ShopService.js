import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import Label from "../components/Label";
import Card from "../components/Layout/Card";
import FlexBetween from "../components/Layout/FlexBetween";
import {BaseStyle, Colors7, TextStyle} from "../components/themes/Styles";
import IconButton from "../components/Icon/IconButton";
import Icon from "../components/Icon/Icon";
import Hr from "../components/Hr";
import Styles from "../components/themes/Styles";
import ShareServiceDetail from "./ShareServiceDetail";
import Modals, {ModalsStyle} from "../components/Modal/Modals";
import BookingServiceDetail from "./BookingServiceDetail";

class ShopService extends React.PureComponent {

  state = {
    services: [{serviceName: '健身', group: 2, shareSite: 1, key: '1'}, {
      key: '2',
      serviceName: '台球',
      group: 1,
      shareSite: 2,
      price: 5,
    }, {serviceName: '瑜伽', group: 1, shareSite: 1, key: '3'}],
  }

  componentWillMount() {
    const {shopId} = this.props;
    const {services} = this.state;
  }

  renderItem = ({item}) => {
    const {serviceName, group, shareSite, price} = item;
    const isShareSite = shareSite == 1;
    const snt = <Text style={TextStyle.base}>{serviceName}</Text>;
    return (<TouchableOpacity style={BaseStyle.flexBetween} onPress={() => {
      if (isShareSite) {
        Modals.open(<ShareServiceDetail service={item}/>, ModalsStyle.image);
      } else {
        BookingServiceDetail.setHeaderTitle(`${serviceName}(${price}元/小时)`);
        this.props.navigation.navigate('BookingServiceDetail', item)
      }
    }}>
      {isShareSite ? snt : <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {snt}
        <Text style={TextStyle.small}>{`(${price}元/小时)`}</Text>
      </View>}
      <View style={{flexDirection: 'row'}}>
        {isShareSite && shareSiteLabel}
        {group == 1 && groupLabel}
      </View>
    </TouchableOpacity>);
  }

  render() {
    const {services} = this.state;
    return <View>
      <FlatList ItemSeparatorComponent={Hr} data={services} renderItem={this.renderItem}/>
    </View>;

  }
}

const groupLabel =
    <Label text='团体课程'/>
;
const shareSiteLabel =
    <Label text='场地共享'/>
;

export default withNavigation(ShopService);
export {groupLabel};
import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Label from "../../components/Layout/Label";
import {BaseStyle, TextStyle} from "../../components/themes/Styles";
import Hr from "../../components/Layout/Hr";
import ShareServiceDetail from "./ShareServiceDetail";
import Modals, {ModalsStyle} from "../../components/Modal/Modals";
import BookingServiceDetail from "./BookingServiceDetail";
import {Util} from "../../util/Util";

class ShopService extends React.PureComponent {

  state = {
    services: [],
  }

  componentWillReceiveProps(nextProps) {
    const {shop} = nextProps;
    storage.load({key: 'shopServices', id: shop.id}).then(services => {
      Util.additionalField(services, 'serviceName')
      this.setState({
        services,
      });
    });
  }

  renderItem = ({item}) => {
    const {serviceName, group, shareSite, price} = item;
    const isShareSite = shareSite == 1;
    const snt = <Text style={TextStyle.base}>{serviceName}</Text>;
    return (<TouchableOpacity key={serviceName} style={BaseStyle.flexBetween} onPress={() => {
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
    return <FlatList ItemSeparatorComponent={Hr} data={services} renderItem={this.renderItem}/>;

  }
}

const groupLabel = <Label text='团体课程'/>;
const shareSiteLabel = <Label text='场地共享'/>;

export default withNavigation(ShopService);
export {groupLabel};

import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Card from "../../components/Layout/Card";
import Button from "../../components/Form/Button";
import Styles, {BaseStyle, TextStyle} from "../../components/themes/Styles";
import Hr from "../../components/Layout/Hr";

class GlobalCardBuy extends React.PureComponent {

  state = {
    dataSource: [{key: '1', name: '一年卡', days: 360, price: 3600}, {key: '2', name: '半年卡', days: 180, price: 2000}],
  }

  renderItem = (data) => {
    const {name, days, price} = data.item;
    return <View>
      <Text style={TextStyle.subTitle}>{name}</Text>
      <View style={Styles.flexBetween}>
        <Text style={TextStyle.base}>可使用天数</Text>
        <Text>{days}</Text>
      </View>
      <View style={Styles.flexBetween}>
        <Text style={TextStyle.base}>价格（￥）</Text>
        <Text>{price}</Text>
      </View>
      <Button>购买</Button>
    </View>;
  }

  render() {
    return (<Card title='全城卡购买'>
      <FlatList ItemSeparatorComponent={Hr} data={this.state.dataSource} renderItem={this.renderItem}/>
    </Card>);
  }
}

export default GlobalCardBuy;

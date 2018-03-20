import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../../components/themes/Styles";
import Hr from "../../components/Layout/Hr";
import IconButton from "../../components/Icon/IconButton";
import {IconSource} from "../../components/Icon/Icon";
import {Util} from "../../util/Util";

export default class ShopCard extends React.PureComponent {

  state = {}

  componentWillMount() {
    const {id} = this.props.shop;
    Util.runs(storage.load({key: 'platShopVipStrategy'}), storage.load({
      key: 'shopCards',
      id,
    })).then(([strategies, cards]) => {
      cards.map(card => {
        const {id, cardName} = card;
        card.days = strategies[id].days;
        card.key = cardName;
      });
      this.setState({
        cards,
      });
    });
  }

  renderItem = ({item}) => {
    const {cardName, days, price} = item;
    return (<View style={BaseStyle.flexBetween}>
      <View>
        <Text style={TextStyle.base}>{`${cardName} (${days}天)`}</Text>
        <Text style={[TextStyle.small, {color: Colors7.volcano}]}>{price}元</Text>
      </View>
      <IconButton name='shopping-cart' source={IconSource.Feather} text='购买'
                  onPress={() => {
                  }}/>
    </View>);
  }

  render() {
    const {cards} = this.state;
    return <FlatList ItemSeparatorComponent={Hr} data={cards} renderItem={this.renderItem}/>;

  }
}

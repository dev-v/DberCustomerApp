import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {BaseStyle, TextStyle} from "../components/themes/Styles";
import Styles from "../components/themes/Styles";
import Card from "../components/Layout/Card";
import FlexBetween from "../components/Layout/FlexBetween";
import Container from "../components/Layout/Container";

/**
 * 订场服务
 */
export default class ShopServiceDetail extends React.PureComponent {


  componentWillMount() {
    const {service} = this.props.navigation.state.params;
    this.state = {
      sites: [{name: '场地1', price: '5', key: '1'}, {name: '场地2', price: '5', key: '2'}],
      service,
    }
  }

  renderItem = ({item}) => {
    const {name, price} = item;
    return <FlexBetween>
      <Text style={TextStyle.}>{name}</Text>
    </FlexBetween>
  }

  render() {
    const {service, sites} = this.state;

    return <Container>
      <Card title={service.name}>
        <FlatList data={sites} renderItem={this.renderItem}/>


      </Card>

    </Container>

  }
}
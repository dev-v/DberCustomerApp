import React from 'react';
import {View} from 'react-native';
import Label from "../components/Label";
import Card from "../components/Layout/Card";

export default class ShopService extends React.PureComponent {

  state = {
    services: [],
  }

  componentWillMount() {
    const {shopId} = this.props;
    this.setState({
      services: Label.getLabels([{name: '健身'}, {name: '台球'}]),
    });

  }

  render() {
    return <Card extra='服务项目'>
      <View style={{flexDirection: 'row'}}>{this.state.services}</View>
    </Card>;
  }
}
import React from 'react';
import {Text, View} from 'react-native';
import {BaseStyle} from "../components/themes/Styles";
import FlexBetween from "../components/Layout/FlexBetween";
import Card from "../components/Layout/Card";

export default class Holiday extends React.PureComponent {
  render() {
    return (
      <View style={BaseStyle.container}>
        <Card title='我的假期'>
          <FlexBetween>
            <Text>已用假期</Text>
            <Text>bbb</Text>
          </FlexBetween>
          <FlexBetween>
            <Text>剩余假期</Text>
            <Text>bbb</Text>
          </FlexBetween>
        </Card>

      </View>
    );
  }
}

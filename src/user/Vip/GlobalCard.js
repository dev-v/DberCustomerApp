import React from 'react';
import {Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import Modals from "../../components/Modal/Modals";
import {TextStyle} from "../../components/themes/Styles";
import IconButton from "../../components/Icon/IconButton";
import {Icons} from "../../components/Icon/Icon";

const cardRule = (<View>
  <Text style={TextStyle.base}>1、一天至多使用全城卡消费一次。</Text>
  <Text style={TextStyle.base}>2、全城卡从首次使用开始计时，计时按自然日计时。</Text>
  <Text style={TextStyle.base}>3、全城卡可转让，转让期间不计时。</Text>
  <Text style={TextStyle.base}>4、转让期间若使用全城卡消费，全城卡将重新激活，且转让期间停止计时的天数将重新计算。</Text>
  <Text style={TextStyle.base}>5、在有限期内，可使用全城卡抵扣门店费用，单次最高抵扣20元。</Text>
  <Text style={TextStyle.base}>6、多张全城卡有效期可累积。</Text>
  <Text style={TextStyle.base}>7、全城卡不可退卡。</Text>
</View>);

class GlobalCard extends React.PureComponent {
  render() {
    return (<View style={{flexDirection: 'row'}}>
          {Modals.getInstance()}
          <IconButton name='info' source={Icons.Feather} text={'说明'} onPress={() => {
            Modals.alert('全城通卡使用说明', cardRule);
          }}/>
          <IconButton name='shopping-cart' size={IconButton.size.small} source={Icons.Feather} text='购买'
                      onPress={() => {
                        this.props.navigation.navigate('GlobalCardBuy');
                      }}/>
        </View>
    );
  }
}

export default withNavigation(GlobalCard);
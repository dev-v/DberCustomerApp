import React from 'react';
import {Text, View} from 'react-native';
import Modals from "../../components/Modal/Modals";
import {TextStyle} from "../../components/themes/Styles";
import IconButton from "../../components/Icon/IconButton";
import {Icons} from "../../components/Icon/Icon";

const cardRule = (<View>
  <Text style={TextStyle.base}>1、一天至多使用会员卡消费一次。</Text>
  <Text style={TextStyle.base}>2、会员卡从首次使用开始计时，计时按自然日计时。</Text>
  <Text style={TextStyle.base}>3、会员卡可转让，转让期间不计时。</Text>
  <Text style={TextStyle.base}>4、转让期间若使用会员卡消费，会员卡将重新激活，且转让期间停止计时的天数将重新计算。</Text>
  <Text style={TextStyle.base}>5、在有限期内，可使用会员卡消费绑定的店铺服务。</Text>
  <Text style={TextStyle.base}>6、会员卡不可退卡。</Text>
</View>);

export default class ShopCard extends React.PureComponent {
  render() {
    return (<View>
          {Modals.getInstance()}
          <IconButton name='info' source={Icons.Feather} text={'说明'} onPress={() => {
            Modals.alert(cardRule,'店铺年卡使用说明');
          }}/>
        </View>
    );
  }
}
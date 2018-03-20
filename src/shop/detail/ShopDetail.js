import React from 'react';
import {View, Text} from 'react-native';
import ShopService from "../service/ShopService";
import Card from "../../components/Layout/Card";
import {Colors7, TextStyle} from "../../components/themes/Styles";
import {Time, Util} from "../../util/Util";
import ImageMore from "../../components/Image/ImageMore";
import Modals, {ModalsStyle} from "../../components/Modal/Modals";
import SiteSelect from "../service/SiteSelect";
import FlexBetween from "../../components/Layout/FlexBetween";
import {HR} from "../../components/Layout/Hr";
import ScrollContainer from "../../components/Layout/ScrollContainer";
import ShopCard from "../service/ShopCard";
import AccordingSelect from "../../components/Layout/AccordingSelect";
import bucket, {ImgType} from "../../util/Bucket";

let shopData = {};
export default class ShopDetail extends React.PureComponent {

  static setShop(shop) {
    shopData = shop;
  }

  state = {
    uris: [],
  }

  static navigationOptions = () => {
    return {
      title: shopData.name,
    }
  }

  componentWillMount() {
    const {id} = shopData;
    bucket.getDownUrls(ImgType.SHOP_ENV, id).then(uris => this.setState({
      uris,
    }));
  }


  onImgMore = () => {
    Modals.open(<SiteSelect/>, ModalsStyle.image);
  }

  render() {
    const {uris} = this.state;
    const {id, address, price, businessBegin, businessEnd} = shopData;

    return (<ScrollContainer>
      <FlexBetween>
        <Text style={TextStyle.base}>
          {`营业时段：${Time.formatTime(businessBegin)} - ${Time.formatTime(businessEnd)}`}
        </Text>
        <Text style={[TextStyle.extra, {color: Colors7.volcano, alignSelf: 'flex-end'}]}>
          {`${price}元/门店价`}
        </Text>
      </FlexBetween>
      <Text style={[TextStyle.extra, {paddingHorizontal: 3}]}>{address}</Text>
      {HR}
      <ImageMore onPress={this.onImgMore} uris={uris}/>
      <View style={{flexDirection: 'row'}}>
        {/*{Label.getLabels(['新风', '桑拿', '沐浴'], {borderColor: Colors7.blue, margin: 3, marginLeft: 0})}*/}
      </View>
      {HR}
      <AccordingSelect label='会员卡'>
        <ShopCard shop={shopData}/>
      </AccordingSelect>
      <Card title='服务项目'>
        <ShopService shop={shopData}/>
      </Card>
    </ScrollContainer>);
  }
}

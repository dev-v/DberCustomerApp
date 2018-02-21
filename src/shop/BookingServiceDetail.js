import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors7, TextStyle} from "../components/themes/Styles";
import Container from "../components/Layout/Container";
import FlexBetween from "../components/Layout/FlexBetween";
import IconButton from "../components/Icon/IconButton";
import Icon from "../components/Icon/Icon";
import SiteSelect from "./SiteSelect";
import Dates from "../components/Time/Dates";
import Button from "../components/Button";
import AccordingSelect from "../components/Layout/AccordingSelect";

let headerTitle = '瑜伽预订';
export default class BookingServiceDetail extends React.PureComponent {

  static setHeaderTitle(title) {
    headerTitle = title;
  }

  static navigationOptions = () => ({headerTitle});

  state = {
    date: undefined,
    site: undefined,
    time: undefined,
  }

  componentWillMount() {
    // const service = this.props.state.params;
    // this.state = {
    //   images: [1, 2, 3],
    //   service,
    // }
  }

  renderItem = ({item}) => {
    const {name, price} = item;
    return (<FlexBetween>
      <Text style={TextStyle.base}>{name}<Text
          style={styles.price}>{` (${price}元/小时)`}</Text></Text>
      <IconButton name='schedule' source={Icon.source.MaterialIcons} text='预订' size={IconButton.size.normal}
                  onPress={() => {
                  }}/>
    </FlexBetween>);
  }

  onSiteSelect = (site) => {
    this.setState({
      ...this.state,
      site,
    });
  }

  onDateSelect = ({dateString}) => {
    this.setState({
      ...this.state,
      date: dateString,
    });
  }


  render() {
    const {images, date, site, time} = this.state;

    return (<Container>
      <AccordingSelect label='选择日期' value={date} expand={true}>
        <Dates onSelect={this.onDateSelect}/>
      </AccordingSelect>

      <AccordingSelect label='选择场地' value={site && site.name} type='modal'
                       modalType='image'>
        <SiteSelect service={{}} onSelect={this.onSiteSelect}/>
      </AccordingSelect>

      <AccordingSelect label='选择时段' value={time}>
        <Dates onSelect={this.onDateSelect}/>
      </AccordingSelect>
      <Button>提交</Button>
    </Container>)
  }
}

const styles = StyleSheet.create({
  price: {
    ...TextStyle.extra,
    color: Colors7.volcano,
  }
});
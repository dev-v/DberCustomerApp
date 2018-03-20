import React from 'react';
import {Radio} from 'antd-mobile';
import Container from "../../components/Layout/Container";
import Dates from "../../components/Form/Dates";
import Button from "../../components/Form/Button";
import AccordingSelect from "../../components/Layout/AccordingSelect";
import SliderRangeTime from "../../components/Form/SliderRangeTime";
import RadioItems from "../../components/Form/RadioItems";
import ImageMore from "../../components/Image/ImageMore";
import Modals, {ModalsStyle} from "../../components/Modal/Modals";
import SiteSelect from "./SiteSelect";

const RadioItem = Radio.RadioItem;
let headerTitle = '瑜伽预订';
export default class BookingServiceDetail extends React.PureComponent {

  static setHeaderTitle(title) {
    headerTitle = title;
  }

  static navigationOptions = () => ({headerTitle});

  state = {
    date: undefined,
    sites: [
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '1', name: '场地1', price: 5, markers: [{min: 660, max: 720}]},
      {key: '2', name: '场地1', price: 5, markers: [{min: 800, max: 820}]},
      {key: '3', name: '场地1', price: 5, markers: [{min: 800, max: 990}, {min: 990, max: 1050}, {min: 1050, max: 1100}]},
    ],
    time: {min: 600, max: 610},
    activeIdx: 0,
  }

  componentWillMount() {
    // const service = this.props.state.params;
    // this.state = {
    //   images: [1, 2, 3],
    //   service,
    // }
  }

  renderItem = ({item}) => {
    const {name, price, markers} = item;
    return (<RadioItem>
      {name}
    </RadioItem>);
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

  onSliderChange = (value, formatValue) => {
    this.setState({
      ...this.state,
      time: value,
      formatTime: formatValue,
    });
  }

  renderSite = (item, checked) => {
    return <SliderRangeTime disabled={true} markers={item.markers}/>
  }

  onExpand = (activeIdx) => {
    this.setState({...this.state, activeIdx});
  }

  onImgMore = () => {
    Modals.open(<SiteSelect/>, ModalsStyle.image);
  }


  render() {
    const {images, date, site = {}, time, formatTime = time, sites, activeIdx} = this.state;

    return (
        <Container>
          <AccordingSelect expand={activeIdx == 0} label='选择日期' value={date} onExpand={() => this.onExpand(0)}>
            <Dates onSelect={this.onDateSelect}/>
          </AccordingSelect>

          <AccordingSelect expand={activeIdx == 1} label='选择场地' value={site && site.name}
                           onExpand={() => this.onExpand(1)}>
            <ImageMore uris={[
              'http://p31z7ux9b.bkt.clouddn.com/102.jpg',
              'https://cdn.pixabay.com/photo/2017/11/15/20/17/beach-2952391_1280.jpg',
              'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg',
              'https://cdn.pixabay.com/photo/2018/02/07/17/53/poppy-3137588_1280.jpg',]} onPress={this.onImgMore}/>
            <RadioItems data={sites} labelField='name' renderItem={this.renderSite} onChange={this.onSiteSelect}/>
          </AccordingSelect>

          <AccordingSelect expand={activeIdx == 2} label='选择时间' value={site && site.name}
                           onExpand={() => this.onExpand(2)}>
            <SliderRangeTime markers={site.markers}/>
          </AccordingSelect>
          <Button>提交</Button>
        </Container>)
  }
}

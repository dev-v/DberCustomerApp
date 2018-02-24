import React from 'react';
import {Radio} from 'antd-mobile';
import Container from "../components/Layout/Container";
import Dates from "../components/Form/Dates";
import Button from "../components/Button";
import AccordingSelect from "../components/Layout/AccordingSelect";
import SliderRangeTime from "../components/Form/SliderRangeTime";
import RadioItems from "../components/Form/RadioItems";

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
      {key: '3', name: '场地1', price: 5, markers: [{min: 800, max: 990}, {min: 990, max: 1050}, {min: 1050, max: 1100}]},
    ],
    time: {min: 600, max: 610},
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


  render() {
    const {images, date, site = {}, time, formatTime = time, sites} = this.state;

    return (

        <Container>
          <AccordingSelect label='选择日期' value={date}>
            <Dates onSelect={this.onDateSelect}/>
          </AccordingSelect>

          <AccordingSelect expand={true} label='选择场地' value={site && site.name}>
            <RadioItems data={sites} labelField='name' renderItem={this.renderSite} onChange={this.onSiteSelect}/>
          </AccordingSelect>

          <AccordingSelect label='选择时间' value={site && site.name}>
            <SliderRangeTime markers={site.markers}/>
          </AccordingSelect>
          <Button>提交</Button>
        </Container>)
  }
}

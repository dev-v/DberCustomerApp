import React from 'react';
import ImageCarousel from "../components/Image/ImageCarousel";

export default class SiteSelect extends React.PureComponent {

  state = {
    sites: [
      {name: '天外飞仙', price: 5, key: '1'},
      {name: '天外飞仙', price: 5, key: '2'},
      {name: '天外飞仙', price: 5, key: '3'},
    ],
  }

  componentWillMount() {
    // const service = this.props.state.params;
    // this.state = {
    //   images: [1, 2, 3],
    //   service,
    // }
  }

  triggerTitle = (title) => {
    if (this.props.onSelect) {
      this.props.onSelect({name: title});
    }
  }

  render() {
    const {service} = this.props;
    const {date, site, time} = this.state;
    const images = [
      'http://p31z7ux9b.bkt.clouddn.com/102.jpg',
      'https://cdn.pixabay.com/photo/2017/11/15/20/17/beach-2952391_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/02/07/17/53/poppy-3137588_1280.jpg',
    ];

    return (
        <ImageCarousel dataSource={[{title: '场地1',images:['http://p31z7ux9b.bkt.clouddn.com/102.jpg']}, {title: '场地2', images}]} triggerTitle={this.triggerTitle}/>)
  }
}
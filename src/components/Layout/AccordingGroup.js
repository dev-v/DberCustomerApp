import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import AccordingSelect from "./AccordingSelect";
import {DomUtil, Util} from "../../util/Util";

export default class AccordingGroup extends React.PureComponent {

  static propTypes = {
    items: PropTypes.array,
  };

  static defaultProps = {
    items: [],
  }

  state = {};

  componentWillMount() {
    const {items} = this.props;
    for (let i in items) {
      if (items[i].expand) {
        this.setState({activeItem: items[i]});
        return;
      }
    }
  }

  componentWillReceiveProps(props) {

  }

  onExpand = (index) => {
    this.setState({
      activeItem: this.props.items[index],
    });
  }

  render() {
    const {items} = this.props;
    const {activeItem} = this.state;
    return <View>
      {items.map((item, index) => {
        const {label, value, content, type,} = item;
        const expand = item == activeItem;
        return <AccordingSelect index={index} onExpand={this.onExpand} key={Math.random()} type={type} label={label}
                                expand={expand}
                                value={value}>
          {DomUtil.wrapTextWithString(content)}
        </AccordingSelect>
      })}
    </View>
  }
}

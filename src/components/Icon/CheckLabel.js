import React from 'react';
import IconButton from "./IconButton";
import {Icons} from "./Icon";

export default class CheckLabel extends React.PureComponent {

  render() {
    const {checked = true, text, size} = this.props;
    return <IconButton text={text} source={Icons.Ionicons} name='ios-checkmark-circle-outline' size={size}
                       iconStyle={{color: checked ? 'green' : 'gray'}}
    />
  }
}
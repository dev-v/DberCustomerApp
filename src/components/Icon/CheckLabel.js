import React from 'react';
import IconLabel from "./IconLabel";
import {Icons} from "./Icon";

export default class CheckLabel extends React.PureComponent {

  render() {
    const {checked = true, text} = this.props;
    return <IconLabel text={text} source={Icons.Ionicons} name='ios-checkmark-circle-outline'
                      size={IconLabel.size.small}
                      iconStyle={{color: checked ? 'green' : 'gray'}}
    />
  }
}
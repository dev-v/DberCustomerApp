import React from 'react';
import {Colors7} from "../themes/Styles";
import Icon from "../Icon/Icon";
import CatchEvent from "../CatchEvent";


const color = {paddingHorizontal: 20, color: Colors7.blue};
const leftIcon = <Icon name='md-arrow-dropleft' size={Icon.size.normal} style={color}/>;
const rightIcon = <Icon name='md-arrow-dropright' size={Icon.size.normal} style={color}/>;
const noIcon = <CatchEvent style={{padding: 100000, position: 'absolute'}}/>;

export default class ArrowButton extends React.PureComponent {

  componentWillMount() {
    const {direction, hide = false} = this.props;
    this.setState({
      hide,
      icon: direction == 'left' ? leftIcon : rightIcon,
    });
  }

  hide = (hide) => {
    this.setState({
      ...this.state,
      hide,
    });
  }

  render() {
    const {icon, hide} = this.state;
    return (
        hide ? noIcon : icon
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import FlexBetween from "./FlexBetween";
import {TextStyle} from "../themes/Styles";
import {Icons} from "../Icon/Icon";
import Hr from "../Hr";
import {ModalsStyle} from "../Modal/Modals";
import Modals from "../Modal/Modals";
import Styles from "../themes/Styles";
import {DomUtil} from "../../util/Util";

const arrow = {
  slide: {
    expand: Icons.arrowDown,
    collapse: Icons.arrowRight,
  },
  modal: {
    expand: Icons.arrowRight,
    collapse: Icons.arrowRight,
  }
}

export default class AccordingSelect extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    expand: PropTypes.bool,
    showHr: PropTypes.bool,
    type: PropTypes.oneOf(['modal', 'slide']),
    modalType: PropTypes.oneOf(['standard', 'image']),
  };

  componentWillMount() {
    const {type = 'slide', expand = false} = this.props;
    this.setState({
      isSlide: type == 'slide',
      expand,
    });
  }

  onPress = () => {
    const {isSlide, expand} = this.state;
    if (isSlide) {
      this.setState({
        ...this.state,
        expand: !expand,
      });
    } else {
      const {modalType = 'image'} = this.props;
      Modals.open(this.props.children, ModalsStyle[modalType])
    }
  }

  render() {
    const {expand, isSlide} = this.state;
    const {label, type = 'slide', value, children, showHr = true} = this.props;

    return (<View style={{flex: expand ? 1 : 0}}>
      <FlexBetween onPress={this.onPress}>
        <Text style={TextStyle.base}>{label}:</Text>
        <View style={Styles.flexBetween}>
          {DomUtil.wrapTextWithString(value, [TextStyle.base, {paddingRight: 6}])}
          {expand ? arrow[type].expand : arrow[type].collapse}
        </View>
      </FlexBetween>
      {showHr && <Hr/>}
      {
        expand && isSlide && <ScrollView style={{flex: 1}}>
          {children}
        </ScrollView>
      }
    </View>);
  }
}
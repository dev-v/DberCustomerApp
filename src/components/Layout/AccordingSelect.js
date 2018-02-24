import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Animated} from 'react-native';
import FlexBetween from "./FlexBetween";
import {TextStyle} from "../themes/Styles";
import {Icons} from "../Icon/Icon";
import Hr from "./Hr";
import {ModalsStyle} from "../Modal/Modals";
import Modals from "../Modal/Modals";
import Styles from "../themes/Styles";
import {DomUtil} from "../../util/Util";
import {AnimatedConfig} from "../Config";

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

  static defaultProps = {
    type: 'slide',
    modalType: 'image',
    expand: false,
  }

  componentWillMount() {
    const {type, expand} = this.props;
    this.setState({
      isSlide: type == 'slide',
      expand,
      flex: new Animated.Value(expand ? 1 : 0),
    });
  }

  onPress = () => {
    const {isSlide, expand, flex} = this.state;
    if (isSlide) {
      this.setState({
        ...this.state,
        expand: !expand,
      });
      Animated.timing(flex, {
        ...AnimatedConfig.cubic,
        toValue: expand ? 0 : 1,
      }).start();
    } else {
      const {modalType = 'image'} = this.props;
      Modals.open(this.props.children, ModalsStyle[modalType])
    }
  }

  render() {
    const {expand, isSlide, flex} = this.state;
    const {label, type = 'slide', value, children, showHr = true} = this.props;

    return (<View style={{flex: expand ? 1 : 0}}>
      <FlexBetween onPress={this.onPress}>
        <Text style={TextStyle.subTitle}>{label}:</Text>
        <View style={Styles.flexBetween}>
          {DomUtil.wrapTextWithString(value, [TextStyle.base, {paddingRight: 6}])}
          <View style={{width: 30}}>{expand ? arrow[type].expand : arrow[type].collapse}</View>
        </View>
      </FlexBetween>
      {showHr && <Hr/>}
      {
        isSlide && <Animated.ScrollView style={{flex, paddingHorizontal: 3,}}>
          {children}
        </Animated.ScrollView>
      }
    </View>);
  }
}

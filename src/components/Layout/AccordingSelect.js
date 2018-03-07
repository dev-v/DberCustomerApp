import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Animated, StyleSheet} from 'react-native';
import FlexBetween from "./FlexBetween";
import {TextStyle} from "../themes/Styles";
import {Icons} from "../Icon/Icon";
import Hr from "./Hr";
import {ModalsStyle} from "../Modal/Modals";
import Modals from "../Modal/Modals";
import Styles from "../themes/Styles";
import {DomUtil, HEIGHT} from "../../util/Util";
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
    onExpand: PropTypes.func,
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
    const isSlide = type == 'slide';
    this.setState({
      isSlide,
      expand,
      height: isSlide && new Animated.Value(0),
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      expand: props.expand,
    });
  }

  toggle = () => {
    let {isSlide, expand} = this.state;
    expand = !expand;
    if (isSlide) {
      this.setState({
        ...this.state,
        expand,
      });
      if (expand && this.props.onExpand) {
        this.props.onExpand(this.props.index);
      }
    } else {
      const {modalType = 'image'} = this.props;
      Modals.open(this.props.children, ModalsStyle[modalType])
    }
  }

  setHeight = (expand) => {
    if (this.height) {
      const {height} = this.state;
      Animated.timing(height, {
        ...AnimatedConfig.cubic,
        toValue: expand ? this.height : 0,
      }).start();
    }
  }

  onLayout = ({nativeEvent}) => {
    if (!this.height) {
      let h = nativeEvent.layout.height;
      if (h > HEIGHT / 2) {
        h = HEIGHT / 2;
      }
      this.height = h;
      const {expand, height} = this.state;
      if (expand) {
        height.setValue(h);
      }
      this.forceUpdate();
    }
  }

  render() {
    const {expand, isSlide, height} = this.state;

    const {label, type = 'slide', value, children, showHr = true} = this.props;

    if (isSlide) {
      this.setHeight(expand);
    }

    return (<View style={styles.container}>
      <FlexBetween onPress={this.toggle}>
        <Text style={TextStyle.subTitle}>{label}</Text>
        <View style={Styles.flexBetween}>
          {DomUtil.wrapTextWithString(value, [TextStyle.base, styles.value])}
          {expand ? arrow[type].expand : arrow[type].collapse}
        </View>
      </FlexBetween>
      {showHr && <Hr/>}
      {isSlide && <Animated.ScrollView style={[this.height && {height, paddingHorizontal: 6}]} onLayout={this.onLayout}>
        {children}
      </Animated.ScrollView>}
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
  },
  value: {position: 'absolute', right: 32},
});

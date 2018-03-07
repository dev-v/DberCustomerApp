import React from "react";
import {Text, View, StyleSheet} from 'react-native';
import {BaseStyle} from "../themes/Styles";
import PropTypes from 'prop-types';

export default class Hr extends React.PureComponent {

  static propTypes = {
    lineStyle: PropTypes.any,
  }

  componentWillMount() {
    let {lineStyle, textStyle, style, text} = this.props;
    style = [styles.style, style];
    lineStyle = [styles.lineStyle, lineStyle];
    this.style = {style, lineStyle};
    if (text) {
      const textTop = -textStyle.fontSize / 2 - 2;
      this.style.textStyle = [styles.textStyle, textStyle, {textTop}];
    }
  }

  render() {
    const {text} = this.props;
    const {style, lineStyle, textStyle} = this.style;
    return <View style={style}>
      <View style={lineStyle}/>
      {text && <View><Text style={textStyle}>{text}</Text></View>}
      <View style={lineStyle}/>
    </View>
  }
}

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  lineStyle: {
    flex: 1, borderColor: BaseStyle.borderColor, borderBottomWidth: 0.7, height: 0,
  },
  textStyle: {
    position: 'relative',
    fontSize: 16,
    paddingHorizontal: 20,
    color: '#889',
  }
});

const HR = <Hr/>

export {HR};

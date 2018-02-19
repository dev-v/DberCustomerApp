import React from "react";
import {Text, View} from 'react-native';
import {BaseStyle} from "./themes/Styles";

export default class Hr extends React.PureComponent {

  componentWillMount() {
    let {lineStyle, textStyle, style, text} = this.props;
    style = {...styles.style, ...style};
    lineStyle = {...styles.lineStyle, ...lineStyle};
    this.style = {style, lineStyle};
    if (text) {
      textStyle = {...styles.textStyle, ...textStyle};
      const textTop = -textStyle.fontSize / 2 - 2;
      this.style.textStyle = {...textStyle, top: textTop};
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

const styles = {
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
};
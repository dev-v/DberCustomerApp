import React from "react";
import {Text, View} from 'react-native';
import {BaseStyle} from "./themes/Styles";

export default class Hr extends React.PureComponent {
  render() {
    let {text, lineStyle, textStyle, style} = this.props;
    style = {...styles.style, ...style};
    lineStyle = {...styles.lineStyle, ...lineStyle};
    textStyle = {...styles.textStyle, ...textStyle};
    const textTop = lineStyle.paddingVertical * 2 - textStyle.fontSize / 2 - 3;
    return <View style={style}>
      <View style={lineStyle}/>
      {text && <Text style={{...textStyle, top: textTop}}>{text}</Text>}
      <View style={lineStyle}/>
    </View>
  }
}

const styles = {
  style: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  lineStyle: {
    flex: 1, borderColor: BaseStyle.borderColor, borderBottomWidth: 0.7, paddingVertical: 8,
  },
  textStyle: {
    position: 'relative', paddingHorizontal: 20,
    fontSize: 16,
    color: '#889',
  }
};
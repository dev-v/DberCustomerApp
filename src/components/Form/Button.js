import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import LineGradient from 'react-native-linear-gradient';
import {BaseStyle, Colors7} from "../themes/Styles";
import Styles from "../themes/Styles";


const textSize = StyleSheet.create({
  normal: {
    fontSize: 16,
  },
  large: {
    fontSize: 20,
  }
});
const Size = {
  normal: {
    text: textSize.normal,
    wrap: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginHorizontal: 0.5,
    }
  },
  large: {
    text: textSize.large,
    wrap: {
      paddingVertical: 9,
      paddingHorizontal: 15,
    }
  }
};

const textType = StyleSheet.create({
  base: {
    color: 'black',
  },
  white: {
    color: Colors7.white,
  },
});

const Type = {
  base: {
    text: textType.base,
    colors: ['#bfbfbf', '#d9d9d9', '#bfbfbf'],
  },
  primary: {
    text: textType.white,
    colors: ['#1890ff', '#40a9ff', '#1890ff'],
  },
  success: {
    text: textType.white,
    colors: ['#52c41a', '#73d13d', '#52c41a'],
  },
  warn: {
    text: textType.white,
    colors: ['#faad14', '#ffc53d', '#faad14'],
  },
  error: {
    text: textType.white,
    colors: ['#f5222d', '#ff4d4f', '#f5222d'],
  }
}

const lineStyle = {
  borderRadius: BaseStyle.borderRadius, alignItems: 'center',
}

export default class Button extends React.Component {
  static size = Size;
  static type = Type;

  componentWillMount() {
    let {style, textStyle, size = Size.normal, type = Type.primary} = this.props;
    const colors = type.colors;
    const flexStyle = {};
    if (style) {
      for (let key in style) {
        if (key.startsWith('flex') || key.startsWith('margin')) {
          flexStyle[key] = style[key];
          delete style[key];
        }
      }
    }
    this.style = {
      colors,
      textStyle: [size.text, type.text, textStyle],
      flexStyle,
      lineStyle: [size.wrap, style, lineStyle]
    };
  }

  render() {
    const {onPress, children, disabled} = this.props;
    const {colors, textStyle, flexStyle, lineStyle} = this.style;
    return <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={[...flexStyle, disabled && Styles.disabled]}>
        <LineGradient colors={colors}
                      style={lineStyle}>
          <Text style={textStyle}>{children}</Text>
        </LineGradient></View>
    </TouchableOpacity>
  }
}

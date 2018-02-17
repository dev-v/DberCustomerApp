import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LineGradient from 'react-native-linear-gradient';
import {BaseStyle} from "./themes/Styles";

const Size = {
  normal: {
    text: {
      fontSize: 16,
    },
    wrap: {
      paddingVertical: 6,
      paddingHorizontal: 12,
    }
  },
  large: {
    text: {
      fontSize: 20,
    },
    wrap: {
      paddingVertical: 9,
      paddingHorizontal: 15,
    }
  }
};

const Type = {
  base: {
    text: {
      color: 'black',
    },
    colors: ['#bfbfbf', '#d9d9d9', '#bfbfbf'],
  },
  primary: {
    text: {
      color: '#fff',
    },
    colors: ['#1890ff', '#40a9ff', '#1890ff'],
  },
  success: {
    text: {
      color: '#fff',
    },
    colors: ['#52c41a', '#73d13d', '#52c41a'],
  },
  warn: {
    text: {
      color: '#fff',
    },
    colors: ['#faad14', '#ffc53d', '#faad14'],
  },
  error: {
    text: {
      color: '#fff',
    },
    colors: ['#f5222d', '#ff4d4f', '#f5222d'],
  }
}

const disabledStyle = {
  opacity: 0.8,
}

const enabledStyle = {
  opacity: 1,
}

const disabledTextStyle = {
  color: '#ddd',
}

export default class Button extends React.Component {
  static size = Size;
  static type = Type;

  componentWillMount() {
    let {style, textStyle, size = Size.normal, type = Type.primary} = this.props;
    const colors = type.colors;
    textStyle = {...size.text, ...type.text, ...textStyle};
    const lineStyle = {
      borderRadius: BaseStyle.borderRadius, ...size.wrap, alignItems: 'center', ...style,
    };
    const flexStyle = {};
    if (style) {
      for (let key in style) {
        if (key.startsWith('flex') || key.startsWith('margin')) {
          flexStyle[key] = style[key];
          delete style[key];
        }
      }
    }
    this.style = {colors, textStyle, flexStyle, lineStyle};
  }

  render() {
    const {onPress, children, disabled = false} = this.props;
    const {colors, textStyle, flexStyle, lineStyle} = this.style;
    return <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={{...flexStyle, ...(disabled ? disabledStyle : enabledStyle)}}>
        <LineGradient colors={colors}
                      style={lineStyle}>
          <Text style={{...textStyle, ...(disabled ? disabledTextStyle : undefined)}}>{children}</Text>
        </LineGradient></View>
    </TouchableOpacity>
  }
}
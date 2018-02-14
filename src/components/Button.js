import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LineGradient from 'react-native-linear-gradient';

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
      color: 'white',
    },
    colors: ['#1890ff', '#40a9ff', '#1890ff'],
  },
  success: {
    text: {
      color: 'white',
    },
    colors: ['#52c41a', '#73d13d', '#52c41a'],
  },
  warn: {
    text: {
      color: 'white',
    },
    colors: ['#faad14', '#ffc53d', '#faad14'],
  },
  error: {
    text: {
      color: 'white',
    },
    colors: ['#f5222d', '#ff4d4f', '#f5222d'],
  }
}

const disabledStyle = {
  opacity: 0.7,
}

export default class Button extends React.PureComponent {
  static size = Size;
  static type = Type;

  getStyles = () => {
    const {style} = this.props;
    if (style) {
      const flexStyle = {};
      for (let key in style) {
        if (key.startsWith('flex')) {
          flexStyle[key] = style[key];
          delete style[key];
        }
      }
      return {flexStyle, style};
    }
    return {};
  }

  render() {
    const {onPress, children, disabled = false, size = Size.normal, type = Type.primary, textStyle} = this.props;
    const {flexStyle, style} = this.getStyles();
    return <TouchableOpacity
      style={{...(disabled ? disabledStyle : undefined), ...flexStyle}}
      disabled={disabled}
      onPress={onPress}>
      <LineGradient colors={type.colors}
                    style={{
                      borderRadius: 4,
                      ...size.wrap,
                      alignItems: 'center',
                      ...style,
                    }}>
        <Text style={{...size.text, ...type.text, ...textStyle}}>{children}</Text>

      </LineGradient>
    </TouchableOpacity>
  }
}
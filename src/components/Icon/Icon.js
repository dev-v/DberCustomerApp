import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const Icons = {
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
  MaterialIcons,
  EvilIcons,
  Feather,
  Entypo,
};


const Size = {
  large: {
    fontSize: 30,
    color: '#777',
  },
  normal: {
    fontSize: 18,
    color: '#777',
  },
  small: {
    fontSize: 14,
    color: '#777',
  }
}

export default class Icon extends React.PureComponent {
  static source = Icons;
  static size = Size;

  render() {
    const {name, size = Size.large, style, source = Icons.Ionicons} = this.props;
    const Icon = (typeof source == 'string') ? Icons[source] : source;
    return <Icon style={{...size, ...style}} name={name}/>;
  }
}

export {Icons, Size};
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const Icons = {
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
  MaterialIcons,
  EvilIcons,
  Feather,
};

export default class Icon extends React.PureComponent {
  render() {
    const {name, style, source = Icons.Ionicons} = this.props;
    const Icon = (typeof source == 'string') ? Icons[source] : source;
    return <Icon style={style} name={name}/>;
  }
}

export {Icons};
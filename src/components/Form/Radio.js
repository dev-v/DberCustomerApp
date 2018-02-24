import React from 'react';
import {StyleSheet} from 'react-native';
import Icon, {IconSource} from "../Icon/Icon";
import {Colors7} from "../themes/Styles";

export default class Radio extends React.PureComponent {
  render() {
    return <Icon name='check' source={IconSource.Feather} style={this.props.checked && styles.checked}
                 size={Icon.size.large}/>
  }
}

const styles = StyleSheet.create({
  checked: {
    color: Colors7.blue,
  }
});

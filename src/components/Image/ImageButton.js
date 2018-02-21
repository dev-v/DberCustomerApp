import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";
import {Util} from "../../util/Util";

export default class ImageButton extends React.PureComponent {

  onPress = () => {
    const {start, end, idx} = this.props;
    Util.range(idx, start, end) || this.props.onPress(this.props);
  }

  render() {
    const {title, start, end, idx, offset = 0} = this.props;
    const active = Util.range(idx, start, end);
    return (<View>
      <TouchableOpacity onPress={this.onPress}>
        <Text style={[styles.button, active && styles.activeButton]}>{`${title}(${end - start - offset})`}</Text>
      </TouchableOpacity>
    </View>);
  }
}


const styles = StyleSheet.create({
  button: {
    ...TextStyle.base,
    color: '#888',
    padding: 6,
  },
  activeButton: {
    color: Colors7.white,
    backgroundColor: '#888',
    borderRadius: BaseStyle.borderRadius,
  },
});
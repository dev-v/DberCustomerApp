import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";

let curActive;
export default class ImageButton extends React.PureComponent {

  componentWillUnmount() {
    if (curActive == this) {
      curActive = undefined;
    }
  }

  componentWillMount() {
    this.setActive(this.props.active);
  }

  state = {
    active: false,
  }

  setActive = (active) => {
    if (active) {
      if (curActive) {
        if (curActive == this) {
          return;
        }
        curActive.setActive(false);
      }
      this.props.onActive(this.props);
      curActive = this;
    }
    this.setState({
      active,
    });
  }

  checkIdx = (idx) => {
    const {start, end} = this.props;
    if (idx < end && idx >= start) {
      this.setActive(true);
      return true;
    }
  }

  onPress = () => {
    this.props.onPress(this.props);
    this.setActive(true);
  }

  render() {
    const {title, start, end} = this.props;
    const {active} = this.state;
    return (<TouchableOpacity disabled={active} onPress={this.onPress}>
      <Text style={[styles.button, active && styles.activeButton]}>{`${title}(${end - start})`}</Text>
    </TouchableOpacity>);
  }
}


const styles = StyleSheet.create({
  button: {
    color: '#888',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  activeButton: {
    color: Colors7.white,
    backgroundColor: '#888',
    borderRadius: BaseStyle.borderRadius,
  },
});
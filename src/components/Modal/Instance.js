import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {BaseStyle} from "../themes/Styles";

export default class Instance extends React.PureComponent {

  state = {
    visible: false,
    content: undefined,
  };

  open = (content) => {
    this.setState({visible: true, content});
  }

  close = () => {
    this.setState({visible: false});
  }

  render() {
    const {visible, content} = this.state;
    return (
      <Modal animationType='slide' visible={visible} onRequestClose={() => {
        this.close();
      }} onBackdropPress={this.close}>
        <TouchableWithoutFeedback onPress={this.close} style={{flex: 1}}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.innerContainer}>
                {content}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  innerContainer: {
    padding: 22,
    minWidth: 200,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: BaseStyle.borderRadius,
    shadowOffset:{width:8,height:12},
    shadowOpacity:0.2,
    shadowColor:'black',
    shadowRadius:8,
  },
});
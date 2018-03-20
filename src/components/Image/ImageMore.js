import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import ImageLoading from "./ImageLoading";

export default class ImageMore extends React.PureComponent {

  static propTypes = {
    uris: PropTypes.array,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    uris: [],
  }

  state = {};

  componentWillReceiveProps(props) {
    const uris = props.uris.splice(0, 4);
    const width = 100 / (uris.length + 1) + '%';
    const images = uris.map((uri) => {
      return <ImageLoading style={{
        width: width,
        height: 60,
      }} key={uri} source={{uri}} imgStyle={styles.imgStyle}/>
    });
    this.setState({
      images,
    });
  }

  render() {
    return (<TouchableWithoutFeedback onPress={this.props.onPress}><View style={styles.container}>
      {this.state.images}
      <Text>更多...</Text>
    </View></TouchableWithoutFeedback>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  }
});

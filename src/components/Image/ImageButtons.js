import React from 'react';
import {View, StyleSheet} from 'react-native';
import ImageButton from "./ImageButton";

export default class ImageButtons extends React.PureComponent {

  onPress = (props) => {
    this.props.onPress(props)
  };

  render() {
    const {dataSource, idx} = this.props;
    return (<View style={styles.container}>
      {dataSource.map((data) => {
        return <ImageButton key={data.title} idx={idx} {...data} onPress={this.onPress}/>;
      })}
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
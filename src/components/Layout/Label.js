import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Colors7.gray,
    borderRadius: BaseStyle.borderRadius,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  labelContent: {
    flexDirection: 'row', flexWrap: 'wrap', left: -3,
  }
});

export default class Label extends React.PureComponent {

  static propTypes = {
    text: PropTypes.any,
    disabled: PropTypes.bool,
    style: PropTypes.any,
  }

  static getLabels({dataSource, style = {margin: 1.5}, field = 'name'}) {
    if (Array.isArray(dataSource)) {
      return dataSource.map((data) => {
        const text = data[field];
        return <Label key={text} text={text} style={style}/>
      });
    }
  }

  static labelContentStyle = styles.labelContent;

  render() {
    const {text, style} = this.props;
    return (<View style={[styles.container, style]}>
      <Text style={TextStyle.base}>{text}</Text>
    </View>);
  }
}

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import FlexBetween from "../Layout/FlexBetween";
import Radio from "./Radio";
import {TextStyle} from "../themes/Styles";

export default class RadioItems extends React.PureComponent {

  static propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func,
    labelField: PropTypes.string,
  }

  static defaultProps = {
    labelField: 'text',
  }

  state = {};

  componentWillMount() {
    const {data} = this.props;
    if (data) {
      data.map((d) => {
        if (d.checked) {
          this.setState({
            checkedItem: d,
          });
        }
      });
    }

  }

  onChange = (item) => {
    const {checkedItem} = this.state;
    checkedItem && (checkedItem.checked = false);
    item.checked = true;
    this.setState({
      checkedItem: item,
    });

    this.props.onChange && this.props.onChange(item);
  }

  render() {
    const {data, renderItem, labelField} = this.props;
    return (<View>
      {
        data.map((item) => {
          const {checked} = item;
          const text = item[labelField];
          return (<View key={text} style={styles.item}>
            <FlexBetween onPress={() => this.onChange(item)}>
              <Text style={TextStyle.base}>{text}</Text>
              <Radio checked={checked}/>
            </FlexBetween>
            {renderItem && renderItem(item)}
          </View>);
        })
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 6,
  }
});

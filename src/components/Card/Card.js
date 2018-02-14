import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BaseStyle, TextStyle} from "../themes/Styles";

export default class Card extends React.PureComponent {
  static wrapTextWithString = (content, style = TextStyle.base) => {
    if (content && (typeof content == 'string')) {
      return <Text style={style}>{content}</Text>;
    }
    return content;
  };

  render() {
    const {title, extra, children, footer, style} = this.props;
    const extras = Card.wrapTextWithString(extra, TextStyle.extra);
    const childrens = Card.wrapTextWithString(children);
    const footers = Card.wrapTextWithString(footer);
    return <View style={{flex: 1, ...style}}>
      {title && <View style={styles.header}>
        <Text style={TextStyle.title}>{title}</Text>
        {extras && extras}
      </View>}
      {childrens && <View style={styles.body}>
        {childrens}
      </View>}
      {footers && <View style={styles.footer}>
        {footers}
      </View>}
    </View>
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 3,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BaseStyle.borderColor,
  },
  title: {
    flexDirection: 'row',
  },
  body: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  footer: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: BaseStyle.borderColor,
  },
});
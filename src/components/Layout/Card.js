import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";

export default class Card extends React.PureComponent {
  static wrapTextWithString = (content, style = TextStyle.base) => {
    if (content && (typeof content == 'string')) {
      return <Text style={style}>{content}</Text>;
    }
    return content;
  };

  getTitle = () => {
    const {title, extra, onTitlePress} = this.props;
    const extras = Card.wrapTextWithString(extra, TextStyle.extra);
    if (title || extras) {
      const view = <View style={styles.header}>
        {Card.wrapTextWithString(title, TextStyle.subTitle)}
        {extras && extras}
      </View>;
      return onTitlePress ? <TouchableOpacity onPress={onTitlePress}>
        {view}
      </TouchableOpacity> : view
    }
  }

  render() {
    const {children, footer, style} = this.props;
    const child = Card.wrapTextWithString(children);
    const footers = Card.wrapTextWithString(footer);
    return <View
        style={{flex: 1, borderRadius: BaseStyle.borderRadius, padding: 5, backgroundColor: Colors7.white, ...style}}>
      {this.getTitle()}
      {child && <View style={styles.body}>
        {child}
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
    alignItems: 'center',
    paddingBottom: 3,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BaseStyle.borderColor,
  },
  title: {
    flexDirection: 'row',
  },
  body: {
    padding: 6,
  },
  footer: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: BaseStyle.borderColor,
  },
});
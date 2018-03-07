import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";
import {DomUtil} from "../../util/Util";
import FlexBetween from "./FlexBetween";
import {HR} from "./Hr";

export default class Card extends React.PureComponent {

  render() {
    const {children, footer, style, title, extra, onTitlePress} = this.props;
    const child = DomUtil.wrapTextWithString(children);
    const footers = DomUtil.wrapTextWithString(footer);
    return <View style={[styles.container, style]}>
      {
        (title || extra) && <FlexBetween onPress={onTitlePress}>
          {DomUtil.wrapTextWithString(title, TextStyle.subTitle)}
          {DomUtil.wrapTextWithString(extra, TextStyle.extra)}
        </FlexBetween>
      }
      {HR}
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
  container: {
    flex: 1,
    borderRadius: BaseStyle.borderRadius,
    backgroundColor: Colors7.white,
    marginVertical: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: BaseStyle.borderColor,
  },
  title: {
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    paddingHorizontal: 6,
  },
  footer: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: BaseStyle.borderColor,
  },
});

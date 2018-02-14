import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Instance from "./Instance";
import {TextStyle} from "../themes/Styles";
import Button from "../Button";
import Card from "../Card/Card";

let instanceObj;

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
  },
  body: {
    paddingVertical: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});

const getTitle = (title) => {
  return title && <View key='title' style={styles.title}><Text style={TextStyle.title}>{title}</Text></View>;
}

const getBody = (body) => {
  return body && <View key='body' style={styles.body}>{Card.wrapTextWithString(body)}</View>
}

const getActions = (actions) => {
  if (actions) {
    return Array.isArray(actions) ? <View key='actions' style={styles.footer}>
      {actions.map(({text, style, onPress}) => {
        return <Button key={text} style={style} title={text} onPress={() => {
          onPress(instanceObj)
        }}>{text}</Button>
      })}
    </View> : actions;
  }
}

const alertFooter = getActions([{
  text: '确定',
  onPress: (modal) => {
    modal.close();
  }
}]);

export default class Modals extends React.PureComponent {

  static getInstance() {
    if (!instanceObj) {
      return <Instance ref={(ins) => {
        instanceObj = ins;
      }}/>
    }
  }

  static open(content) {
    instanceObj.open(content);
  }

  static close() {
    instanceObj.close();
  }

  static base(title, body, actions) {
    title = getTitle(title);
    body = getBody(body);
    actions = getActions(actions);
    const content = [];
    title && content.push(title);
    body && content.push(body);
    actions && content.push(actions);
    Modals.open(content);
  }

  static alert(title, body) {
    Modals.base(title, body, alertFooter);
  }
}
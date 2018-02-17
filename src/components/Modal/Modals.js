import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Instance from "./Instance";
import {TextStyle} from "../themes/Styles";
import Button from "../Button";
import Card from "../Layout/Card";
import Hr from "../Hr";
import {Util} from "../../util/Util";

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
      {actions.map(({text, onPress}) => {
        return <Button key={text} style={{marginLeft: 2}} title={text} onPress={() => {
          onPress && onPress();
          instanceObj.close();
        }}>{text}</Button>
      })}
    </View> : actions;
  }
}

const ok = [{
  text: '确定'
}];

const alertFooter = getActions(ok);

const hr = <Hr key='hr'/>;

export default class Modals extends React.PureComponent {

  static getInstance() {
    if (!instanceObj) {
      return <Instance ref={ins => instanceObj = ins}/>
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
    actions && content.push(hr, actions);
    Modals.open(content);
  }

  static alert(body, title) {
    if ((!title || typeof title != 'object') && ((!body || typeof body != 'object'))) {
      Alert.alert(Util.toStr(title), Util.toStr(body), ok);
    } else {
      Modals.base(title, body, alertFooter);
    }
  }

  static confirm(title, body, ok) {
    Modals.base(title, body, [{
      text: '确定', onPress: ok,
    }, {
      text: '取消'
    }])
  }
}
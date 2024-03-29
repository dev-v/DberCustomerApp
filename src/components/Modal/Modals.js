import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Alert,
  PanResponder
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BaseStyle, Colors7, TextStyle} from "../themes/Styles";
import Hr from "../Layout/Hr";
import Button from "../Form/Button";
import {DomUtil, IS_IOS, Util} from "../../util/Util";

let nav;
let contents;
export default class Modals extends React.PureComponent {

  static setNavigation(navigation) {
    nav = navigation;
  }

  static open = (content, style = ModalsStyle.standard) => {
    sty = style;
    contents = content;
    nav.navigate('Modals');
  }

  static close = () => {
    nav.goBack();
  }

  static base(body, title, actions) {
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
      Modals.base(body, title, alertFooter);
    }
  }

  static confirm(body, title, ok) {
    Modals.base(body, title, [{
      text: '确定', onPress: ok,
    }, {
      text: '取消'
    }])
  }

  // static headerLeft = <IconButton iconStyle={{color:Colors7.white}} size={IconButton.size.large} name='chevron-left' source={IconSource.EvilIcons} onPress={() => {
  //   nav.goBack();
  // }}/>;

  static navigationOptions = ({navigation}) => {
    return {
      header: null,
      // headerStyle: {
      //   backgroundColor: Colors7.black
      // },
      // headerLeftStyle: {
      //   color: Colors7.white
      // },
      // headerLeft: Modals.headerLeft,
    }
  }

  componentWillMount() {
    if (sty == ModalsStyle.image && !IS_IOS) {
      this.focus = nav.addListener('willFocus', () => StatusBar.setBackgroundColor(Colors7.imgBgTop));
      this.blur = nav.addListener('willBlur', () => StatusBar.setBackgroundColor(Colors7.statusBgColor));
    }

    this.press = false;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return this.press = true;
      },
      onPanResponderMove: () => {
        this.press = false;
      },
      onPanResponderTerminationRequest: () => {
        return true;
      },
      onPanResponderRelease: () => {
        if (this.press) {
          Modals.close();
        }
      },
    });
  }

  componentWillUnmount() {
    if (sty == ModalsStyle.image && !IS_IOS) {
      this.focus.remove();
      this.blur.remove();
    }
  }

  render() {
    return (
        <View style={styles.container} {...this.panResponder.panHandlers}>
          {sty.gradient}
          {sty == ModalsStyle.image ? contents :
              <View style={styles.innerContainer}>
                {contents}
              </View>
          }
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    padding: 22,
    minWidth: 200,
    margin: 16,
    backgroundColor: Colors7.white,
    borderRadius: BaseStyle.borderRadius,
  },
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

const standGradient = <LinearGradient
    colors={[Colors7.white, Colors7.gray]}
    startPoint={{x: 1, y: 0}}
    endPoint={{x: 0, y: 1}}
    style={StyleSheet.absoluteFill}
/>;

const imageGradient = <LinearGradient
    colors={[Colors7.imgBgTop, Colors7.imgBgBottom]}
    startPoint={{x: 1, y: 0}}
    endPoint={{x: 0, y: 1}}
    style={StyleSheet.absoluteFill}
/>;

const ModalsStyle = {
  standard: {
    gradient: standGradient,
  },
  image: {
    gradient: imageGradient,
    style: styles.imageInnerContainer,
  },
};

let sty = ModalsStyle.standard;

const getTitle = (title) => {
  return title && <View key='title' style={styles.title}><Text style={TextStyle.title}>{title}</Text></View>;
}

const getBody = (body) => {
  return body && <View key='body' style={styles.body}>{DomUtil.wrapTextWithString(body)}</View>
}

const getActions = (actions) => {
  if (actions) {
    return Array.isArray(actions) ? <View key='actions' style={styles.footer}>
      {actions.map(({text, onPress}) => {
        return <Button key={text} style={{marginLeft: 2}} title={text} onPress={() => {
          onPress && onPress();
          Modals.close();
        }}>
          {text}
        </Button>
      })}
    </View> : actions;
  }
}

const ok = [{
  text: '确定'
}];

const alertFooter = getActions(ok);

const hr = <Hr key='hr'/>;

export {ModalsStyle};

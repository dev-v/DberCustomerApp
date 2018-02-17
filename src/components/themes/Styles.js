import {StyleSheet, Platform} from 'react-native';


// fontFamilly
// monospace android
// Avenir-Light
// HelveticaNeue-Thin
// HelveticaNeue-Light
// Helvetica-Light

const BaseStyle = {
  borderColor: '#ddd',
  edgeVertical: 20,
  edgeHorizontal: 16,
  fontFamily: 'HelveticaNeue-Thin',
  borderRadius: 5,
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  center: {
    position: 'absolute',
    left: '48%',
    top: '50%',
    backgroundColor: 'red',
  }
}

const Colors7 = {
  volcano: '#d4380d',
  orange: '#d46b08',
  gold: '#d48806',
  yellow: '#d4b106',
  lime: '#7cb305',
  green: '#389e0d',
  cyan: '#08979c',
  blue: '#096dd9',
}

export default StyleSheet.create({
  container: BaseStyle.container,
  flexBetween: BaseStyle.flexBetween,
  center: BaseStyle.center,
});

const NavStyle = StyleSheet.create({
  titleStyle: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#595959',
    alignSelf: 'center',
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  }
});

const TextStyle = {
  navTitleStyle: {
    fontSize: 22,
    fontFamily: BaseStyle.fontFamily,
    fontWeight: 'normal',
    color: '#595959',
    alignSelf: 'center',
  },
  title: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 22,
    color: '#595959',
    paddingVertical: 1,
  },
  subTitle: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 20,
    color: '#595959',
    paddingVertical: 1,
  },
  base: {
    fontSize: 16,
    fontFamily: BaseStyle.fontFamily,
    color: '#595959',
    paddingVertical: 3,
  },
  extra: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 14,
    color: '#777',
    paddingVertical: 1,
  },
};

export {TextStyle, BaseStyle, NavStyle, Colors7};
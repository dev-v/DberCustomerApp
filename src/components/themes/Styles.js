import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import Icon from "../Icon/Icon";


// fontFamilly
// monospace android
// Avenir-Light
// HelveticaNeue-Thin
// HelveticaNeue-Light
// Helvetica-Light

const Colors7 = {
  black: '#1a1917',
  white: '#fff',
  gray: '#888',
  volcano: '#d4380d',
  orange: '#d46b08',
  gold: '#d48806',
  yellow: '#d4b106',
  lime: '#7cb305',
  green: '#389e0d',
  cyan: '#08979c',
  blue: '#096dd9',
  imgBgTop: '#21D4FD',
  imgBgBottom: '#B721FF',
  imgBgTop: '#1a1917',
  imgBgBottom: '#1a1917',
  statusBgColor: '#fff',
}

const BaseStyle = {
  borderColor: '#ddd',
  edgeVertical: 20,
  edgeHorizontal: 16,
  fontFamily: 'HelveticaNeue-Thin',
  color: '#777',
  borderRadius: 5,
  container: {
    flex: 1,
    backgroundColor: Colors7.white,
    paddingBottom: 0.3,
    paddingHorizontal: 3,
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
  },
  center: {
    position: 'absolute',
    left: '48%',
    top: '50%',
    backgroundColor: 'red',
  },
}

export default StyleSheet.create({
  container: BaseStyle.container,
  flexBetween: BaseStyle.flexBetween,
  center: BaseStyle.center,
  fill: {flex: 1}
});

const NavStyle = StyleSheet.create({
  titleStyle: {
    fontSize: 22,
    fontWeight: 'normal',
    fontFamily: BaseStyle.fontFamily,
    color: '#595959',
    alignSelf: 'center',
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: Colors7.white,
  }
});

const TextStyle = {
  title: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 22,
    color: '#595959',
    paddingVertical: 3,
  },
  subTitle: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 19,
    color: '#595959',
    paddingVertical: 2,
  },
  base: {
    fontSize: 16,
    fontFamily: BaseStyle.fontFamily,
    color: '#595959',
    paddingVertical: 1,
  },
  extra: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 14,
    color: '#777',
    paddingVertical: 1,
  },
  small: {
    fontFamily: BaseStyle.fontFamily,
    fontSize: 12,
    color: '#777',
    paddingVertical: 1,
  },
  blue: {
    fontSize: 16,
    fontFamily: BaseStyle.fontFamily,
    color: Colors7.blue,
    paddingVertical: 1,
  }
};

export {TextStyle, BaseStyle, NavStyle, Colors7};

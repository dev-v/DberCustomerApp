import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import IconButton from './src/components/Icon/IconButton';
import DrawerContent from './src/nav/DrawerContent';
import {NavStyle} from "./src/components/themes/Styles";
import Menu from "./src/nav/Menu";

const parseMenu = () => {
  const stack = Menu, drawer = {};
  let route, options;
  for (let routeName in Menu) {
    route = Menu[routeName];
    options = route.navigationOptions;
    if (options && typeof options != 'function') {
      options.headerTitle = options.title;
    }
    if (route.userDrawer) {
      drawer[routeName] = route;
      delete route.userDrawer;
    }
  }
  return {stack, drawer};
}

const {stack, drawer} = parseMenu(Menu);

const Stack = StackNavigator(
  stack,
  {
    navigationOptions: ({navigation}) => {
      return {
        headerTitleStyle: NavStyle.titleStyle,
        headerStyle: NavStyle.headerStyle,
        headerRight: <IconButton name='ios-contact' onPress={() => {
          navigation.navigate('DrawerOpen');
        }}/>
      }
    },
  });

export default DrawerNavigator(
  {
    Stack: {
      screen: Stack,
    },
    ...drawer,
  },
  {
    drawerPosition: 'right',
    contentComponent: DrawerContent,
  });
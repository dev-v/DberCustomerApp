import React from 'react';
import {ScrollView} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';

export default (props) => {
  const items = props.items.concat();
  const routes = items.splice(0, 1)[0].routes;
  return <ScrollView>
    <SafeAreaView>
      <DrawerItems {...props} items={items} activeItemKey={routes[routes.length - 1].routeName}/>
    </SafeAreaView>
  </ScrollView>;
};
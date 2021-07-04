import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../../screens/App/Home';
import DrawerContent from '../../../screens/App/Home/DrawerContent';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      drawerStyle={{width: '80%'}}
      drawerContent={({navigation}) => (
        <DrawerContent navigation={navigation} />
      )}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};
export default HomeDrawer;

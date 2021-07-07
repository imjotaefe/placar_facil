import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeDrawer from './HomeDrawer';
import ChooseType from '../../screens/App/CreateNewGame/ChooseType';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeDrawer} />
      <Stack.Screen name="ChooseType" component={ChooseType} />
    </Stack.Navigator>
  );
};

export default AppStack;

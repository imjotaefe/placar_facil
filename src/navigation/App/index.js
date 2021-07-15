import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeDrawer from './HomeDrawer';
import ChooseType from '../../screens/App/CreateNewGame/ChooseType';
import TypeNames from '../../screens/App/CreateNewGame/TypeNames';
import SortSide from '../../screens/App/CreateNewGame/SortSide';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChooseType" headerMode="none">
      <Stack.Screen name="Home" component={HomeDrawer} />
      <Stack.Screen name="ChooseType" component={ChooseType} />
      <Stack.Screen name="TypeNames" component={TypeNames} />
      <Stack.Screen name="SortSide" component={SortSide} />
    </Stack.Navigator>
  );
};

export default AppStack;

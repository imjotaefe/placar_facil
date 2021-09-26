import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeDrawer from './HomeDrawer';
import ScoreDrawer from './ScoreDrawer';
import ChooseType from '../../screens/App/CreateNewGame/ChooseType';
import TypeNames from '../../screens/App/CreateNewGame/TypeNames';
import SortSide from '../../screens/App/CreateNewGame/SortSide';
import GameConfig from '../../screens/App/CreateNewGame/GameConfig';
// import ScoreBoard from '../../screens/App/ScoreBoard';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="ScoreBoard" headerMode="none">
      <Stack.Screen name="Home" component={HomeDrawer} />
      <Stack.Screen name="ChooseType" component={ChooseType} />
      <Stack.Screen name="TypeNames" component={TypeNames} />
      <Stack.Screen name="SortSide" component={SortSide} />
      <Stack.Screen name="GameConfig" component={GameConfig} />
      <Stack.Screen name="ScoreBoard" component={ScoreDrawer} />
    </Stack.Navigator>
  );
};

export default AppStack;

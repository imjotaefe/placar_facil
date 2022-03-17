import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeDrawer from './HomeDrawer';
import ScoreDrawer from './ScoreDrawer';
import ChooseType from '../../screens/App/CreateNewGame/ChooseType';
import TypeNames from '../../screens/App/CreateNewGame/TypeNames';
import SortSide from '../../screens/App/CreateNewGame/SortSide';
import GameConfig from '../../screens/App/CreateNewGame/GameConfig';
import Sumula from '../../screens/App/Sumula';
import Graph from '../../screens/App/Sumula/Graph';
import WarmUp from './../../screens/App/CreateNewGame/WarmUp/index';
import AlterNames from '../../screens/App/AlterNames';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeDrawer} />
      <Stack.Screen name="ChooseType" component={ChooseType} />
      <Stack.Screen name="TypeNames" component={TypeNames} />
      <Stack.Screen name="SortSide" component={SortSide} />
      <Stack.Screen name="GameConfig" component={GameConfig} />
      <Stack.Screen name="ScoreBoard" component={ScoreDrawer} />
      <Stack.Screen name="Sumula" component={Sumula} />
      <Stack.Screen name="Graph" component={Graph} />
      <Stack.Screen name="WarmUp" component={WarmUp} />
      <Stack.Screen name="AlterNames" component={AlterNames} />
    </Stack.Navigator>
  );
};

export default AppStack;

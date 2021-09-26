import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ScoreBoard from '../../../screens/App/ScoreBoard';
import ScoreDrawerContent from '../../../screens/App/ScoreBoard/ScoreDrawerContent';

const Drawer = createDrawerNavigator();

const ScoreDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ScoreBoard"
      drawerPosition="left"
      drawerStyle={{width: '30%'}}
      drawerContent={({navigation}) => (
        <ScoreDrawerContent navigation={navigation} />
      )}>
      <Drawer.Screen name="ScoreBoard" component={ScoreBoard} />
    </Drawer.Navigator>
  );
};
export default ScoreDrawer;

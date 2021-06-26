import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import AuthStack from './Auth';

const Root = createStackNavigator();

const RootStack = () => {
  const isLoggedIn = false;
  return (
    <Root.Navigator initialRouteName="Auth" headerMode="none">
      {isLoggedIn ? (
        <Root.Screen name="App" component={<Text>app</Text>} />
      ) : (
        <Root.Screen name="Auth" component={AuthStack} />
      )}
    </Root.Navigator>
  );
};

export default RootStack;

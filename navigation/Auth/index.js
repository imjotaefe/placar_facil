import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp} from '../../screens/Auth';
import {SignIn} from '../../screens/Auth';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthStack;

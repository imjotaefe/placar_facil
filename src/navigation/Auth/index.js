import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp, SignIn, ForgotPassword} from '../../screens/Auth';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;

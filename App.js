import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation';
import {Text} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;

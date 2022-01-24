import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/store';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './Auth';
import AppStack from './App';
import {useSelector} from 'react-redux';

const Root = createStackNavigator();

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} = useSelector(({auth}) => auth);

  useEffect(() => {
    console.log('user>:', user);
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <Root.Navigator initialRouteName="AuthStack" headerMode="none">
      {isLoggedIn ? (
        <Root.Screen name="AppStack" component={AppStack} />
      ) : (
        <Root.Screen name="AuthStack" component={AuthStack} />
      )}
    </Root.Navigator>
  );
};

export default RootStack;

import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './Auth';
import AppStack from './App';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
import LoadingScreen from '../screens/Loading';

const Root = createStackNavigator();

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} = useSelector(({auth}) => auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(fireUser => {
      setIsLoggedIn(!!fireUser);
      setTimeout(() => setIsLoading(false), 3000);
    });

    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setTimeout(() => setIsLoading(false), 3000);
  }, [user]);

  return (
    <Root.Navigator initialRouteName="AuthStack" headerMode="none">
      {isLoading ? (
        <Root.Screen name="LoadingScreen" component={LoadingScreen} />
      ) : isLoggedIn ? (
        <Root.Screen name="AppStack" component={AppStack} />
      ) : (
        <Root.Screen name="AuthStack" component={AuthStack} />
      )}
    </Root.Navigator>
  );
};

export default RootStack;

import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View,
  AsyncStorage
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';

import { AppContext } from './context/AppContext'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './services/utility/Auth.hook'
import { useAppContext } from './services/utility/AppContext.hook'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Navigation

import { Routes } from './navigation/Routes'

console.disableYellowBox = true;

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [token2, setToken2] = useState()
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  const {token, refreshToken, login, logout, } = useAuth()
  const {ships, loadShips, schedules, loadSchedules, } = useAppContext()

  

  const getToken = async () => {
    const token = await AsyncStorage.getItem('Token')
    // token ? navigation.navigate('Bottom') : navigation.navigate('Auth')
    setToken2(token)
    console.log(token)
    // setToken(token)
  }

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    // getToken(navigation)
    console.log('Authenticated', isAuthenticated)
    // console.log('Token        ', token)
    // console.log('!Token     ', !!token)
    // console.log('There is a token     ', token2)
    setLoadingComplete(true);
  }, [])

  const isAuthenticated = !!token
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={{
        token, login, logout, refreshToken, isAuthenticated
      }}>
        <AppContext.Provider value={{ 
          ships, loadShips, schedules, loadSchedules,
        }}>
          <NavigationContainer>           
            <View style={styles.container}>
              <Routes auth={ isAuthenticated ? true : false }/>
            </View>
          </NavigationContainer>
        </AppContext.Provider>
      </AuthContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -20,
  },
  bottomTabNavigation: {
    zIndex: 1, 
    backgroundColor: 'white', 
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1
  },
  headerIcon: {
    width: 35, 
    fontSize: 23, 
    color: '#4A83B7',
  }
});

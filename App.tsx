import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View,
  AsyncStorage
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';

import { AppContext } from './context/AppContext'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './services/utility/Auth.hook'
import { useAppContext } from './services/utility/AppContext.hook'

import { Routes } from './navigation/Routes'

import { SplashScreen } from 'expo';
import { isAvailable } from 'expo/build/AR';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();

  // const [token2, setToken2] = useState()
  // const [state, dispatch] = React.useReducer(
  //   (prevState, action) => {
  //     switch (action.type) {
  //       case 'RESTORE_TOKEN':
  //         return {
  //           ...prevState,
  //           userToken: action.token,
  //           isLoading: false,
  //         };
  //       case 'SIGN_IN':
  //         return {
  //           ...prevState,
  //           isSignout: false,
  //           userToken: action.token,
  //         };
  //       case 'SIGN_OUT':
  //         return {
  //           ...prevState,
  //           isSignout: true,
  //           userToken: null,
  //         };
  //     }
  //   },
  //   {
  //     isLoading: true,
  //     isSignout: false,
  //     userToken: null,
  //   }
  // );

  const {token, login, logout, } = useAuth()
  const {ships, loadShips, schedules, loadSchedules, } = useAppContext()

  const getToken = async () => {
    // const token = await AsyncStorage.getItem('Token')
    // token ? navigation.navigate('Bottom') : navigation.navigate('Auth')
    // console.log(token);
    // setToken(token)
  }

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       // Restoring token failed
  //     }

  //     // After restoring token, we may need to validate it in production apps

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);

  // useEffect(() => {
  //   // getToken();
  //   console.log(token)
  //   console.log('Authenticated', isAuthenticated);
  //   // console.log('Token        ', token)
  //   // console.log('!Token     ', !!token)
  //   // console.log('There is a token     ', token2)
  //   setLoadingComplete(true);
  // }, [])


  React.useEffect(() => {
    console.log('Token', token)
    async function loadResourcesAndDataAsync() {
      try {
        console.log('Token', token)
        // console.log('Token', isAuthenticated)

        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    console.disableYellowBox = true;
    const isAuthenticated = !!token
    console.log('test', isAuthenticated)
    return (
      <AuthContext.Provider value={{
        token, login, logout, isAuthenticated
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

import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';

import { AppContext } from './context/AppContext'
import { useAppContext } from './services/utility/AppContext.hook'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// import { useAuth } from './services/auth/auth.hook'
// import { AuthContext } from './context/AuthContext'

import { BottomTab } from './navigation/BottomTab'

import NavigationService from './services/utility/NavigationService';

import { AuthScreen } from './screens/AuthScreen'
import { ShipScreen } from './screens/ShipScreen'
import { ListScreen } from './screens/ListScreen'
import { ScheduleScreen } from './screens/ScheduleScreen'
import { SettingsScreen } from './screens/SettingsScreen'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer'

console.disableYellowBox = true;

const store = createStore(rootReducer)
const Stack = createStackNavigator();

export default function App() {
  const {
    lang,
    ships, 
    loadShips
  } = useAppContext()

  return (
    // <Provider store={store}>

    // <AppContext.Provider>
    <AppContext.Provider value={{ 
      lang: 'fr',
      ships,
      loadShips,
    }}>

    {/* <AuthContext.Provider value={{
      token, login, logout, refresh_token, isAuthenticated
    }}> */}
      <NavigationContainer>           
        <View style={styles.container}>
        <Stack.Navigator 
          initialRouteName="Auth"
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
          })}
        >
          <Stack.Screen
            name="Auth" 
            component={AuthScreen}
            options={{ 
              headerShown: false 
            }}
          /> 
          <Stack.Screen
            name="Bottom" 
            component={BottomTab}
            options={{ 
              headerShown: false 
            }}
          />
          <Stack.Screen
            name="Schedule" 
            component={ScheduleScreen}
            options={{ 
              title: 'Schedule Location',
              headerBackTitle: '|',
              headerBackTitleStyle: { 
                color: 'white' 
              },
              headerRight: () => (
                <TouchableWithoutFeedback
                onPress={() => alert('Focus ship on the map')}
                >
                  <Icon 
                    name="reply"  
                    style={[styles.headerIcon, {
                      transform: [{ scaleX: -1 }],
                      marginRight: 15
                    }]}
                  />
                </TouchableWithoutFeedback>
              ), 
            }}
          /> 
          <Stack.Screen
            name="Ship" 
            component={ShipScreen}
            options={{ 
              headerShown: false,
              // title: 'Ship Title',
              // headerBackTitleStyle: { 
              //   color: 'white' 
              // },
              // headerRight: () => (
              //   // <View style={{ transform: [{ scaleX: "-1" }] }}>
              //     <TouchableWithoutFeedback
              //       onPress={() => alert('Focus ship on the map')}
              //     >
              //       <Icon name="crosshairs" style={styles.headerIcon} />
              //     </TouchableWithoutFeedback>
              //   // </View>
              // ), 
            }}
          /> 
          {/* <Stack.Screen
            name="Ship" 
            component={ShipScreen}
            options={({ 
              route, 
            }) => ({ 
              // title: route.params.params.user, 
              headerBackTitle: null,
            })}
          />  */}
          {/* <AuthScreen /> */}
          {/* <View style={styles.bottomTabNavigation}>
            <BottomTab/>
          </View> */}
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    {/* </AuthContext.Provider> */}

    {/* </Provider> */}
  
    </AppContext.Provider>
  );
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

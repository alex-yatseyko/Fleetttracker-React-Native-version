import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  AsyncStorage
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';

import { AppContext } from './context/AppContext'
import { useAppContext } from './services/utility/AppContext.hook'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { BottomTab } from './navigation/BottomTab'

// import NavigationService from './services/utility/NavigationService';

import { AuthScreen } from './screens/AuthScreen'
import { ShipScreen } from './screens/ShipScreen'
// import { ListScreen } from './screens/ListScreen'
import { ScheduleScreen } from './screens/ScheduleScreen'
// import { SettingsScreen } from './screens/SettingsScreen'

// import { createStore } from 'redux'

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState()
  const {
    ships, 
    loadShips,
    schedules, 
    loadSchedules,
  } = useAppContext()

  const getToken = async () => {
    const token = await AsyncStorage.getItem('Token')
    console.log(token)
    setToken(token)
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <AppContext.Provider value={{ 
      ships,
      loadShips,
      schedules, 
      loadSchedules,
    }}>
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
            }}
          /> 
          </Stack.Navigator>
        </View>
      </NavigationContainer>
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

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomTab } from './navigation/BottomTab'

import NavigationService from './services/utility/NavigationService';

import { AuthScreen } from './screens/AuthScreen'
import AppContainer from './navigation/AppContainer';

const Stack = createStackNavigator();

// createHomeStack = () => {
//   <Stack.Navigator>
//     <Stack.Screen name="Feed" component={}/>
//     <Stack.Screen name="Test" component={} />
//   </Stack.Navigator>
// }
export default function App() {


  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
            {/* <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            /> */}
      <View style={styles.container}>
        {/* <AuthScreen /> */}
        <View style={styles.bottomTabNavigation}>
          <BottomTab/>
        </View>
      </View>
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTabNavigation: {
    zIndex: 1, 
    backgroundColor: 'white', 
    // bottom: -50, 
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1
  }
});

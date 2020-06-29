import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image ,
    AsyncStorage,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';

import Globals from '../component-library/Globals';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// export const SettingsScreen = () => {
//     return (
//         <Stack.Navigator initialRouteName="Map">
//             <Stack.Screen 
//             name="Settings" 
//             component={Settings} 
//             options={{ 
//                 // headerShown: false 
//             }}
//             />
//         </Stack.Navigator>
//     )
// }

export const SettingsScreen = ({navigation}) => {
// const Settings = () => {
    return (
        <View style={styles.settings}>
            {/* <View style={styles.header}>
                <TouchableWithoutFeedback
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-left" style={styles.headerIcon} />
                </TouchableWithoutFeedback>
                <Text style={styles.headerTitle}>SETTINGS</Text>
                <Icon name="crosshairs" style={styles.headerHiddenIcon} />
            </View> */}
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <TouchableWithoutFeedback
                 onPress={() => {
                     console.log('Logout')
                     AsyncStorage.removeItem('Token');
                     AsyncStorage.removeItem('Name');
                     AsyncStorage.removeItem('Password');
                }}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        Logout
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}


const styles = StyleSheet.create({
    settings: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        // paddingTop: 200,
        // padding: 20
      },
    header: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    headerIcon: {
        fontSize: 20,
        paddingTop: 12,
        color: '#4A83B7',
    },
    headerHiddenIcon: {
        opacity: 0
    },
    headerTitle: {

    },
    logo: {
        alignItems: 'center',
        width: 200,
        height: 120
    },
    button: {
        backgroundColor: Globals.color.main,
        borderRadius: 5,
        paddingHorizontal: 58,
        paddingVertical: 17,
        borderColor: Globals.color.bordercolor,
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: Globals.font.size.headline,
        // fontFamily: 'Arial',
        fontWeight: '900'
    },
  });

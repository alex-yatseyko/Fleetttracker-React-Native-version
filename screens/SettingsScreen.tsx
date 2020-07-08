import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image ,
    AsyncStorage,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Globals from '../component-library/Globals';

export const SettingsScreen = ({navigation}) => {
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
            <View style={styles.header}>
                <TouchableWithoutFeedback
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" style={styles.leftIcon} />
                </TouchableWithoutFeedback>
                <Text style={styles.headerTitle}>SETTINGS</Text>
                <TouchableWithoutFeedback
                    style={{opacity: 0}}
                    // onPress={() => navigation.navigate('Map',
                    //     {
                    //         current: location
                    //     }
                    // )}
                >
                    <Icon name="crosshairs" style={styles.rightIcon} />
                </TouchableWithoutFeedback>
            </View>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <TouchableOpacity
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
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    settings: {
        paddingTop: Dimensions.get('window').height * 0.1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 20,
        zIndex: 99,
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    rightIcon: {
        color: '#4A83B7',
        fontSize: 23,
    },
    leftIcon: {
        color: '#4A83B7',
        fontSize: 33,
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333'
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

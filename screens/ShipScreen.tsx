import React, { useState, useEffect, useContext } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    AsyncStorage,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Globals from '../component-library/Globals';

export const ShipScreen = ({navigation}) => {
    const getShip = async () => {
        const token = await AsyncStorage.getItem('Token')
        try {
            const fetchedShip = await request(`https://api.app.fleettracker.de/api/ships/${shipId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
        } catch(e) {
            console.log(e)
        }
    }

    return(
        <View style={styles.settings}>
                <Text>ShipScreen</Text>
                <TouchableWithoutFeedback
                    onPress={() => {navigation.navigate('Schedule')}}
                >
                    <Text>Hamburg, Germany</Text>
                </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    settings: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        backgroundColor: '#fff'
        // paddingTop: 200,
        // padding: 20
      },
  });
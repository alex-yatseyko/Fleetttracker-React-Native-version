import React, { useState , useEffect, useContext} from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Globals from '../component-library/Globals';

export const ShipScreen = ({navigation}) => {
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
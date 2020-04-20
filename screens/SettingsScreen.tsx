import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image 
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Globals from '../component-library/Globals';

export const SettingsScreen = () => {
    return (
        <View style={styles.settings}>
            {/* <Text>SettingsScreen</Text> */}
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <TouchableWithoutFeedback
                 onPress={() => console.log('Logout')}
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
        paddingTop: 200,
        // padding: 20
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
        fontFamily: 'Arial',
        fontWeight: '900'
      },
  });

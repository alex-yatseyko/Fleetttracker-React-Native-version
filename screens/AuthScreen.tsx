import React, { useState , useEffect, useContext} from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useHttp } from '../services/utility/http.hook'

import Globals from '../component-library/Globals';

export const AuthScreen = () => {
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [ready, setReady] = useState([])

    const loginHandler = async () => {
        console.log('Logged in')
        // try {
        //     const data = await request('https://staging.api.app.fleettracker.de/api/token', 'POST', {...form}, {'Content-Type': 'application/json'})
        //     // console.log('Token: ', data.token)
        //     // console.log('RefreshToken', data.refresh_token)
        //     // console.log(data)
        //     auth.login(data.token, data.refresh_token)
        // } catch (e) {
        //     // console.log('Name or Password is incorrect')
        //     // console.log( 'Authentification:', e ? e : true )
        // }
    }

    return (
        <View style={styles.auth}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View>
            <View style={styles.authForm}>
                <TextInput 
                    placeholder="Name"
                    textContentType="username"
                    style={styles.authField}
                />
                <TextInput 
                    placeholder="Password"
                    textContentType="password"
                    maxLength={40}
                    style={styles.authField}
                />
            </View>
            <TouchableWithoutFeedback
                 onPress={loginHandler}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    auth: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        padding: 20
      },
      logo: {
        alignItems: 'center',
        width: 300,
        marginTop: 60,
      },
      authForm: {
        // marginBottom: 60
      },
      authField: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#00957E',
        paddingHorizontal: 30,
        paddingVertical: 10,
        textAlign: 'left',
        width: 200,
        marginBottom: 60
      },
      button: {
        backgroundColor: Globals.color.main,
        borderRadius: 5,
        borderColor: Globals.color.bordercolor,
        borderWidth: 1,
        paddingHorizontal: 58,
        paddingVertical: 17
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: Globals.font.size.headline,
        fontFamily: 'Arial',
        fontWeight: '900'
      },
  });
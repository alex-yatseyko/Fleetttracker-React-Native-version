import React, { useState , useEffect, useContext} from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useHttp } from '../services/utility/http.hook'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { AuthContext } from '../context/AuthContext'

import Globals from '../component-library/Globals';

export const AuthScreen = ({navigation}) => {
    const auth = useContext(AuthContext)
    const [openKeyboard, setOpenKeyboard] = useState(false)
    const { loading, error, request } = useHttp()

    const [login, setLogin] = useState()
    const [pass, setPass] = useState()


    useEffect(() => {
        console.log('Errors: ', error ? error : 'No errors found')
    }, [error])

    // useEffect(() => {
    //     // window.M.updateTextFields()
    // }, [])

    const changeLogin = (e) => {
        setLogin(e.nativeEvent.text)
    }
    const changePass = (e) => {
        setPass(e.nativeEvent.text)
    }

    const loginHandler = async () => {
        try {
            const data = await request('https://staging.api.app.fleettracker.de/api/token', 'POST', {'name': login, 'password': pass}, {'Content-Type': 'application/json'})
            // console.log('Token: ', data.token)
            // console.log('RefreshToken', data.refresh_token)
            // auth.login(data.token, data.refresh_token)
            AsyncStorage.setItem('Token', data.token)
            AsyncStorage.setItem('Name', login)
            AsyncStorage.setItem('Password', pass)
            navigation.navigate('Bottom')
        } catch (e) {
            alert('Name or Password is incorrect')
            // console.log( 'Authentification:', e ? e : true )
        }
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, [])

    const _keyboardDidShow = () => {
        setOpenKeyboard(true)
      };
    
    const _keyboardDidHide = () => {
        setOpenKeyboard(false)
    };

    return (
        <View style={styles.auth}>
            {
                !openKeyboard ?
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                : null
            }
            <View>
                <View style={[styles.authForm, 
                    !openKeyboard ? {justifyContent: 'space-around'} : {justifyContent: 'space-around', paddingTop: 115}]}>
                    <TextInput 
                        placeholder="Name"
                        textContentType="username"
                        style={styles.authField}
                        onChange={ changeLogin }
                    />
                    <TextInput 
                        placeholder="Password"
                        textContentType="password"
                        maxLength={40}
                        style={styles.authField}
                        onChange={ changePass }
                        secureTextEntry={true}
                    />
                </View>
                <TouchableWithoutFeedback
                    onPress={loginHandler}
                    // onPress={() => navigation.navigate('Bottom')}
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
        flex: 1,
        padding: 20
      },
    logo: {
        // alignItems: 'center',
        // width: 200,
        // marginTop: 60,
        alignItems: 'center',
        width: 200,
        height: 120,
        marginTop: 115,
        marginBottom: 100,
        ...ifIphoneX({
            marginTop: 115,
        }, {
            marginTop: 80,
        })
      },
    authForm: {
        // marginBottom: 60
        // marginTop: 100    
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
        fontWeight: '900'
    },
  });
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

import { AuthContext } from '../context/AuthContext'

import Globals from '../component-library/Globals';

export const AuthScreen = ({navigation}) => {
    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()
    const [form, setForm] = useState({
        name: '',
        password: ''
    })

    useEffect(() => {
        console.log('Errors: ', error ? error : 'No errors found')
    }, [error])

    useEffect(() => {
        // window.M.updateTextFields()
    }, [])

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('https://staging.api.app.fleettracker.de/api/token', 'POST', {...form}, {'Content-Type': 'application/json'})
            // console.log('Token: ', data.token)
            // console.log('RefreshToken', data.refresh_token)
            auth.login(data.token, data.refresh_token)
        } catch (e) {
            // console.log('Name or Password is incorrect')
            // console.log( 'Authentification:', e ? e : true )
        }
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
                    onChange={ changeHandler }
                />
                <TextInput 
                    placeholder="Password"
                    textContentType="password"
                    maxLength={40}
                    style={styles.authField}
                    onChange={ changeHandler }
                />
            </View>
            <TouchableWithoutFeedback
                //  onPress={loginHandler}
                onPress={() => navigation.navigate('Bottom')}
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
        // alignItems: 'center',
        // width: 200,
        // marginTop: 60,
        alignItems: 'center',
        width: 200,
        height: 120,
        marginTop: 100
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
        // fontFamily: 'Arial',
        fontWeight: '900'
      },
  });
import { useState, useCallback, useEffect } from 'react'
// import AsyncStorage from '@react-native-community/async-storage';
// import SyncStorage from 'sync-storage';

import { StyleSheet, View, AsyncStorage } from 'react-native';
 
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [ready, setReady] = useState()

    const login = useCallback((jwtToken, jwtRefreshToken, login, pass) => {
        setToken(jwtToken)
        setRefreshToken(jwtRefreshToken)

        AsyncStorage.setItem('Token', jwtToken)
        AsyncStorage.setItem('Name', login)
        AsyncStorage.setItem('Password', pass)

        // SyncStorage.set('Token', jwtToken);

        // AsyncStorage.setItem('token', jwtToken)

        // localStorage.setItem(storageName.JSON.stringify({
        //     token: jwtToken, refreshToken: jwtRefreshToken
        // }))

        // console.log(localStorage)
        console.log(jwtToken)
    }, [])

    const logout = useCallback(() => {
        setToken( null )
        setRefreshToken( null )

        AsyncStorage.removeItem('Token');
        AsyncStorage.removeItem('Name');
        AsyncStorage.removeItem('Password');
        // localStorage.removeItem( storageName )
    }, [])

    useEffect(() => {
        // const data = JSON.parse(localStorage.getItem(storageName))

        // if ( data && data.token ) {
        //     login(data.token, data.refresh_token)
        // }
        // setReady(true)
    }, [ login ])

    return { login, logout, token, refreshToken }
}
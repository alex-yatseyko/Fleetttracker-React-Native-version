import { useState, useCallback, useEffect } from 'react'
// import AsyncStorage from '@react-native-community/async-storage';
// import SyncStorage from 'sync-storage';
import { AsyncStorage } from 'react-native';
 
export const useAuth = () => {
    const [token, setToken] = useState(null)
    // const [refreshToken, setRefreshToken] = useState(null)
    const [ready, setReady] = useState()

    const login = useCallback((jwtToken, jwtRefreshToken, login, pass) => {
        setToken(jwtToken)
        // setRefreshToken(jwtRefreshToken)

        AsyncStorage.setItem('Token', jwtToken)
        AsyncStorage.setItem('Name', login)
        AsyncStorage.setItem('Password', pass)

        console.log(jwtToken)
    }, [])

    const logout = useCallback(() => {
        setToken( null )
        setRefreshToken( null )

        AsyncStorage.removeItem('Token');
        AsyncStorage.removeItem('Name');
        AsyncStorage.removeItem('Password');
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('Token');

        console.log('Checks', token)

        if ( token ) {
            login(token)
        }
        setReady(true)
    }

    useEffect(() => {
        checkToken();
        // const data = JSON.parse(localStorage.getItem(storageName))

        // if ( data && data.token ) {
        //     login(data.token, data.refresh_token)
        // }
        // setReady(true)
    }, [ login ])

    return { login, logout, token }
}
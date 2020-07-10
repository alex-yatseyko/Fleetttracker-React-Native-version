import { useState, useCallback, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
 
// const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)

    const login = useCallback((jwtToken, jwtRefreshToken) => {
        setToken(jwtToken)
        setRefreshToken(jwtRefreshToken)
    }, [])

    const logout = useCallback(() => {
        setToken( null )
        setRefreshToken( null )
        AsyncStorage.removeItem('Token');
        AsyncStorage.removeItem('Name');
        AsyncStorage.removeItem('Password');
    }, [])

    useEffect(() => {
        // const data = JSON.parse(localStorage.getItem(storageName))

        const data = AsyncStorage.getItem('token')

        if ( data && data.token ) {
            login(data.token, data.refresh_token)
        }
    }, [ login ])

    return { login, logout, token, refreshToken }
}
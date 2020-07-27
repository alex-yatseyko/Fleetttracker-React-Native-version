import { createContext } from 'react'
import { AsyncStorage } from 'react-native';

const token = AsyncStorage.getItem('Token');
function noop() {}

export const AuthContext = createContext({
    token: token,
    // refresh_token: null,
    login: noop,
    logout: noop,
    // isAuthenticated: false,
    username: null,
    pass: null,
})
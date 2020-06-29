const initailState = {
    token: 0,
    refreshToken: ''
}

export const authReducer = (state = initailState, action) => {
    switch (action.type) {
        case 'INCREMENT':
          return state.token + 1
        case 'DECREMENT':
          return state.token - 1
        default:
          return state
    }
    // return state
}
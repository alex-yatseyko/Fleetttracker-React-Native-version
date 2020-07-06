import React, { createContext } from 'react';

function noop() {}

export const AppContext = createContext({ 
    lang: 'en',
    ships: [],
    loadShips: noop,
});
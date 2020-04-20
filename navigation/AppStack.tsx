import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import { ListScreen } from '../screens/ListScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { MapScreen } from '../screens/MapScreen'

export default createStackNavigator(
    {
        ListScreen: {
            screen: ListScreen
        },
        SettingsScreen: {
            screen: SettingsScreen
        },
        MapScreen: {
            screen: MapScreen
        }
    }
)
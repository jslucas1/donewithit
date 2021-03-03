import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MapScreen from '../screens/MapScreen';
import AccountScreen from '../screens/AccountScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AccountNavigator from './AccountNavigator';
import TideNavigator from './TideNavigator';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NewListingButton from './NewListingButton';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen 
            name="Home" 
            component={WelcomeScreen} 
            options = {{
                tabBarIcon: ({color, size}) =>
                    <MaterialCommunityIcons name="home" color={color} size={size} />  
            }}
        />
        <Tab.Screen 
            name="Location" 
            component={MapScreen} 
            options = {{
                tabBarIcon: ({color, size}) =>
                    <MaterialCommunityIcons name="google-maps" color={color} size={size} />
            }}
        />
        <Tab.Screen 
            name="Weather" 
            component={AccountNavigator} 
            options = {{
                tabBarIcon: ({color, size}) =>
                    <MaterialCommunityIcons name="weather-sunny" color={color} size={size} />
            }}
        />
        <Tab.Screen 
            name="Tides" 
            component={TideNavigator} 
            options = {{
                tabBarIcon: ({color, size}) =>
                    <MaterialCommunityIcons name="wave" color={color} size={size} />
            }}
        />
        <Tab.Screen 
            name="Safety" 
            component={AccountNavigator} 
            options = {{
                tabBarIcon: ({color, size}) =>
                    <MaterialCommunityIcons name="safety-goggles" color={color} size={size} />
            }}
        />
    </Tab.Navigator>
)

export default AppNavigator;
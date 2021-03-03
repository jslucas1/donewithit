import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TideScreen from '../screens/ListingsScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

const TideNavigator = () => (
    <Stack.Navigator mode="modal">
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen 
            name="Tides" 
            component={TideScreen} 
        />
    </Stack.Navigator>
)

export default TideNavigator;
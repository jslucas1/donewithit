import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TideScreen from '../screens/TidesScreen';
import TideMapScreen from '../screens/TidesMapScreen';

const Stack = createStackNavigator();

const TideNavigator = () => (
    <Stack.Navigator mode="modal">
        <Stack.Screen name="Map" component={TideMapScreen} />
        <Stack.Screen 
            name="Tides" 
            component={TideScreen} 
        />
    </Stack.Navigator>
)

export default TideNavigator;
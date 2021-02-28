import React from 'react';
import {Button, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Screen from './app/components/Screen';
import ListingEditScreen from './app/screens/ListingEditScreen';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';

const Link = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Click"
      onPress={() => {navigation.navigate("TweetDetails", {id: 1})} }
    />
  )
}

const Tweets = ({navigation}) => (
  <Screen>
    <Text>Tweets</Text>
    <Link />
  </Screen>
)

const TweetDetails = ( {route}) => (
  <Screen>
    <Text>Tweet Details {route.params.id}</Text>
  </Screen>
);

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle : {backgroundColor: "dodgerblue"},
      headerTintColor: "white",
      headerTitleAlign: "center",
    }}
    initialRouteName="Tweets"
  >
    <Stack.Screen 
      name="Tweets" 
      component={Tweets} 
    />
    <Stack.Screen 
      name="TweetDetails" 
      component={TweetDetails}
      options={({route}) => ({title: route.params.id})} 
    />
  </Stack.Navigator>
);

const Account = () => <Screen><Text>Account</Text></Screen>;

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "tomato",
      activeTintColor: "white",
      inactiveBackgroundColor: "#eee",
      inactiveTintColor: "black"
    }}
  >
    <Tab.Screen 
      name="Feed" 
      component={StackNavigator} 
      options={{
        tabBarIcon: ({size, color}) => <MaterialCommunityIcons name = "home" size={size} color={color} />
      }}
    />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

export default function App() {

  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

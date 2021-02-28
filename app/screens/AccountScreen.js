import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator.js';
import navigationTheme from '../navigation/navigationTheme';

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        }
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary
        },
        targetScreen: "Messages",
    },
];

function AccountScreen({navigation}) {
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title="Jeff Lucas"
                    subTitle="jslucas1@msn.com"
                    image={require("../assets/jeff.jpg")}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItems=>menuItems.title}
                    ItemSeparatorComponent = {ListItemSeparator}
                    renderItem = {({item}) =>
                        <ListItem
                            title = {item.title}
                            IconComponenet={
                                <Icon
                                    name={item.icon.name} 
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            } 
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    }
                />
            </View>
            <ListItem 
                title="Log Out"
                IconComponenet = {
                    <Icon name="logout" backgroundColor="#ffe66d"/>
                }
            />
        </Screen>
    );
}

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    screen: {
        backgroundColor: colors.light
    }
})
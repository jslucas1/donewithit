import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages = [
    {id: 1,
    title: 'T1',
    description: 'D1',
    image: require('../assets/jeff.jpg')
    },
    {id: 2,
        title: 'T2sdfasdfsadfasdfasfsdfsdfsdf asfsdf sadfasdf asdfsdafsdafsf asdfsadf',
        description: 'D2',
        image: require('../assets/jeff.jpg')
    },
    {id: 3,
        title: 'T3',
        description: 'D3',
        image: require('../assets/jeff.jpg')
    },
]

function MessagesScreen(props) {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = message => {
        const newMessages = messages.filter(m => m.id !== message.id);
        setMessages(newMessages)
    }
    return (
        
        <Screen>
            <FlatList
            data={messages} 
            keyExtractor = {message => message.id.toString()} 
            renderItem = {({item}) => 
                <ListItem 
                    title={item.title}
                    subTitle={item.description}
                    image={item.image}
                    onPress={()=> console.log("message selected", item)}
                    renderRightActions = {() => 
                        <ListItemDeleteAction onPress={() => handleDelete(item)}

                        />
                    }
                />}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing = {refreshing}
                onRefresh = {()=> {
                    setMessages(initialMessages);
                }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    
})

export default MessagesScreen;

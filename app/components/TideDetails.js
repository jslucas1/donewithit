import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
 
function TideDetails({station, time, type, tide}) {
    return (
        <View >
                <Text>{station}  {time}  {type}  {tide}</Text>         
        </View>
    );
}
 
const styles = StyleSheet.create({
    tideContainer: {
        flex: 0,
        backgroundColor: '#f7b733'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tideText: {
        fontSize: 10,
        color: '#fff'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    }
})
 
export default TideDetails;
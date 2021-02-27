import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import * as Location from 'expo-location';

function AddressFinder() {
    const location = {
        latitude: 28.881062,
        longitude: -86.625601
    }
    const [address, setAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const requestPermission = async () => {
        const {granted} = await Location.requestPermissionsAsync();
        if(!granted) {
            setErrorMsg('Permission denied');
            return;
        }
          
      }
    
    const getAddress = async () => {
        let tempAddress = await Location.reverseGeocodeAsync(location);
        setAddress(tempAddress);
    }

      useEffect(() => {
        requestPermission();
        getAddress();
      }, [])

      let text = 'waiting..';
      if(errorMsg){
          text = errorMsg;
      } else if(address){
          text=JSON.stringify(address)
      }

    return (
        <View style={styles.container}>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner: {

    }
})

export default AddressFinder;
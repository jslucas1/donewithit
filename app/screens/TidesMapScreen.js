import React, {useEffect, useState} from 'react';
import { Alert, Dimensions, View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText/AppText';
import useLocation from '../hooks/useLocation';
import Stations from '../assets/Stations.json';
import Screen from '../components/Screen';
import routes from '../navigation/routes';
import * as Location from 'expo-location';


function TidesMapScreen({navigation}) {

    const initialMapRegion = { latitude: 30.2786, longitude:  -87.552, latitudeDelta: 0.09, longitudeDelta: 0.04 };
    const initialMapState = {
        isLoading: true,
        mapRegion: initialMapRegion,
        locationResult: null,
        location: {coords: {latitude: 30.2786, longitude:  -87.552}}
    }
    const [mapState, setMapState] = useState(initialMapState);

    const getLocation = async () => {
        console.log("get location was called");
        try {
            const {granted} = await Location.requestPermissionsAsync();
            if(!granted){
              return;
            } else {
              const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
              console.log("in get location and found " + latitude + " " + longitude);
              isLoading = false;
              setMapState({
                    ...mapState,
                    mapRegion: { latitude: latitude, longitude: longitude, latitudeDelta: 0.09, longitudeDelta: 0.04 },
                    isLoading: false,
                    location: { coords: { latitude: latitude, longitude: longitude } }
                });

            }   
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocation();
    }, []);

    
    const handleMapPress = (event)=>{
        console.log("in handle Map Press");
        setMapState({
            ...mapState,
            mapRegion: { latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude, latitudeDelta: 0.9, longitudeDelta: 0.9 },
            location: {coords: {latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude}}
        })
    }

    const handleRegionChange = (region) => {
        setMapState({
            ...mapState,
            mapRegion: region,
            location: {coords: {latitude: region.latitude, longitude: region.longitude}}
        })
    }
    
    
    // const centerOnUserLocation = () => {
    //     console.log("in here " + JSON.stringify(userLocation));
    //     if(userLocation){
    //         console.log("Passed the if");
    //         setMapRegion({
    //             ...mapRegion,
    //             latitude: userLocation.latitude,
    //             longitude: userLocation.longitude  
    //         }
    //         )
    //         setMapState({
    //             mapRegion: mapState.mapRegion,
    //             locationResult: mapState.locationResult,
    //             location: {coords: {latitude: userLocation.latitude, longitude: userLocation.longitude}}
    //         })
    //     } else {
    //         console.log("didn't have it");
    //     }


    //}


    
    
    return (
            <Screen style={styles.container}>
                {mapState.isLoading ? (
                    <AppText>Loading Map Data</AppText>
                ):(
                    <MapView style={styles.map} 
                        onPress={(event) => {handleMapPress(event)}}
                        region = {mapState.Region}
                        onRegionChange={(region) => {handleRegionChange(region)}}
                        location = {mapState.location.coords}
                        showsUserLocation={true}
                    >
                    {Stations.Sheet1.map((markerData)=> {
                        var lat = parseFloat(markerData.lat);
                        var long = parseFloat(markerData.long)
                        console.log("In the marker");
                        return (
                        <MapView.Marker
                            key= {markerData.Location}
                            coordinate={{
                                latitude:lat,
                                longitude:long
                            }}
                            onPress={()=> navigation.navigate(routes.TIDE_SCREEN, markerData)}
                            title = {markerData.Location}
                        />
                    )})}
                </MapView>
                )}
                
            </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})

export default TidesMapScreen;
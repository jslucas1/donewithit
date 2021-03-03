import React, {useEffect, useState} from 'react';
import { Alert, Dimensions, View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AppButton from '../components/AppButton';
import useLocation from '../hooks/useLocation';
import Stations from '../assets/Stations.json';
import Screen from '../components/Screen';
import routes from '../navigation/routes';


function MapScreen({navigation}) {

    console.log(Stations.Sheet1[0].lat);

    const initialMapRegion = { latitude: 30.2786, longitude:  -87.552, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
    const initialMapState = {
        mapRegion: initialMapRegion,
        locationResult: null,
        location: {coords: {latitude: 30.2786, longitude:  -87.552}}
    }


    const [mapState, setMapState] = useState(initialMapState);
    const [mapRegion, setMapRegion] = useState(initialMapRegion);

    
    const handleMapPress = (event)=>{
        setMapRegion({
            ...mapRegion,
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        })
        setMapState({
            mapRegion: mapState.mapRegion,
            locationResult: mapState.locationResult,
            location: {coords: {latitude: event.nativeEvent.coordinate.latitude, longitude: event.nativeEvent.coordinate.longitude}}
        })
    }
    
    const userLocation = useLocation();
    const centerOnUserLocation = () => {
        console.log("in here " + JSON.stringify(userLocation));
        if(userLocation){
            console.log("Passed the if");
            setMapRegion({
                ...mapRegion,
                latitude: userLocation.latitude,
                longitude: userLocation.longitude  
            }
            )
            setMapState({
                mapRegion: mapState.mapRegion,
                locationResult: mapState.locationResult,
                location: {coords: {latitude: userLocation.latitude, longitude: userLocation.longitude}}
            })
        } else {
            console.log("didn't have it");
        }


    }
    // useEffect(() => {
    //     centerOnUserLocation();
    // }, [userLocation]);

    
    
    return (
            <Screen style={styles.container}>
                <MapView style={styles.map} 
                    region={mapRegion}
                    onPress={(event) => {handleMapPress(event)}}
                    // onRegionChange={(region) => {setMapRegion(region)}}
                >
                    <MapView.Marker 
                        coordinate={{
                            latitude: mapState.location.coords.latitude,
                            longitude: mapState.location.coords.longitude,
                        }}
                        title={"Search Location"}
                    />
                    {Stations.Sheet1.map((markerData)=> {
                        var lat = parseFloat(markerData.lat);
                        var long = parseFloat(markerData.long)
                        return (
                        <MapView.Marker
                            key= {markerData.Location}
                            coordinate={{
                                latitude:lat,
                                longitude:long
                            }}
                            onPress={()=> navigation.navigate(routes.TIDE_SCREEN, {lat,long})}
                            title = {markerData.Location}
                        />
                    )})}
                </MapView>
                <AppButton title="Click to center on your location" color="primary" onPress={()=> centerOnUserLocation()} />
                <AppButton title="Click for Tide Data" color="secondary" onPress={()=> navigation.navigate(routes.TIDE_SCREEN,mapState.location.coords)}/>
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

export default MapScreen;
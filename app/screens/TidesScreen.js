import React, {useState} from 'react';
import { FlatList, StyleSheet, Text} from 'react-native';
import TideDetails from '../components/TideDetails';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
 
export default function TidesScreen({route}) {
    const theStation = route.params;
    console.log(theStation);
    let station = '8729840';
    let beginDate= '20210302';
    let endDate = '20210305';
 
    const fetchTides = (station, beginDate, endDate) => {
        const fetchUrl = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${beginDate}&end_date=${endDate}&station=${station}&product=predictions&datum=STND&time_zone=gmt&interval=hilo&units=english&format=json`;
        fetch(fetchUrl)           
            .then(res => res.json())
            .then(json => {
                const updatedState = {
                    tideData: json.predictions,
                    isLoading: false,
                    error: null
                }
                setTideState(updatedState);
            });
    }
  
    const initialTideState = {
        tideData: [],
        isLoading: true,
         error: null
    }
 
    const [tideState, setTideState] = useState(initialTideState);
 
    return (
        <Screen style={styles.container}>
            {tideState.isLoading ? (
                <AppButton title="Today's Tides" onPress={()=> fetchTides(station, beginDate, endDate)}  />
 
                ):(
                    
                    tideState.tideData.map((data)=> {
                        return (
                        <TideDetails 
                            key= {data.t}
                            station={station}
                            time={data.t}
                            type={data.type}
                            tide={data.v}
                    />
                    )})
                    
                 )}
            
        </Screen>
    );
}
 
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
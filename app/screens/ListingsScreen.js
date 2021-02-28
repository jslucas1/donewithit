import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import listingsApi from '../api/listings';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes'
import AppText from '../components/AppText/AppText';
import AppButton from '../components/AppButton';

function ListingsScreen({navigation}) {

    const [listings, setListings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadListings();
    }, []);

    const loadListings = async () => {
        setLoading(true);
        const response = await listingsApi.getListings();
        setLoading(false);

        if(!response.ok){
            setError(true);
            return;
        }
        
        setError(false);
        setListings(response.data);      
    }
    return (
        <Screen style={styles.screen}>
            {error && (
                <>
                    <AppText>Couldn't retrieve the listings.</AppText>
                    <AppButton title="Retry" onPress={loadListings} />
                </>)
            }
            <ActivityIndicator animating={true} size="large"/>
            <FlatList 
                data={listings}
                keyExtractor = {listing => listing.id.toString()}
                renderItem = {({item}) =>
                    <Card 
                        title={item.title}
                        subTitle={"$" + item.price}
                        imageUrl={item.images[0].url}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                    />
                }
            />

            
        </Screen>
    );
}

export default ListingsScreen;

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light
    }
})
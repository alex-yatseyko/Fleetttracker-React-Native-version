import React, { useState, useEffect, useContext } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    AsyncStorage,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useHttp } from '../services/utility/http.hook'
import Globals from '../component-library/Globals';

export const ShipScreen = ({route, navigation}) => {
    const [ future, setFuture ] = useState([])

    const { request } = useHttp()
    const { data } = route.params;
    const getShip = async () => {
        const token = await AsyncStorage.getItem('Token')
        const shipId = data.slice(data.length - 4, data.length)
        try {
            const fetchedShip = await request(`https://staging.api.app.fleettracker.de/api/ships/${shipId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            const fetchedShipLatestPosition = await request(`https://staging.api.app.fleettracker.de/api/ships/${shipId}/latest_position`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetchedShip)
            console.log(fetchedShipLatestPosition)

            const shipLocation:any = [fetchedShipLatestPosition.posy / 60000, fetchedShipLatestPosition.posx / 60000]
            AsyncStorage.setItem('currentLocation', JSON.stringify(shipLocation))

            const scheduleId = fetchedShip['schedules'][0]['@id'].slice(15, 19)

            const fetchedFuture = await request(`https://staging.api.app.fleettracker.de/api/future_schedule_entries?schedule_id=${scheduleId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log('Future', fetchedFuture['hydra:member'])

                        /* Places requests */
            let i
            for (i = 0; i < fetchedFuture['hydra:member'].length; i++) {
                let fixedID = fetchedFuture['hydra:member'][i]['fixedObject'].slice(19, 24) 

                const fetchedFixedObj = await request(`https://staging.api.app.fleettracker.de/api/fixed_objects/${fixedID}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                console.log(fetchedFixedObj)
                // console.log([posx / 60000, posy / 60000])

                fetchedFuture['hydra:member'][i]['unlocationcode'] = fetchedFixedObj.unlocationcode
                fetchedFuture['hydra:member'][i]['countrycode'] = fetchedFixedObj.countrycode
                fetchedFuture['hydra:member'][i]['name'] = fetchedFixedObj.name
            }
            
            console.log('Future Edited', fetchedFuture['hydra:member'])            

            /* Places requests */

            for (let i = 0; i < fetchedFuture['hydra:member'].length; i++) {
                let fixedID = fetchedFuture['hydra:member'][i]['fixedObject'].slice(19, 24) 

                const fetchedFixedObj = await request(`https://staging.api.app.fleettracker.de/api/fixed_objects/${fixedID}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                console.log(fetchedFixedObj)
                // console.log([posx / 60000, posy / 60000])

                fetchedFuture['hydra:member'][i]['unlocationcode'] = fetchedFixedObj.unlocationcode
                fetchedFuture['hydra:member'][i]['countrycode'] = fetchedFixedObj.countrycode
                fetchedFuture['hydra:member'][i]['name'] = fetchedFixedObj.name
            }
            
            console.log('Future Edited', fetchedFuture['hydra:member'])

            setFuture(fetchedFuture)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(data)
        console.log(data.slice(11, 15))
        getShip()
    }, [])

    return(
        <View style={styles.settings}>
                <Text>ShipScreen</Text>
                <TouchableWithoutFeedback
                    onPress={() => {navigation.navigate('Schedule')}}
                >
                    <Text>Hamburg, Germany</Text>
                    <Text>{data.slice(11, 15)}</Text>
                    <Text>{data.slice(0, -4)}</Text>
                    <Text>{data.slice(data.length - 4, data.length)}</Text>
                    {(future['hydra:member'].length > 0) ? future['hydra:member'].map(i => {
                        return(
                            <Text>{i['name']}</Text>
                        )})
                    : <View style={styles.notFound}><Text>Future Schedules Not Found for this ship</Text></View>}
                </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    settings: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        backgroundColor: '#fff'
        // paddingTop: 200,
        // padding: 20
      },
      notFound: {
          
      }
  });
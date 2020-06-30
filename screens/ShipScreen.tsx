import React, { useState, useEffect, useContext } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    AsyncStorage,
    ScrollView,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useHttp } from '../services/utility/http.hook'
import Globals from '../component-library/Globals';
import countries from '../assets/data/countryCodeISO.json'

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

    if(!future['hydra:member']) {
        return (
            <View>
                <Text>Future Schedules Not Found for this ship</Text>
            </View>
        )
    }

    return(
        <View style={styles.settings}>
                {/* <Text>ShipScreen</Text> */}
                    {/* <Text>Hamburg, Germany</Text>
                    <Text>{data.slice(11, 15)}</Text>
                    <Text>{data.slice(0, -4)}</Text>
                <Text>{data.slice(data.length - 4, data.length)}</Text> */}
                <ScrollView>
                    {(future['hydra:member'].length > 0) ? future['hydra:member'].map(i => {
                        return(
                            <View key={i['@id']} style={styles.detailsSchedule}>
                                <TouchableWithoutFeedback
                                    onPress={() => {navigation.navigate('Schedule')}}
                                >
                                                {/* <Text>{i['name']}</Text> */}
                                    <View style={styles.detailsPlace}>
                                        <Text style={styles.placeText}>{i['countrycode']} {i['unlocationcode']}</Text>
                                        <Text style={styles.mainText}>
                                            <Text>{i['name']},</Text> 
                                            <Text style={styles.detailsCountry}>{countries[`${i['countrycode']}`]}</Text>
                                        </Text>
                                        <Text>{`

                                        ${i['portactivities'][0] ? i['portactivities'][0] : 'No data'} 
                                        ${i['portactivities'][1] ?', ' + i['portactivities'][1] : ''} 
                                        ${i['portactivities'][2] ?', ' + i['portactivities'][2] : ''}

                                        `}</Text>
                                    </View>
                                    <View style={styles.detailsTimeline}>
                                        <View style={styles.circle} />
                                        <View style={styles.scheduleLineDetails} />
                                    </View>
                                    <View style={styles.detailsDates}>
                                        <Text style={styles.dateText}>
                                        {new Date(Date.parse(i['eta'])).getDate() > 9 ? new Date(Date.parse(i['eta'])).getDate() : `0${new Date(Date.parse(i['eta'])).getDate()}`}.
                                            {new Date(Date.parse(i['eta'])).getMonth() + 1 > 9 ? new Date(Date.parse(i['eta'])).getMonth() + 1 : `0${new Date(Date.parse(i['eta'])).getMonth() + 1} `}
                                            {`${new Date(Date.parse(i['eta'])).getHours()}:00`}
                                            <Text style={styles.greyText}>  ETA</Text>
                                        </Text>
                                        <Text style={styles.dateText}>
                                            {new Date(Date.parse(i['etd'])).getDate() > 9 ? new Date(Date.parse(i['etd'])).getDate() : `0${new Date(Date.parse(i['etd'])).getDate()}`}.
                                            {new Date(Date.parse(i['etd'])).getMonth() + 1 > 9 ? new Date(Date.parse(i['etd'])).getMonth() + 1 : `0${new Date(Date.parse(i['etd'])).getMonth() + 1} `}  
                                            {`${new Date(Date.parse(i['etd'])).getHours()}:00`}
                                            <Text style={styles.greyText}>  ETB</Text>
                                        </Text>
                                        <Text style={styles.dateText}>
                                            {new Date(Date.parse(i['etd'])).getDate() > 9 ? new Date(Date.parse(i['etd'])).getDate() : `0${new Date(Date.parse(i['etd'])).getDate()}`}.
                                            {new Date(Date.parse(i['etd'])).getMonth() + 1 > 9 ? new Date(Date.parse(i['etd'])).getMonth() + 1 : `0${new Date(Date.parse(i['etd'])).getMonth() + 1} `} 
                                            {`${new Date(Date.parse(i['etd'])).getHours()}:00`}
                                            <Text style={styles.greyText}>  ETD</Text>
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )})
                    : <View style={styles.notFound}><Text>Future Schedules Not Found for this ship</Text></View>}
                </ScrollView>
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

      },
      detailsSchedule: {
        
      },
      detailsPlace: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 30,
      },
      detailsTimeline: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      circle: {
        backgroundColor: '#4A83B7',
        width: 5,
        height: 5,
        borderRadius: 25,
        marginHorizontal: 30,
        // margin: 0px 30px
      },
      scheduleLineDetails: {
        backgroundColor: '#4A83B7',
        width: 1,
        height: 120,
        position: 'relative',
        left: -3,
      },
      detailsDates: {
        textAlign: 'right',
        width: 100,
        minWidth: 100,
        // text-align: right;
        // display: flex;
        flexDirection: 'column',
        justifyContent: 'center'
      },
      placeText: {
        color: '#707070'
      },
      mainText: {
        color: '#4A83B7'
      },
      dateText: {
        color: '#707070'
      },
      greyText: {
        color: '#BFBFBF'
      },
  });
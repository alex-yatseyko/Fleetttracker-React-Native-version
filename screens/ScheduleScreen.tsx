import React, { useState , useEffect, useContext} from 'react';
import { 
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    TextInput,
    Image,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconOld from 'react-native-vector-icons/FontAwesome';
import { useHttp } from '../services/utility/http.hook'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Globals from '../component-library/Globals';

export const ScheduleScreen = ({route, navigation}) => {
    const [ schedule, setSchedule ] = useState([])
    const [ agent, setAgent ] = useState([])

    const { request } = useHttp()

    const getSchedule = async () => {
        const token = await AsyncStorage.getItem('Token')
        const scheduleId = route.params.scheduleId   
        try {
            const fetchedSchedule = await request(`https://staging.api.app.fleettracker.de/api/schedule_entries/${scheduleId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetchedSchedule)
            setSchedule(fetchedSchedule)

            const fetchedAgent = await request(`https://staging.api.app.fleettracker.de/api/schedule_agents/${fetchedSchedule.scheduleagentid}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetchedAgent)
            setAgent(fetchedAgent)

            // setLoadingScreen(false)
        } catch(e) {}
    }

    useEffect(() => {
        getSchedule()
        // console.log(agent)
    }, [getSchedule])

    return(
    <View style={styles.settings}>
            <View style={styles.listItem}>
                <View style={styles.listIcon}>
                    <IconOld name="user" style={styles.scheduleIcon} />
                </View>
                <Text style={styles.mediumText}>Mallorca</Text>
            </View>
            {/* <Text>{route.params.scheduleId}</Text> */}
            <View style={styles.listItem}>
                <View style={styles.listIcon}>
                    <Icon name="home" style={styles.scheduleIcon} />
                </View>
                <Text style={styles.mediumText}>Mallorca</Text>
            </View>

            <View style={styles.listItem}>
                <View style={styles.listIcon}>
                    <Icon name="phone" style={styles.scheduleIcon} />
                </View>
                <Text style={styles.mediumText}>Mallorca</Text>
            </View>

            <View style={styles.listItem}>
                <View style={styles.listIcon}>
                    <Icon name="fax" style={styles.scheduleIcon} />
                </View>
                <Text style={styles.mediumText}>Mallorca</Text>
            </View>

            <View style={styles.listItem}>
                <View style={styles.listIcon}>
                    <Icon name="mobile-alt" style={styles.scheduleIcon} />
                </View>
                <Text style={styles.mediumText}>Mallorca</Text>
            </View>

            <View style={styles.listItem}>
                <View style={styles.listIcon}>
                    <IconOld name="envelope" style={styles.scheduleIcon} />
                </View>
                <Text style={styles.mediumText}>Mallorca</Text>
            </View>
    </View>
    )
}

const styles = StyleSheet.create({
    settings: {
        // alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        // paddingTop: 200,
        // padding: 20
        paddingLeft: 40
      },
      scheduleIcon: {
          fontSize: 30,
          color: '#4A83B7',
          marginRight: 20
      },
      mediumText: {
        fontSize: Globals.font.size.medium
      },
      listIcon: {
            minWidth: 50
      },
      listItem: {
          flexDirection: 'row',
          alignItems: 'center',
      }
  });
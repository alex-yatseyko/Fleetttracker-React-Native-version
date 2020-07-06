import React, { useState, useEffect, useContext } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    Platform, 
    AsyncStorage
} from 'react-native';

import Globals from '../component-library/Globals';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { ShipScreen } from './ShipScreen'
import { ScheduleScreen } from './ScheduleScreen'

import { AppContext } from '../context/AppContext'

export const ListScreen = ({navigation}) => {
    const [ search, setSearch ] = useState([])
    const [ filteredList, setFilteredList ] = useState([])
    // const [ list, setList ] = useState([])

    const context = useContext(AppContext)

const list = [
    {
        name: 'MV TURTOISE 1',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 2',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 3',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 4',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 5',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 6',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 7',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 8',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
    {
        name: 'MV TURTOISE 9',
        capt: 'Capt A.Kirk',
        futureEntries: {
            0: {
                date: '12.08',
                name: 'DE HAM'
            },
            1: {
                date: '20.08',
                name: 'GB LGB'
            },
            2: {
                date: '27.08',
                name: 'MA MOH'
            },
        }
    },
]


    const onFilterList = (e) => {

    }

    const getListData = async () => {
        try {
            console.log('ShipsOnList', context.ships)
        } catch(e) {
            console.log('List Error')
        }
    }

    useEffect(() => {
        getListData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput 
                    style={styles.headerInput}
                    placeholder="Search Vessel or Ship Group..." 
                />
            </View>
            <ScrollView style={styles.scrollSpace}>
                {
                    list.map(schedule => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => {navigation.navigate('Ship')}}
                                key={schedule.name}
                            >
                            <View style={styles.listItem} key={schedule.name}>
                                <View style={styles.scheduleName}>
                                    <Text>{schedule.name}</Text>
                                    <Text>{schedule.capt}</Text>
                                </View>
                                <View style={styles.scheduleFuture}>
                                    <View style={styles.scheduleFutureItem}>
                                        <Text style={styles.centerText}>{schedule.futureEntries[0].date}</Text>
                                        <View style={styles.circle} />
                                        <Text style={styles.centerText}>{schedule.futureEntries[0].name}</Text>
                                    </View>
                                    <View style={styles.scheduleFutureItem}>
                                        <Text style={styles.centerText}>{schedule.futureEntries[1].date}</Text>
                                        <View style={styles.circle} />
                                        <Text style={styles.centerText}>{schedule.futureEntries[1].name}</Text>
                                    </View>
                                    <View style={styles.scheduleFutureItem}>
                                        <Text style={styles.centerText}>{schedule.futureEntries[2].date}</Text>
                                        <View style={styles.circle} />
                                        <Text style={styles.centerText}>{schedule.futureEntries[2].name}</Text>
                                    </View>
                                    <View style={styles.line} />
                                </View>
                            </View> 
                            </TouchableWithoutFeedback> 
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 100,
        backgroundColor: '#fff'
    },
    scrollSpace: {
        marginTop: 95,
        height: '100%'
    },
    header: {
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      },
      headerInput: {
        padding: 10,
        borderColor: 'transparent',
        borderRadius: 8,
        margin: 'auto',
        width: '85%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    listItem: {  
        borderBottomColor: "#9A9A9A",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    scheduleName: {
        justifyContent: 'center'
    },
    scheduleFuture: {
        flexDirection: 'row'
    },
    scheduleFutureItem: {
        width: 70
    },
    circle: {
        backgroundColor: '#4A83B7',
        width: 9,
        height: 9,
        borderRadius: 25,
        marginHorizontal: 30
    },
    line: {
        backgroundColor: '#4A83B7',
        width: 200,
        height: 1,
        position: 'absolute',
        // top: 23,
        top: Platform.OS === Globals.platform.os.ios ? 21 : 23,

    },
    centerText:{
        textAlign: 'center'
    }
})

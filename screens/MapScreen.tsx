import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    SectionList,
    RefreshControl,
    ActivityIndicator,
    Button,
    Settings,
    Dimensions
} from 'react-native';
// import {
//     INFINITE_ANIMATION_ITERATIONS,
//     LatLng,
//     WebViewLeaflet,
//     WebViewLeafletEvents,
//     WebviewLeafletMessage,
//     AnimationType,
//     MapShapeType
//   } from "react-native-webview-leaflet";
import {
    INFINITE_ANIMATION_ITERATIONS,
    LatLng,
    WebViewLeaflet,
    WebViewLeafletEvents,
    WebviewLeafletMessage,
    AnimationType,
    MapShapeType
  } from "../services/utility/react-native-webview-leaflet/index";

  import Svg, {
    Use,
    Image,
  } from 'react-native-svg';
  import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
  import Icon from 'react-native-vector-icons/FontAwesome';


  import { ShipScreen } from './ShipScreen'
  import { SettingsScreen } from './SettingsScreen'
  import { ScheduleScreen } from './ScheduleScreen'

  import NavigationService from '../services/utility/NavigationService';
  import { NavigationStackProp } from 'react-navigation-stack';

  import { createStackNavigator } from '@react-navigation/stack';

  import Globals from '../component-library/Globals';

  interface Props {
    navigation: NavigationStackProp;
  }

  type LatLngObject = { lat: number; lng: number };
  
  // Basic Logic: get IDs from api/ships and context (don't forget about second page)
  // Get the positions from api/ships/{id}/latest_postition

  const Stack = createStackNavigator();


  const icon = `<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="40" height="40"><defs><path d="M320.8 7.2L501.6 640L140 640L320.8 7.2Z" id="b1OuTbAhqc"></path></defs><g><g><g><use xlink:href="#b1OuTbAhqc" opacity="1" fill="#fefe02" fill-opacity="1"></use><g><use xlink:href="#b1OuTbAhqc" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="14" stroke-opacity="1"></use></g></g></g></g></svg>`

  const scale = .6;

  // const test = () => {
  //   alert(scale)
  // }

  const locations: { icon: string; position: LatLng; name: string }[] = [
    {
      icon: `<div style="margin-top: -20px;">
      <img style='transform: scale(${scale}) rotate(145deg)' src="http://yatseyko.com/wp-content/uploads/2020/04/method-draw-image-2.svg" />
      <div style="text-align: center; margin-top: -24px; background: rgb(255, 255, 255, 0.6)">Lviv</div>
      </div>`,
      position: { lat: 49.841140, lng: 24.026591 },
      name: "Lviv",
    },
    {
      // icon: `<div style="margin-top: -20px;"  onClick="${navigation.navigate('Auth')}>
      icon: `<div style="margin-top: -20px;"  >
      <img style='transform: scale(${scale}) rotate(75deg)' src="http://yatseyko.com/wp-content/uploads/2020/04/method-draw-image-2.svg" />
      <div style="text-align: center; margin-top: -24px; background: rgb(255, 255, 255, 0.6)">Kyiv</div>
      </div>
      `,
      position: { lat: 50.467313, lng: 30.520483 },
      name: "Kyiv",
    }

  ];
  // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //   showZoom = false;
  //  }
const getDuration = (): number => Math.floor(Math.random() * 3) + 1;
const getDelay = (): number => Math.floor(Math.random()) * 0.5;
const iterationCount = "infinite";

export const MapScreen = ({navigation}) => {
  return(
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen 
          name="Map" 
          component={Map} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen 
          name="Ship" 
          component={ShipScreen}
          options={{ 
            title: 'Ship Title',
            headerBackTitleStyle: { 
              color: 'white' 
            },
            headerRight: () => (
                <TouchableWithoutFeedback
                onPress={() => alert('Focus ship on the map')}
                >
                  <Icon name="crosshairs" style={styles.headerIcon} />
                </TouchableWithoutFeedback>
            ), 
          }}
        />
        <Stack.Screen 
          name="Schedule" 
          component={ScheduleScreen}
          options={{ 
            title: 'Schedule Location',
            headerBackTitle: '|',
            headerBackTitleStyle: { 
              color: 'white' 
            },
            headerRight: () => (
              <TouchableWithoutFeedback
               onPress={() => alert('Focus ship on the map')}
              >
                <Icon 
                  name="reply"  
                  style={[styles.headerIcon, {
                    transform: [{ scaleX: -1 }],
                    marginRight: 15
                  }]}
                />
              </TouchableWithoutFeedback>
            ), 
          }}
        />
      </Stack.Navigator>
  )
}

  // export const MapScreen = ({navigation}) => {
  const Map = ({navigation}) => {
    const [mapCenterPosition, setMapCenterPosition] = useState({
        lat: 40.153238,
        lng: 12.986282
      });
      const [ search, setSearch ] = useState([])
      const [ownPosition, setOwnPosition] = useState(null);
    const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);

    const onMessageReceived = (message: WebviewLeafletMessage) => {
        switch (message.event) {
          case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
            // Alert.alert(
              // `Map Marker Touched, ID: ${message.payload.mapMarkerID || "unknown"}`
              navigation.navigate('Ship')
            // );
    
        //     break;
        //   case WebViewLeafletEvents.ON_MAP_TOUCHED:
        //     const position: LatLngObject = message.payload
        //       .touchLatLng as LatLngObject;
        //     Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
        //     break;
          default:
            console.log("App received", message);
        }
      };

      const onFilterList = () => {
        console.log('List is Filtered')
      }

      const hereCredentials = {
        appId: 'T94boxXXrApFtc58WmGz',
        apiKey: 'aJYTveJijLx5bMV5Qt4-pXKHvbH9CblzqBiq3dRZRDA'
      }
      const themes = [
        'normal.day',
        'reduced.night'
      ]
      const hereTileUrl = `https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${themes[0]}/{z}/{x}/{y}/256/png8?apiKey=${ hereCredentials.apiKey }&app_id=${ hereCredentials.appId }`

      return (
          <View style={{ height: '100%' }}>
              <View style={styles.refresh}>
                <Icon name='refresh' style={styles.refreshIcon} />
              </View>
              {/* <View style={{height: 37, backgroundColor: '#fff', width: '100%', top: 0, zIndex: 9999,}}/> */}
              <View style={styles.header}>
                  <TextInput 
                    style={styles.headerInput}
                    textContentType="name"
                    placeholder="Search Vessel or Ship Group..." 
                    onChange={ onFilterList }
                    // value={ search }
                  />
                  <TouchableWithoutFeedback
                    onPress={() => {navigation.navigate('List')}}
                    // onPress={() => navigation.navigate('ListScreen')}
                  >
                    <View style={styles.headerButtonWrapper}>
                      <Icon name='bars' style={styles.headerButton} />
                    </View>
                  </TouchableWithoutFeedback>
              </View>
           
              {/* { */}
            <WebViewLeaflet
              // ref={(ref: WebViewLeaflet) => {
              //   setWebViewLeafletRef(ref);
              // }}
              // zoomControl={false}
              // backgroundColor={"blue"}

              onMessageReceived={onMessageReceived}
              mapLayers={[
                {
                  baseLayerName: "Mapbox",
                  url: hereTileUrl,
                  // attribution:
                  //   // "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  //   "Flettrracker"
                  },
              ]}
              mapMarkers={[
                  ...locations.map(location => {
                    return {
                      id: location.name.replace(" ", "-"),
                      position: location.position,
                      icon: location.icon,
                    };
                  }),
                ]}
              mapCenterPosition={mapCenterPosition}
              zoom={4}
            />  
        </View>
      )
  }
  
  const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      zIndex: 9999999,
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
      width: '75%',
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
    headerButtonWrapper: {
      marginLeft: 15,
      borderRadius: 8,
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
    headerButton: {
      color: '#A1A1A1',
      fontSize: 22,
      paddingVertical: 7,
      paddingHorizontal: 10,
    },
    refresh: {
      position: 'absolute',
      zIndex: 999,
      color: 'white', 
      backgroundColor: Globals.color.main,
      bottom: 28,
      right: 8,
      paddingHorizontal: 20,
      paddingVertical: 18,
      borderRadius: 60
    },
    refreshIcon: {
      color: 'white',
      fontSize: 25,
    },
    headerIcon: {
      width: 35, 
      fontSize: 23, 
      color: '#4A83B7',
    }
  });
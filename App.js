/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation'
import AppHome from './Screens/AppHome';

export async function request_location_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location Permission Granted.");
    }
    else {
      console.log("Location Permission Not Granted");
    }
  } catch (err) {
    console.warn(err)
  }
}


class App extends Component {

  async componentDidMount() {
    await request_location_runtime_permission()
    //Geolocation.getCurrentPosition(info => console.log(info));
  }
  render() {
    return (
      <AppHome/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20
  },
});

export default App;

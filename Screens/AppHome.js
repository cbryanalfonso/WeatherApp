import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "./Weather/Home";
import { StatusBar } from "react-native";
import WeatherApp from "./Weather/WeatherApp";
import Busqueda from "./Busqueda/Busqueda";

const Stack = createNativeStackNavigator()

export default function AppHome (){
    return(
        <NavigationContainer>
            <StatusBar  backgroundColor='#2c3e50'
                barStyle='light-content'/>
            <Stack.Navigator>
                <Stack.Screen name="WeatherApp" component={WeatherApp} options={{headerShown: false}}/>
                <Stack.Screen name="Busqueda" component={Busqueda} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
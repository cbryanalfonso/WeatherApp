import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "./Weather/Home";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator()

export default function AppHome (){
    return(
        <NavigationContainer>
            <StatusBar  backgroundColor='#2c3e50'
                barStyle='light-content'/>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
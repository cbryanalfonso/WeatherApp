import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';

export default function TargetHightlights({item}) {
    const [todayWeather, setTodayWeather] = useState([])
    useEffect(()=>{
        //console.log(item[0]);
        setTodayWeather(item[0])   
    })
    return (
        <View>
            <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Wind Status</Text>
                <Text>{todayWeather.wind_direction}</Text>
                <Text>{todayWeather.wind_direction_compass}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Humildity</Text>
                
                <Text>WSW</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Wind Status</Text>
                <Text>7 mph</Text>
                <Text>WSW</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Wind Status</Text>
                <Text>7 mph</Text>
                <Text>WSW</Text>
            </View>
        </View>
    );
}
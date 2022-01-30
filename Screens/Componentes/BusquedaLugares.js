import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';


export default function BusquedaLugares({ item }) {
    useEffect(() => {
        console.log(item);
    })
    return (
        <View style={{ height: "12%", margin: 20 }}>
            <TouchableOpacity style={{ flex: 0.8, borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'flex-start', padding: 10, paddingLeft: 30 }}>
                <Text style={{ fontSize: 15 }}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );
}
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image, SafeAreaView, ActivityIndicator } from 'react-native';


export default function Target({ item }) {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(false);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        startLoading();
    })
    return (
        <View style={{ flex: 1, backgroundColor: '#34495e' }}>
            
            <TouchableOpacity style={{ backgroundColor: '#2c3e50', padding: 20, margin: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <Text>{item.applicable_date}</Text>
                    {loading ? (
                        <SafeAreaView
                            style={{
                                width: 100,
                                height: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20,
                                marginTop: 10,
                            }}>
                            <ActivityIndicator color="#05A8F3" size="large" />
                        </SafeAreaView>

                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <Image source={{ uri: `https://www.metaweather.com/static/img/weather/png/${item.weather_state_abbr}.png` }} style={{
                                width: 100, height: 100,
                                marginBottom: 10, marginTop: 10
                            }}></Image>
                        </View>
                        //<Image source={icon} style={{ width: 300, height: 300, }}></Image>
                    )}
                    <View style={{ flexDirection: "row", marginTop: 20, }}>
                        <Text style={{ color: '#ecf0f1', marginRight: 40 }}>{(item.max_temp).toFixed(1)} °C</Text>
                        <Text style={{ color: '#bdc3c7' }}>{(item.min_temp).toFixed(1)} °C</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    Boton: {
        flex: 1,
        margin: 7,
        marginLeft: 15,
        borderRadius: 20,
        flexDirection: 'row',
        height: 100
    }
})

/*
 <Image style={{ width: 100, height: 100 }}
                        source={imagenPokemon ? { uri: imagenPokemon }
                            :
                            <ActivityIndicator color="#05A8F3" size="large" />

                        } />

*/
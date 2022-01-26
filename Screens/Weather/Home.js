import React, { useState, useEffect } from "react";
import { Alert, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import Geolocation from '@react-native-community/geolocation'

export default function Home({ navigation }) {
    const [imagenClima, setImagenClima] = useState('../utils/Snow.png')
    const [URL, setURL] = useState()
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [places, setPlaces] = useState([])
    const [ciudad, setCiudad] = useState('Mexico City')
    const [filtrosCategorias, setFiltrosCategorias] = useState(false)
    const [woeid, setWoeid] = useState('')
    const [tiempo, setTiempo] = useState([])
    const [tiempoCiudad, setTiempoCiudad] = useState('')
    const [fechaCiudad, setFechaCiudad] = useState('')
    const [temperatura, setTemperatura] = useState(19.1)
    ///search/?lattlong=19.7233516,-99.8134809

    //useEffect(() => {
    //  fetch(URL)
    //    .then((value) => value.json())
    //  .then((value) => {
    //console.log(value);
    //});
    //}, [URL]);

    useEffect(() => {
        fetch(`https://www.metaweather.com/api/location/116545`)
            .then((value) => value.json())
            .then((value) => {
                console.log(value);
                setTiempo(value)
                setTiempoCiudad(value.consolidated_weather[0].weather_state_name)
                setFechaCiudad(value.consolidated_weather[0].applicable_date)
                setTemperatura(value.consolidated_weather[0].the_temp)

                let imagenNueva = value.consolidated_weather[0].weather_state_name
                imagenNueva = imagenNueva.replace(/ /g, "")
                //var imsadfa = '../utils/'
                // direccionImagen = '../utils/'
                //imsadfa += imagenNueva + '.png'
                //const imagenesPerronas = imsadfa
                //setImagenClima(imsadfa)
                //console.log(imagenClima)
                //setImagenClima(value.consolidated_weather[0].weather_state_name)
                // Lo que se puede hacer es hacer uso de un split para poder quitar los espacios en lo tiempoCiudad. :D
                // De esta manera cambiará los iconos conforme cambie de ciudad o de dia :D
            });
    }, [])

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setLatitude(info.coords.latitude)
            setLongitude(info.coords.longitude)
        })
        fetch(`https://www.metaweather.com/api/location/116545`)
            .then((value) => value.json())
            .then((value) => {
                setTiempo(value)
            });

    }, [tiempo])

    function locationWeather() {
        //setURL('https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}')
        // console.log('dentro');
        fetch(`https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`)
            .then((value) => value.json())
            .then((value) => {
                //console.log(value);
                setPlaces(value)
            });
        setFiltrosCategorias(true)
    }
    function placeWeather() {
        return places.map(function (news, i) {
            return (
                <View key={i} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{
                        borderRadius: 20, backgroundColor: '#95a5a6', flex: 1, width: "70%"
                        , justifyContent: "center", alignItems: "center", height: 300, marginVertical: 2
                    }}
                        onPress={() => {
                            setWoeid(news.woeid)
                            fetch(`https://www.metaweather.com/api/location/${news.woeid}`)
                                .then((value) => value.json())
                                .then((value) => {
                                    console.log(value);
                                    setTiempo(value)
                                    setTiempoCiudad(value.consolidated_weather[0].weather_state_name)
                                    setFechaCiudad(value.consolidated_weather[0].applicable_date)
                                    setTemperatura(value.consolidated_weather[0].the_temp)
                                    let imagenNueva = value.consolidated_weather[0].weather_state_name
                                    imagenNueva = imagenNueva.split(/\s/)
                                    //setImagenClima(imagenNueva)
                                    // Lo que se puede hacer es hacer uso de un split para poder quitar los espacios en lo tiempoCiudad. :D
                                    // De esta manera cambiará los iconos conforme cambie de ciudad o de dia :D
                                });
                            setFiltrosCategorias(false)
                            setCiudad(news.title)
                            const lista = ["Snow", "Sleet", "Hail"]

                            /*
(['Snow'],['Sleet'],['Hail'],['Thunderstorm'],['Heavy Rain'],['Light Rain'],['Showers'],['Heavy Cloud']
                            ,['Light Cloud'],['Clear']
                            )
                            */

                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{news.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }
    function daysWeather() {
        /* return tiempo.map(function (news, i) {
             return (
                 <View key={i} style={{ flex: 1, }}>
                     <TouchableOpacity style={{ backgroundColor: '#2c3e50', padding: 20, margin: 20 }}>
                         <View style={{ alignItems: "center" }}>
                             <Text>{news.consolidated_weather[i].applicable_date}</Text>
                             <Image source={require('../utils/Shower.png')} style={{ width: 100, height: 100, opacity: 1, marginTop: 10 }} />
                             <View style={{ flexDirection: "row", marginTop: 20, }}>
                                 <Text style={{ color: 'white', marginRight: 40 }}> 16°C</Text>
                                 <Text style={{ color: 'white', opacity: 0.5 }}> 11°C</Text>
 
                             </View>
                         </View>
                     </TouchableOpacity>
                 </View>
             )
         })*/
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#2c3e50" }}>

            <View style={{ flex: 0.1, flexDirection: "row" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{
                        borderRadius: 20, backgroundColor: '#95a5a6', flex: 0.5, width: "70%"
                        , justifyContent: "center", alignItems: "center"
                    }}>
                        <Text>Search for places</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{
                        borderRadius: 50 / 2, backgroundColor: '#95a5a6', flex: 0.5, width: "30%",
                        justifyContent: "center", alignItems: "center"
                    }}
                        onPress={() => locationWeather()}
                    >
                        <Icon
                            type="material-community"
                            name="crosshairs-gps"
                            size={30}
                            color='white'
                        />
                    </TouchableOpacity>

                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filtrosCategorias}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <SafeAreaView style={{ justifyContent: 'center', alignSelf: 'center', flex: 0.6, marginTop: 100, width: '50%' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', margin: 15, marginBottom: 40, marginLeft: -10 }}>

                        <TouchableOpacity style={styles.btnIcono}
                            onPress={() => setFiltrosCategorias(false)}
                        >
                            <Icon
                                type="material-community"
                                name="close"
                                size={30}
                                color='black'
                            />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: "center", marginTop: 10 }}>Select your city most cercanaas</Text>
                    </View>
                    {placeWeather()}
                </SafeAreaView>
            </Modal>
            <View style={{ flex: 1, }}>
                <ScrollView style={{ flex: 1, }}>
                    <View style={{ alignItems: "center", flex: 1, paddingTop: 40, }}>


                        <Image source={require('../utils/Snow.png')} style={{ width: 250, height: 250, opacity: 1, }} />
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 100, marginTop: 30 }}>
                            {temperatura.toFixed(1)} °C
                        </Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40, marginTop: 30 }}>
                            {tiempoCiudad}
                        </Text>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginTop: 20 }}>
                            {fechaCiudad}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "flex-end", }}>
                            <Icon name="map-marker" type="material-community" color="white" ></Icon>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
                                {ciudad}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#0a3d62', marginTop: 160 }}>
                        <View style={{ flexDirection: "row", flex: 0.3 }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={{ backgroundColor: '#2c3e50', padding: 20, margin: 20 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text>Tomorrow</Text>
                                        <Image source={require('../utils/Showers.png')} style={{ width: 100, height: 100, opacity: 1, marginTop: 10 }} />
                                        <View style={{ flexDirection: "row", marginTop: 20, }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={{ backgroundColor: '#2c3e50', padding: 20, margin: 20 }}>
                                    <View style={{ alignItems: "center" }}>

                                        <Image source={require('../utils/Showers.png')} style={{ width: 100, height: 100, opacity: 1, marginTop: 10 }} />
                                        <View style={{ flexDirection: "row", marginTop: 20, }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", flex: 0.3 }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={{ backgroundColor: '#2c3e50', padding: 20, margin: 20 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Image source={require('../utils/Showers.png')} style={{ width: 100, height: 100, opacity: 1, marginTop: 10 }} />
                                        <View style={{ flexDirection: "row", marginTop: 20, }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={{ backgroundColor: '#2c3e50', padding: 20, margin: 20 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Image source={require('../utils/Showers.png')} style={{ width: 100, height: 100, opacity: 1, marginTop: 10 }} />
                                        <View style={{ flexDirection: "row", marginTop: 20, }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", flex: 0.3 }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={{ backgroundColor: '#2c3e50', padding: 20, margin: 20 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Image source={require('../utils/Showers.png')} style={{ width: 100, height: 100, opacity: 1, marginTop: 10 }} />
                                        <View style={{ flexDirection: "row", marginTop: 20, }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, }}>

                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
    },
    imagenn: {
        justifyContent: "center",
        // opacity: 0.15

    },
    btnIcono: {
        borderRadius: 50 / 2,
        backgroundColor: "#ecf0f1",
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
});

/*
 <Text style={{ color: 'white', marginRight: 40 }}>{(tiempo?.consolidated_weather[1]?.max_temp).toFixed(1)}</Text>
                                            <Text style={{ color: 'white', opacity: 0.5 }}>{tiempo?.consolidated_weather[1]?.min_temp.toFixed(1)}</Text>


*/
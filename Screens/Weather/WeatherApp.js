import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Image, ImageBackground, Modal, ProgressBarAndroidComponent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import Target from '../Componentes/Target';
import TargetHightlights from '../Componentes/TargetHightlights';

export default function WeatherApp({ navigation, URLs }) {
    //const [imagenClima, setImagenClima] = useState(false)
    const [URL, setURL] = useState('https://www.metaweather.com/api/location/116545')
    const [climaActual, setClimaActual] = useState([])
    const [ciudad, setCiudad] = useState('')
    const [temperaturaActual, setTemperaturaActual] = useState('')
    const [loading, setLoading] = useState(false);
    const [climaNuevo, setClimaNuevo] = useState('')
    const [climaCiudad, setClimaCiudad] = useState([])
    const [windStatus, setWindStatus] = useState(0)
    const [windDirection, setWindDirection] = useState('')
    const [humildity, setHumildity] = useState(0)
    const [visibility, setVisibility] = useState(0)
    const [air, setAir] = useState(0)
    const [filtrosCategorias, setFiltrosCategorias] = useState(false)
    let icono = "lc"

    const renderItem = ({ item }) => (
        <Target item={item} />
    );


    const startLoading = () => {
        setLoading(true);
        // console.log("VEAMOS", loading);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        //Se consume el API
        fetch(URL)
            .then((value) => value.json())
            .then((value) => {
                //Se va dividiendo por parametros.
                console.log(value.consolidated_weather[0]);
                setWindStatus(value.consolidated_weather[0].wind_direction)
                setWindDirection(value.consolidated_weather[0].wind_direction_compass)
                setHumildity(value.consolidated_weather[0].humidity)
                setVisibility(value.consolidated_weather[0].visibility)
                setAir(value.consolidated_weather[0].air_pressure)
                setClimaCiudad(value.consolidated_weather)
                setCiudad(value.title)
                setClimaActual(value.consolidated_weather[0])
                setTemperaturaActual(value.consolidated_weather[0].the_temp.toFixed(1))
                startLoading();
                setClimaNuevo(value.consolidated_weather[0].weather_state_abbr)
            })
    }, [])






    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2c3e50" }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filtrosCategorias}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#2c3e50' }}>
                    <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 15 }}>

                        <TouchableOpacity style={styles.btnIcono}
                            onPress={() => setFiltrosCategorias(false)}
                        >
                            <Icon
                                type="material-community"
                                name="close"
                                size={30}
                                color='white'
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 0.1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.7, justifyContent: "center", width: "80%", paddingHorizontal: 20, }}>
                            <Input leftIcon={<Icon
                                type="material-community"
                                name="magnify"
                                size={15}
                                color='white'
                            />}
                                placeholder="search location"
                                inputContainerStyle={{ borderWidth: 2, borderRadius: 5, justifyContent: "center", marginTop: 20, paddingHorizontal: 20 }}
                            />
                        </View>
                        <View style={{ flex: 0.3, justifyContent: "center", width: "80%" }}>
                            <TouchableOpacity style={{ backgroundColor: '#2980b9', padding: 18, borderRadius: 5, marginRight: 10 }}>
                                <Text>Search</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </SafeAreaView>
            </Modal>
            <ScrollView style={{ flex: 1 }}>

                {// Es el estilo del Header, donde estan los botones
                }
                <View style={{ flex: 0.1, flexDirection: 'row', marginTop: 10 }}>
                    <View style={styles.header}>
                        <TouchableOpacity style={{ backgroundColor: "#7f8c8d", borderRadius: 20, padding: 15 }}
                            onPress={() => setFiltrosCategorias(true)
                                //navigation.navigate('Busqueda')
                            }
                        >
                            <Text>Search places</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <Icon
                                type="material-community"
                                name="crosshairs-gps"
                                size={30}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 0.7, alignItems: 'center' }}>
                        {
                            //Esto se realiza para poder tener una ventana de carga de imagen, con ayuda de activityIndicator
                        }
                        {loading ? (
                            <SafeAreaView
                                style={{
                                    width: 300,
                                    height: 300,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                    marginTop: 60,
                                }}>
                                <ActivityIndicator color="#05A8F3" size="large" />
                            </SafeAreaView>

                        ) : (
                            //Se trae la imagen desde la API, con la abreviatura que existe en el clima del dia de hoy
                            <>
                                <Image source={{ uri: `https://www.metaweather.com/static/img/weather/png/${climaNuevo}.png` }} style={{
                                    width: 300, height: 300,
                                    marginBottom: 40, marginTop: 40
                                }}></Image>
                            </>
                        )}
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center' }}>
                        <Text style={{ fontSize: 80, fontWeight: 'bold', color: '#ecf0f1', marginBottom: 30 }}>{temperaturaActual} °C</Text>
                        <Text style={[styles.clima, { marginBottom: 50 }]}>{(climaActual.weather_state_name)}</Text>
                        <Text style={[styles.clima, { fontSize: 25 }]}>Today   {climaActual.applicable_date}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 70 }}>
                            <Icon name="map-marker" type="material-community" color="#bdc3c7" ></Icon>
                            <Text style={[styles.clima, { fontSize: 25, marginLeft: 10 }]}>{ciudad}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 1, backgroundColor: '#34495e' }}>
                    <Text style={[styles.clima, { fontSize: 25, marginLeft: 10, alignSelf: 'center', paddingTop: 30 }]}>Weather</Text>
                    { /* Este flatlist es para cargar el clima de dias posteriores, solo que se tien que revisar, ya que genera un Warning con el ScrollView*/}
                    <FlatList
                        nestedScrollEnabled
                        data={climaCiudad}
                        numColumns={2}
                        renderItem={renderItem}
                        keyExtractor={(clima) => clima.applicable_date}
                    />
                    <Text style={[styles.clima, { fontSize: 25, marginLeft: 10, alignSelf: 'center', paddingTop: 30 }]}>Today's Hightlights</Text>
                    <View>
                        <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.titulosFinal}>Wind Status</Text>
                            <Text style={styles.datosFinal}>{(windStatus).toFixed(0)} mph</Text>
                            <Text style={{ fontSize: 20 }}>{windDirection}</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, }}>
                            <Text style={[styles.titulosFinal, { alignSelf: 'center' }]}>Humildity</Text>
                            <Text style={[styles.datosFinal, { alignSelf: 'center' }]}>{humildity} %</Text>
                            <View >{/* Lo que se crea es un componente de carga, para que se vea la humedad*/}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <Text> 0% </Text>
                                    <Text> 50%</Text>
                                    <Text>100%</Text>
                                </View>
                                <View style={{ backgroundColor: "#ecf0f1", borderRadius: 20, height: 20 }}>
                                    <View style={{ backgroundColor: '#f1c40f', borderRadius: 20, height: 20, width: `${humildity}%` }}></View>

                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.titulosFinal}>Visibility</Text>
                            <Text style={styles.datosFinal}>{(visibility).toFixed(1)} miles</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#2c3e50', margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.titulosFinal}>Wind Status</Text>
                            <Text style={styles.datosFinal}>{(air).toFixed(1)} mb</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clima: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#bdc3c7',
        marginBottom: 20
    },
    titulosFinal: { fontSize: 20 },
    datosFinal: { fontSize: 50, fontWeight: 'bold', marginBottom: 20, color: '#ecf0f1' },
})
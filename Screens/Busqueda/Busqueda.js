import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon, Input } from "react-native-elements";

export default function Busqueda({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: "#2c3e50" }}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon
                        type="material-community"
                        name="close-thick"
                        size={30}
                        color='white'
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.12, flexDirection: 'row' }}>
                <View style={{flex: 0.7, justifyContent: "center", width: "80%", paddingHorizontal: 20, }}>
                    <Input leftIcon={<Icon
                        type="material-community"
                        name="magnify"
                        size={15}
                        color='white'
                    />} 
                    placeholder="search location" 
                    inputContainerStyle={{ borderWidth: 2, borderRadius: 5, justifyContent: "center", marginTop: 20, paddingHorizontal: 20}}
                    />
                </View>
                <View style={{flex: 0.3, justifyContent: "center", width: "80%"}}>
                    <TouchableOpacity style={{backgroundColor: '#2980b9', padding: 18, borderRadius: 5, marginRight: 10}}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { flex: 0.1, justifyContent: "center", alignItems: 'flex-end', paddingRight: 10 }
})
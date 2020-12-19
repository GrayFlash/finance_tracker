import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, ImageBackground, LogBox } from 'react-native';
import * as myConstClass from './HttpLink';

export default function Crypto() {
    
    const navigation = useNavigation();

    const [top_crypto, setTop_crypto] = useState([]);
    const [crypto_change_percent, setCrypto_change_percent] = useState([]);
    const [crypto_image, setCrypto_image] = useState([]);
    const [crypto_price, setCrypto_price] = useState([]);

    const fetchCrypto_top = () => {
        fetch(`${myConstClass.HTTP_LINK}/top_crypto`)
        .then(res=>res.json())
        .then(value=>{
            setTop_crypto(value);
        })
    }

    const fetchCrypto_change_percent = () => {
        fetch(`${myConstClass.HTTP_LINK}/crypto_change_percent`)
        .then(res=>res.json())
        .then(value=>{
            setCrypto_change_percent(value);
        })
    }

    const fetchCrypto_image = () => {
        fetch(`${myConstClass.HTTP_LINK}/crypto_image`)
        .then(res=>res.json())
        .then(value=>{
            setCrypto_image(value);
        })
    }

    const fetchCrypto_price = () => {
        fetch(`${myConstClass.HTTP_LINK}/crypto_price`)
        .then(res=>res.json())
        .then(value=>{
            setCrypto_price(value);
        })
    }

    useEffect(()=>{
        fetchCrypto_top(),
        fetchCrypto_change_percent(),
        fetchCrypto_image(),
        fetchCrypto_price(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])

    return (

        <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white"}}>
                <View style={{ flexDirection: 'row', marginTop: 40 , marginBottom: 10}}>
                    <TouchableOpacity style={{ flex: 1,}} onPress={() => navigation.goBack()} >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../assets/icons/back_arrow_icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>Cryptocurrencies</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>

                
            <View style={{ flexDirection: 'row'}}>
                <View >
                        {crypto_image.map((item) => {
                            return (
                                <View>
                                    <Image style={{height: 26, width: 26, marginTop: 5}} source={{uri: item}} />
                                    
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 5}} />
                                </View>
                                );
                                
                            })}
                            
                        </View>
                    <View >
                            {top_crypto.map((item) => {
                                return (
                                    <View>
                                    <Text style={{  
                                        marginLeft: 18,
                                        marginTop: 10,
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: "black"
                                    }}>{item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 10}} />
                                    </View>
                                );
                                
                            })}
                        </View>

                        <View>
                        {crypto_price.map((item) => {
                            return (
                                <View>
                                    <Text style={{  
                                        marginLeft: 18,
                                        marginTop: 10,
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: "black"
                                    }}>{item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 5}} />
                                </View>
                                );
                                
                            })}
                            </View>
                            
                    
                        <View  style={{ flex: 1}}>
                        {crypto_change_percent.map((item) => {
                            return (
                                <View>
                                    <Text style={{  
                                        marginLeft: 18,
                                        marginTop: 10,
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: "black"
                                    }}>{item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 10}} />
                                    </View>
                                );
                                
                            })}
                            
                        </View>

                </View>
        </ScrollView>
                            
        
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 50,
        padding: 50
    }, 
    inputField: {
        backgroundColor: "white"
    }
});



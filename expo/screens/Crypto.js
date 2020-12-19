import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, ImageBackground, LogBox } from 'react-native';
import * as myConstClass from './HttpLink';

export default function Crypto() {
    
    const navigation = useNavigation();

    const [viewMode, setViewMode] = useState("all");

    const [top_crypto_gain, setTop_crypto_gain] = useState([]);
    const [crypto_change_percent_gain, setCrypto_change_percent_gain] = useState([]);
    const [crypto_image_gain, setCrypto_image_gain] = useState([]);
    const [crypto_price_gain, setCrypto_price_gain] = useState([]);

    const fetchCrypto_top_gain = () => {
        fetch(`${myConstClass.HTTP_LINK}/top_crypto_gain`)
        .then(res=>res.json())
        .then(value=>{
            setTop_crypto_gain(value);
        })
    }

    const fetchCrypto_change_percent_gain = () => {
        fetch(`${myConstClass.HTTP_LINK}/crypto_change_percent_gain`)
        .then(res=>res.json())
        .then(value=>{
            setCrypto_change_percent_gain(value);
        })
    }

    const fetchCrypto_image_gain = () => {
        fetch(`${myConstClass.HTTP_LINK}/crypto_image_gain`)
        .then(res=>res.json())
        .then(value=>{
            setCrypto_image_gain(value);
        })
    }

    const fetchCrypto_price_gain = () => {
        fetch(`${myConstClass.HTTP_LINK}/crypto_price_gain`)
        .then(res=>res.json())
        .then(value=>{
            setCrypto_price_gain(value);
        })
    }

    useEffect(()=>{
        fetchCrypto_top_gain(),
        fetchCrypto_change_percent_gain(),
        fetchCrypto_image_gain(),
        fetchCrypto_price_gain(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 18 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }


    function Gainers() {
        return (
        <View style={{ flexDirection: 'row'}}>
                <View >
                        {crypto_image_gain.map((item) => {
                            return (
                                <View>
                                    <Image style={{height: 26, width: 26, marginTop: 5}} source={{uri: item}} />
                                    
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 5}} />
                                </View>
                                );
                                
                            })}
                            
                        </View>
                    <View >
                            {top_crypto_gain.map((item) => {
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
                        {crypto_price_gain.map((item) => {
                            return (
                                <View>
                                    <Text style={{  
                                        paddingTop: 10,
                                        marginLeft: 18,
                                        marginBottom: 5,
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: "black",
                                    }}>{item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 5}} />
                                </View>
                                );
                                
                            })}
                            </View>
                            
                    
                        <View  style={{ flex: 1}}>
                        {crypto_change_percent_gain.map((item) => {
                            return (
                                <View>
                                    <Text style={{
                                        paddingTop: 5,
                                        marginRight: 0,
                                        marginTop: 5,
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
        )
    }

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
            <View style={{ flex: 1, justifyContent: 'center', padding: 12,}}>
                <View style={{ flexDirection: 'row', height: 45, backgroundColor: "white", borderRadius: 8 }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: viewMode == "all" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 6,
                        }}
                        onPress={() => setViewMode("all")}
                        
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 16,fontFamily: 'GothamMedium', lineHeight: 22, color: "black"}}>All</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get Point */}
                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: viewMode == "gain" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 8,
                        }}
                        onPress={() => setViewMode("gain")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>Top Gainers</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* My Card */}
                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: viewMode == "lose" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 8,
                        }}
                        onPress={() => setViewMode("lose")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>Top Losers</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                
                { viewMode == "gain" && Gainers()}

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



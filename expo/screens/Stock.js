import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, ImageBackground, Dimensions, LogBox} from 'react-native';
import * as myConstClass from './HttpLink';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";

export default function Stock() {
    
    const navigation = useNavigation();
    const [result_sensex, setResult_sensex] = useState({ value:"" , raise: ""});
    const [result_nifty, setResult_nifty] = useState({ value:"" , raise: ""});
    const [viewMode, setViewMode] = useState("rates");

    const [companyName_sensex, setCompanyName_sensex] = useState([]);
    const [change_sensex, setChange_sensex] = useState([]);
    const [ltp_sensex, setLtp_sensex] = useState([]);

    const [companyName_nifty, setCompanyName_nifty] = useState([]);
    const [change_nifty, setChange_nifty] = useState([]);
    const [ltp_nifty, setLtp_nifty] = useState([]);

    const fetchStock_sensex = () => {
        fetch(`${myConstClass.HTTP_LINK}/sensex`)
        .then(res=>res.json())
        .then(result_stock=>{
            setResult_sensex(result_stock);
        })
    }

    const fetchStock_nifty = () => {
        fetch(`${myConstClass.HTTP_LINK}/nifty`)
        .then(res=>res.json())
        .then(result_stock=>{
            setResult_nifty(result_stock);
        })
    }

    const fetchStock_companyNames_sensex = () => {
        fetch(`${myConstClass.HTTP_LINK}/companyName_sensex`)
        .then(res=>res.json())
        .then(companyName=>{
            setCompanyName_sensex(companyName);
        })
    }

    const fetchStock_change_sensex = () => {
        fetch(`${myConstClass.HTTP_LINK}/change_sensex`)
        .then(res=>res.json())
        .then(companyName=>{
            setChange_sensex(companyName);
        })
    }

    const fetchStock_ltp_sensex = () => {
        fetch(`${myConstClass.HTTP_LINK}/ltp_sensex`)
        .then(res=>res.json())
        .then(companyName=>{
            setLtp_sensex(companyName);
        })
    }

    const fetchStock_companyNames_nifty = () => {
        fetch(`${myConstClass.HTTP_LINK}/companyName_nifty`)
        .then(res=>res.json())
        .then(companyName=>{
            setCompanyName_nifty(companyName);
        })
    }

    const fetchStock_change_nifty = () => {
        fetch(`${myConstClass.HTTP_LINK}/change_nifty`)
        .then(res=>res.json())
        .then(companyName=>{
            setChange_nifty(companyName);
        })
    }

    const fetchStock_ltp_nifty = () => {
        fetch(`${myConstClass.HTTP_LINK}/ltp_nifty`)
        .then(res=>res.json())
        .then(companyName=>{
            setLtp_nifty(companyName);
        })
    }

    useEffect(()=>{
        fetchStock_sensex(),
        fetchStock_nifty(),
        fetchStock_companyNames_sensex(),
        fetchStock_change_sensex(),
        fetchStock_ltp_sensex(),
        fetchStock_companyNames_nifty(),
        fetchStock_change_nifty(),
        fetchStock_ltp_nifty(),
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 18 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }

    function Rates() {
        return(
            <View>
                <Text style={{  marginLeft: 16, paddingTop: 16, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>BSE SENSEX</Text>
                <Text style={{  marginLeft: 16, paddingTop: 8, fontSize: 14,fontFamily: 'GothamLight', color: "black"}}>INDEXBOM: SENSEX</Text>

                <View style={{ flexDirection: 'row'}}>
                    
                    <View style={{ flex: 1, marginLeft: 16, paddingTop: 26, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: "black"}}>Value: {result_sensex.value.toString()}</Text>
                    </View>

                    <View style={{paddingTop: 26,marginRight: 16, justifyContent: 'center' }}>
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: result_sensex.raise.toString().charAt(0) == "-" ? "red" : "green"}}>{result_sensex.raise.toString()}</Text>
                    </View>
                </View> 

                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine
                        style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                            { x: 1, y: 2 },
                            { x: 2, y: 3 },
                            { x: 3, y: 5 },
                            { x: 4, y: 4 },
                            { x: 5, y: 7 }
                        ]}
                    />
                </VictoryChart>


                <Text style={{  marginLeft: 16, paddingTop: 16, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>NIFTY 50</Text>
                <Text style={{  marginLeft: 16, paddingTop: 8, fontSize: 14,fontFamily: 'GothamLight', color: "black"}}>INDEX: NIFTY_50</Text>

                <View style={{ flexDirection: 'row'}}>
                    
                    <View style={{ flex: 1, marginLeft: 16, paddingTop: 26, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: "black"}}>Value: {result_nifty.value.toString()}</Text>
                    </View>

                    <View style={{paddingTop: 26,marginRight: 16, justifyContent: 'center' }}>
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: result_nifty.raise.toString().charAt(0) == "-" ? "red" : "green"}}>{result_nifty.raise.toString()}</Text>
                    </View>
                </View>

                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine
                    interpolation="natural"
                        style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 }
                        ]}
                        
                    />
                </VictoryChart>
            </View>
        )
    }
    

    function SenSex() {
        return(
            <View>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "transparent"}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: "#999999"}} />
            <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 5}}>

                <View style={{ flex: 1}}>
                    <Text style={{  marginLeft: 16, fontSize: 15,fontFamily: 'GothamBold', color: "black"}}>Company Name</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#999999", marginTop: 10}} />
                </View>

                <View style={{ flex: 1}}>
                    <Text style={{marginLeft: 26, fontSize: 15,fontFamily: 'GothamBold', color: "black"}}>LTP</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#999999", marginTop: 10}} />
                </View>

                <View>
                    <Text style={{ marginRight: 16,  fontSize: 15,fontFamily: 'GothamBold', color: "black"}}>Change</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#999999", marginTop: 10}} />
                </View>
                
            </View>
                <View style={{ flexDirection: 'row', marginTop: 0 , marginBottom: 5}}>

                        <View style={{ flex: 1,}}>
                            {companyName_sensex.map((item) => {
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
                        

                        <View style={{ flex: 1 }}>
                            {ltp_sensex.map(item => {
                                return (
                                    <View>
                                    <Text style={{
                                        marginLeft: 16,
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
                            {change_sensex.map(item => {
                                return (
                                    <View>
                                    <Text style={{ 
                                        marginRight: 16,
                                        marginTop: 10, 
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: item.charAt(0)=="-" ? "red" : "green"
                                    }}>{item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 10}} />
                                    </View>
                                );
                            })}
                        </View>
                </View>
            </View>

            </View>
        )
    }

    function Nifty() {
        return(
            <View style={{flexDirection: 'row'}}>
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "transparent"}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: "#999999"}} />
            <View style={{ flexDirection: 'row', marginTop: 10 , marginBottom: 5}}>

                <View style={{ flex: 1}}>
                    <Text style={{  marginLeft: 16, fontSize: 15,fontFamily: 'GothamBold', color: "black"}}>Company Name</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#999999", marginTop: 10}} />
                </View>

                <View style={{ flex: 1}}>
                    <Text style={{marginLeft: 26, fontSize: 15,fontFamily: 'GothamBold', color: "black"}}>LTP</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#999999", marginTop: 10}} />
                </View>

                <View>
                    <Text style={{ marginRight: 16,  fontSize: 15,fontFamily: 'GothamBold', color: "black"}}>Change</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#999999", marginTop: 10}} />
                </View>
                
            </View>
                <View style={{ flexDirection: 'row', marginTop: 0 , marginBottom: 5}}>

                        <View style={{ flex: 1,}}>
                            {companyName_nifty.map((item) => {
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
                        

                        <View style={{ flex: 1 }}>
                            {ltp_nifty.map(item => {
                                return (
                                    <View>
                                    <Text style={{
                                        marginLeft: 16,
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
                            {change_nifty.map(item => {
                                return (
                                    <View>
                                    <Text style={{ 
                                        marginRight: 16,
                                        marginTop: 10, 
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: item.charAt(0)=="-" ? "red" : "green"
                                    }}>{item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 10}} />
                                    </View>
                                );
                            })}
                        </View>
                </View>
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
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>Stock Values</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>

            {/* NAVBAR */}

            <View style={{ flex: 1, justifyContent: 'center', padding: 12,}}>
                <View style={{ flexDirection: 'row', height: 45, backgroundColor: "white", borderRadius: 8 }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: viewMode == "rates" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 6,
                        }}
                        onPress={() => setViewMode("rates")}
                        
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 16,fontFamily: 'GothamMedium', lineHeight: 22, color: "black"}}>Rates</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get Point */}
                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: viewMode == "sensex" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 8,
                        }}
                        onPress={() => setViewMode("sensex")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>Sensex</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* My Card */}
                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: viewMode == "nifty" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 8,
                        }}
                        onPress={() => setViewMode("nifty")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>Nifty 50</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
            { viewMode == "rates" && Rates()}

            { viewMode == "sensex" && SenSex()}

            { viewMode == "nifty" && Nifty()}

        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 50,
        padding: 50
    }, 
});



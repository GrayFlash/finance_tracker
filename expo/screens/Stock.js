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
    const [result_sensex, setResult_sensex] = useState({ value:"" , raise: "", raisepercent: ''});
    const [result_nifty, setResult_nifty] = useState({ value:"" , raise: "", raisepercent: ''});
    const [viewMode, setViewMode] = useState("rates");


    const fetchStock_sensex = () => {
        //let y = fetchExpense();
        fetch(`${myConstClass.HTTP_LINK}/sensex`)
        .then(res=>res.json())
        .then(result_stock=>{
            console.log("People data received inside Stock Page")
            setResult_sensex(result_stock);
            // console.log(result_stock);
        })
    }

    const fetchStock_nifty = () => {
        //let y = fetchExpense();
        fetch(`${myConstClass.HTTP_LINK}/nifty`)
        .then(res=>res.json())
        .then(result_stock=>{
            console.log("People data received inside Stock Page")
            setResult_nifty(result_stock);
            // console.log(result_stock);
        })
    }

    useEffect(()=>{
        fetchStock_sensex(),
        fetchStock_nifty(),
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
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: result_sensex.raise.toString().charAt(0) == "+" ? "green" : "red"}}>{result_sensex.raise.toString()} {result_sensex.raisepercent.toString()}</Text>
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
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: result_nifty.raise.toString().charAt(0) == "+" ? "green" : "red"}}>{result_nifty.raise.toString()} {result_nifty.raisepercent.toString()}</Text>
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
                <Text>
                    AAIYA PRINT KAR BC
                </Text>
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
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>SenSex</Text>
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

        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 50,
        padding: 50
    }, 
});



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
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: result_sensex.raise.toString().charAt(0) == "-" ? "red" : "green"}}>{ result_sensex.raise.toString().charAt(0)=="-" ? result_sensex.raise.toString() : "+" + result_sensex.raise.toString() }</Text>
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
                            47011.5,46917.98046875,46950.62109375,46912.48828125,46861.66015625,46845.91015625,46917.640625,46895.921875,46887.0703125,46805.0,46753.80078125,46795.8515625,46767.578125,46717.23828125,46761.2109375,46807.8515625,46777.55859375,46756.0,46742.48828125,46739.55078125,46686.69140625,46675.80078125,46660.1015625,46659.05078125,46683.26953125,46677.25,46705.921875,46712.53125,46711.640625,46731.05859375,46753.1015625,46722.16015625,46728.16015625,46742.41015625,46779.55859375,46761.80078125,46749.828125,46730.94140625,46719.0703125,46733.71875,46751.44140625,46766.73828125,46773.51953125,46744.78125,46721.359375,46762.23828125,46774.30078125,46780.12109375,46781.98828125,46813.19140625,46797.44921875,46769.859375,46763.3515625,46779.1015625,46780.87109375,46791.359375,46777.8203125,46774.6015625,46753.75,46760.7890625,46779.08984375,46777.76171875,46771.8984375,46779.359375,46779.1484375,46770.53125,46811.03125,46800.1796875,46806.9296875,46809.5,46787.51953125,46793.7109375,46785.9296875,46768.37890625,46748.7890625,46772.4609375,46754.640625,46766.4609375,46765.3984375,46757.16015625,46739.0,46724.140625,46766.28125,46777.55078125,46778.0390625,46782.921875,46770.078125,46791.91015625,46799.609375,46791.8984375,46775.62109375,46771.55078125,46770.03125,46760.01171875,46752.6484375,46760.55078125,46751.66015625,46768.44140625,46788.171875,46773.51171875,46762.23828125,46719.1796875,46709.94921875,46731.25,46738.21875,46737.8203125,46764.48046875,46751.03125,46762.87109375,46766.87109375,46748.05078125,46750.98828125,46757.48046875,46767.66015625,46746.6484375,46741.671875,46748.37890625,46750.30859375,46760.26953125,46766.1796875,46762.94921875,46758.83984375,46756.87890625,46755.578125,46763.44921875,46763.23046875,46811.3515625,46825.6015625,46856.578125,46852.46875,46845.01953125,46854.7109375,46861.44140625,46817.9296875,46822.44140625,46832.109375,46808.51171875,46843.9609375,46836.58984375,46841.46875,46862.03125,46889.5390625,46879.48828125,46866.94140625,46881.66015625,46854.1484375,46866.71875,46901.640625,46906.30078125,46912.62890625,46924.359375,46927.671875,46917.6796875,46910.44921875,46889.62890625,46908.1796875,46910.5703125,46909.96875,46891.9296875,46842.16015625,46889.0390625,46932.25,46931.37109375,46959.6015625,46945.2890625,46953.328125,46935.76953125,46936.03125,46946.16015625,46956.109375,46933.578125,46935.25,46914.3203125,46937.671875,46960.19140625,46947.23046875,46947.33984375,46924.1796875,46937.078125,46951.5390625,46973.01953125,46982.19921875,46983.4609375,46963.3984375,46950.5390625,46952.578125,46930.890625,46911.8203125
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
                        <Text style={{fontFamily: 'GothamMedium', fontSize: 16, color: result_nifty.raise.toString().charAt(0) == "-" ? "red" : "green"}}>{ result_nifty.raise.toString().charAt(0)=="-" ? result_nifty.raise.toString() : "+" + result_nifty.raise.toString()}</Text>
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
                        13764.400390625,13747.650390625,13756.0,13746.0,13728.650390625,13726.25,13742.4501953125,13737.599609375,13735.349609375,13711.25,13696.2998046875,13706.75,13698.7998046875,13686.7998046875,13697.0,13711.2001953125,13703.849609375,13693.099609375,13691.099609375,13690.400390625,13675.150390625,13672.5498046875,13670.75,13666.900390625,13674.349609375,13670.650390625,13680.2998046875,13683.7998046875,13685.25,13690.4501953125,13695.0498046875,13686.9501953125,13689.7001953125,13693.849609375,13704.7998046875,13698.9501953125,13696.0498046875,13690.5498046875,13687.9501953125,13692.0,13697.7001953125,13700.75,13703.7001953125,13698.349609375,13691.650390625,13705.150390625,13707.7001953125,13708.4501953125,13708.150390625,13716.650390625,13712.5498046875,13702.9501953125,13702.400390625,13707.599609375,13705.7998046875,13709.9501953125,13706.7001953125,13703.7998046875,13698.2998046875,13702.349609375,13708.2998046875,13707.4501953125,13704.2998046875,13705.849609375,13705.5498046875,13703.75,13714.349609375,13713.0498046875,13714.650390625,13715.0498046875,13709.25,13710.2998046875,13709.2001953125,13704.2998046875,13697.7998046875,13704.5498046875,13700.0498046875,13703.5,13702.349609375,13701.2001953125,13696.7001953125,13691.599609375,13702.25,13706.849609375,13706.5,13707.349609375,13705.400390625,13711.5,13711.7001953125,13709.4501953125,13704.75,13705.2998046875,13703.9501953125,13699.9501953125,13701.2001953125,13702.4501953125,13700.400390625,13705.4501953125,13711.0498046875,13707.7001953125,13704.0,13691.5498046875,13687.849609375,13694.849609375,13695.4501953125,13695.7998046875,13704.849609375,13701.349609375,13704.0498046875,13706.650390625,13701.2001953125,13701.099609375,13704.7998046875,13705.849609375,13699.7001953125,13697.900390625,13698.25,13702.150390625,13703.2998046875,13703.25,13704.2998046875,13700.25,13700.900390625,13700.900390625,13703.150390625,13702.7998046875,13718.0498046875,13720.400390625,13729.599609375,13728.349609375,13726.349609375,13728.7001953125,13729.400390625,13718.349609375,13719.0,13721.5,13715.7001953125,13726.75,13722.849609375,13726.599609375,13732.7001953125,13739.400390625,13738.2998046875,13734.2998046875,13737.7998046875,13731.400390625,13733.7998046875,13743.650390625,13745.849609375,13746.2998046875,13751.4501953125,13750.75,13749.5,13745.25,13739.650390625,13746.150390625,13747.650390625,13746.5,13739.650390625,13728.75,13742.0498046875,13751.0,13752.9501953125,13760.599609375,13754.25,13757.4501953125,13752.900390625,13755.4501953125,13756.9501953125,13758.099609375,13752.7998046875,13750.5498046875,13746.0,13753.5,13761.400390625,13758.900390625,13757.849609375,13751.650390625,13756.2001953125,13759.849609375,13761.75,13765.400390625,13766.849609375,13760.349609375,13757.900390625,13758.900390625,13753.900390625,13742.349609375
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
                                <View key={companyName_sensex[item]} >
                                    <Text style={{  
                                        marginLeft: 18,
                                        marginTop: 10,
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: "black"
                                    }}>{((companyName_sensex.indexOf(item)+1).toString() +".") + item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 10}} />
                                    </View>
                                );

                            })}
                            
                            
                        </View>
                        

                        <View style={{ flex: 1 }}>
                            {ltp_sensex.map(item => {
                                return (
                                <View key={ltp_sensex[item]} >
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
                                <View key={change_sensex[item]} >
                                    <Text style={{ 
                                        marginRight: 18,
                                        marginTop: 10, 
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: item.charAt(0)=="-" ? "red" : "green"
                                    }}>{item.charAt(0)=="-" ? item : "+" + item}</Text>
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
                                    <View key={companyName_nifty[item]} >
                                    <Text style={{  
                                        marginLeft: 18,
                                        marginTop: 10,
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: "black"
                                    }}>{((companyName_nifty.indexOf(item)+1).toString() +".") + item}</Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BEC1D2", marginTop: 10}} />
                                    </View>
                                );

                            })}
                            
                            
                        </View>
                        

                        <View style={{ flex: 1 }}>
                            {ltp_nifty.map(item => {
                                return (
                                    <View key={ltp_nifty[item]}>
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
                                    <View key={change_nifty[item]}>
                                    <Text style={{ 
                                        marginRight: 18,
                                        marginTop: 10, 
                                        fontSize: 14,
                                        fontFamily: 'GothamMedium', 
                                        color: item.charAt(0)=="-" ? "red" : "green"
                                    }}>{item.charAt(0)=="-" ? item : "+" + item}</Text>
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



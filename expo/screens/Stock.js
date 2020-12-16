import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, ImageBackground, Dimensions} from 'react-native';
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

            <Text style={{  margin: 10, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>VictoryLine Charts</Text>

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

        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 50,
        padding: 50
    }, 
});



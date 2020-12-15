import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React,{useState, useEffect} from "react";
import { VictoryPie} from "victory-native";
import { person } from "../data/dummyPerson";
import * as myConstClass from '../screens/HttpLink';
const {width, height} = Dimensions.get('window');

export default function ChartPage() {
    const screenWidth = width;
    const screenHeight = height;
    const [categoriesData, setCategoriesData] = useState([])
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState(null);

    // UPDATE links
    const fetchData = () => {
        fetch(`${myConstClass.HTTP_LINK}/personDetails`)
        .then(res=>res.json())
        .then(results=>{
            console.log("People")
            setPeople(results[0])
        })
    }
    const fetchCategory = () => {
        let x = fetchData();
        fetch(`${myConstClass.HTTP_LINK}/fetchCategoryData`)
        .then(res=>res.json())
        .then(results=>{
            console.log("Yes")
            console.log(results)
            setCategoriesData(results)
            setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchCategory(),
        fetchData()
    },[])

    function getSampleData() {
        let requiredData = [];
        let mul = 100/people.totalExpenses;
        //console.log(categoriesData)
        for(let i=0 ; i<categoriesData.length ; i++) {
            const obj = categoriesData[i];
            let percentage = Math.round(obj.totalExpenseInThis*mul *10)/10;
            requiredData = [...requiredData, { x:`${percentage}`, y:percentage, z:categoriesData[i].name} ];
        }
        //console.log(requiredData);
        return requiredData;
    }

    function getColorScaleData() {
        let colorScaleData = [];
        for(let i=0 ; i<categoriesData.length ; i++) {
            const obj = categoriesData[i];
            colorScaleData = [...colorScaleData, obj.color];
        }
        //console.log(colorScaleData);
        return colorScaleData;
    }

    return (
        <View style={{marginBottom: 30}}>
            <FlatList
                data = {categoriesData}
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchCategory()}
                refreshing={loading}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <VictoryPie
                    colorScale={getColorScaleData()}
                    radius={({ datum }) => (viewMode == datum.z) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                    innerRadius={screenWidth*0.17}
                    labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                    data={getSampleData()}
                    style={{
                        labels: { fill: "white",fontFamily: 'GothamBlack', fontSize: 16, lineHeight: 22 },
                    }}
                    width={screenWidth}
                    height={screenWidth}
                />
                <View style={{ position: 'absolute', top: '43%', left: "40%"}}>
                    <Text style={{ textAlign: 'center', fontFamily: 'GothamMedium', fontSize: 18, lineHeight: 32, color: "gray" }}>Expenses</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'GothamLight', fontSize: 13, lineHeight: 22 }}>This Month</Text>
                </View>
            </View>
            

            
            {categoriesData.map((obj) => {
                return(
                    <TouchableOpacity
                        key={obj._id}
                        style={{
                            flexDirection: 'row',
                            height: 40,
                            marginTop: 5,
                            paddingHorizontal: 12,
                            marginHorizontal: 18,
                            borderRadius: 10,
                            backgroundColor: (viewMode == `${obj.name}`) ? "#BEC1D2" : "white",
                        }}
                        onPress={() => setViewMode(`${obj.name}`)}
                    >
                        {/* Name/Category */}
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: obj.color,
                                    borderRadius: 5
                                }}
                            />
                            <Text style={{ marginLeft: 8, fontFamily: 'GothamMedium',color: (viewMode == `${obj.name}`) ? "white" : "#194868"}}>{obj.name}</Text>
                        </View>

                        {/* Expenses */}
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{fontFamily: 'GothamLight', color: (viewMode == `${obj.name}`) ? "white" : "#194868" }}>{obj.totalExpenseInThis} Rs - {Math.round((obj.totalExpenseInThis*100)/people.totalExpenses *10)/10}%</Text>
                        </View>
                    </TouchableOpacity> 
                );
            })}
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
      },
    text:{
      justifyContent: "center",
      alignItems: "center",
    },
})

    
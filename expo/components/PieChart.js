import { StyleSheet, Text, View,} from 'react-native';
import React from "react";
import { Dimensions, TouchableOpacity } from 'react-native';
import { VictoryPie} from "victory-native";
import { person } from "../data/dummyPerson";

export default function ChartPage() {
    const screenWidth = Dimensions.get('window').width

    const [viewMode, setViewMode] = React.useState(`${person.categoriesData[0].name}`);

    function getSampleData() {
        let requiredData = [];
        let mul = 100/person.totalExpenses;
        for(let i=0 ; i<person.categoriesData.length ; i++) {
            const obj = person.categoriesData[i];
            let percentage = Math.round(obj.totalExpenseInThis*mul *10)/10;
            requiredData = [...requiredData, { x:`${percentage}`, y:percentage, z:person.categoriesData[i].name} ];
        }
        //console.log(requiredData);
        return requiredData;
    }

    function getColorScaleData() {
        let colorScaleData = [];
        for(let i=0 ; i<person.categoriesData.length ; i++) {
            const obj = person.categoriesData[i];
            colorScaleData = [...colorScaleData, obj.color];
        }
        //console.log(colorScaleData);
        return colorScaleData;
    }

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <VictoryPie
                    colorScale={getColorScaleData()}
                    radius={({ datum }) => (viewMode == datum.z) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                    innerRadius={70}
                    labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                    data={getSampleData()}
                    style={{
                        labels: { fill: "white", fontSize: 16, lineHeight: 22 },
                    }}
                    width={screenWidth}
                    height={screenWidth}
                />
                <View style={{ position: 'absolute', top: '43%', left: "40%"}}>
                    <Text style={{ textAlign: 'center', fontSize: 20, lineHeight: 32, color: "gray" }}>Expenses</Text>
                    <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 22 }}>This Month</Text>
                </View>
            </View>

            {person.categoriesData.map((obj) => {
                return(
                    <TouchableOpacity
                        key={obj.id}
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
                            <Text style={{ marginLeft: 8, color: (viewMode == `${obj.name}`) ? "white" : "#194868"}}>{obj.name}</Text>
                        </View>

                        {/* Expenses */}
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: (viewMode == `${obj.name}`) ? "white" : "#194868" }}>{obj.totalExpenseInThis} USD - {Math.round((obj.totalExpenseInThis*100)/person.totalExpenses *10)/10}%</Text>
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

    
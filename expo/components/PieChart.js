import { StyleSheet, Text, View,} from 'react-native';
import React from "react";
import { Dimensions, TouchableOpacity } from 'react-native';
import { VictoryPie} from "victory-native";


const sampleData=[
  { x: "18%", y: 40, z: "Cats" },
  { x: "23%", y: 45, z: "Dogs" },
  { x: "59%", y: 35, z: "Birds" },
  { x: "25%", y: 50, z: "Cows" },
  { x: "30%", y: 30, z: "Gaurav" },
  { x: "30%", y: 30, z: "Thakker" }
];
export default function ChartPage() {
    const screenWidth = Dimensions.get('window').width

    const [viewMode, setViewMode] = React.useState("Cats");

          return (
            <View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <VictoryPie
                colorScale={['#FFD573', '#008159', '#42B0FF', '#FF615F', "#8e44ad", "pink" ]}
                radius={({ datum }) => (viewMode == datum.z) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                innerRadius={70}
                labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                data={sampleData}
                style={{
                  labels: { fill: "white", fontSize: 16, lineHeight: 22 },
                }}
                width={screenWidth}
                height={screenWidth}
              />
              <View style={{ position: 'absolute', top: '43%', left: "44%"}}>
                    <Text style={{ textAlign: 'center', fontSize: 30, lineHeight: 32, color: "gray" }}>8</Text>
                    <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 22 }}>Expenses</Text>
              </View>
              </View>


              





              <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Cats") ? "#BEC1D2" : "white",
                }}
                onPress={() => setViewMode("Cats")}
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: "#FFD573",
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Cats</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
                </View>
            </TouchableOpacity>



            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Dogs") ? "#BEC1D2" : "white",
                }}
                onPress={() => setViewMode("Dogs")}
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: "#008159",
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Dogs") ? "white" : "#194868"}}>Dogs</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Dogs") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Birds") ? "#BEC1D2" : "white",
                }}
                onPress={() => setViewMode("Birds")}
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: "#42B0FF",
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Birds") ? "white" : "#194868"}}>Birds</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Birds") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Cows") ? "#BEC1D2" : "white",
                }}
                onPress={() => setViewMode("Cows")}
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: "#FF615F",
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cows") ? "white" : "#194868"}}>Cows</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cows") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
                </View>
            </TouchableOpacity>


          
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
    button: {
      // backgroundColor: (viewMode == datum.x) ? "#BEC1D2" : "pink",
      // padding: 14,
      // marginLeft: 22,
      // marginRight: 20,
      // borderRadius: 8,
      // borderWidth: 1,
      // borderColor: "#BEC1D2",
      // justifyContent: "center",
      // alignItems: "center",

    },
    text:{
      justifyContent: "center",
      alignItems: "center",
    },
})

    
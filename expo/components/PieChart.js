import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native';
import React, {useRef, useEffect, useState} from "react";
import { Dimensions, Button,TouchableOpacity } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'expo-chart-kit';
import { VictoryBar,VictoryPie, VictoryChart, VictoryTheme } from "victory-native";


const sampleData=[
  { x: "Cats", y: 40, z: "18%" },
  { x: "Dogs", y: 45, z: "23%" },
  { x: "Birds", y: 35, z: "59%" },
  { x: "Cow", y: 50, z: "25%" },
  { x: "Fish", y: 30, z: "30%" }
];
export default function ChartPage() {
    const screenWidth = Dimensions.get('window').width

    const [viewMode, setViewMode] = React.useState("Cats");

          return (
            <View>
              <VictoryPie
                colorScale={['#FFD573', '#008159', '#42B0FF', '#FF615F', "#8e44ad" ]}
                radius={({ datum }) => (viewMode == datum.x) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                innerRadius={70}
                labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                data={sampleData}
                style={{
                  labels: { fill: "white", fontSize: 16, lineHeight: 22 },
              }}
              />

            
            <View style={{marginTop: 50}}>
            <Text>Click here</Text>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setViewMode("Cats")}
              >
                <Text style={styles.text}>Cats</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setViewMode("Dogs")}
              >
                <Text style={styles.text}>Dogs</Text>
              </TouchableOpacity>
            </View>
          </View>
          );
}
// 50 + datum.y * 2
// (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
      },
    button: {
      backgroundColor: "pink",
      padding: 10,
      margin: 10,
    },
    text:{
      justifyContent: "center",
        alignItems: "center",
    },
})

    
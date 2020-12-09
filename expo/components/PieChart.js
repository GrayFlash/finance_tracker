import { 
    StyleSheet, 
    Text, 
    View,
} from 'react-native';
import React from "react";
import { Dimensions, TouchableOpacity } from 'react-native';
import { VictoryPie} from "victory-native";


const sampleData=[
  { x: "Cats", y: 40, z: "18%" },
  { x: "Dogs", y: 45, z: "23%" },
  { x: "Birds", y: 35, z: "59%" },
  { x: "Cows", y: 50, z: "25%" },
  { x: "Gaurav", y: 30, z: "30%" },
  { x: "Thakker", y: 30, z: "30%" }
];
export default function ChartPage() {
    const screenWidth = Dimensions.get('window').width

    const [viewMode, setViewMode] = React.useState("Cats");

          return (
            <View>
              <VictoryPie
                colorScale={['#FFD573', '#008159', '#42B0FF', '#FF615F', "#8e44ad", "pink" ]}
                radius={({ datum }) => (viewMode == datum.x) ? screenWidth * 0.4 : screenWidth * 0.4 - 10}
                innerRadius={70}
                labelRadius={({ innerRadius }) => (screenWidth * 0.4 + innerRadius) / 2.5}
                data={sampleData}
                style={{
                  labels: { fill: "white", fontSize: 16, lineHeight: 22 },
              }}
              />

          
            <View style={{marginTop: 0}}>
            <View style={{marginTop: 0}}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setViewMode("Cats")}
              >
                <Text style={styles.text}>Cats</Text>
              </TouchableOpacity>
             </View>

             <View style={{marginTop: 10}}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setViewMode("Dogs")}
              >
                <Text style={styles.text}>Dogs</Text>
              </TouchableOpacity>
             </View>

             <View style={{marginTop: 10}}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setViewMode("Birds")}
              >
                <Text style={styles.text}>Birds</Text>
              </TouchableOpacity>
             </View>

             <View style={{marginTop: 10}}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setViewMode("Cows")}
              >
                <Text style={styles.text}>Cows</Text>
              </TouchableOpacity>
             </View>

             <View style={{marginTop: 10}}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setViewMode("Gaurav")}
              >
                <Text style={styles.text}>Gaurav</Text>
              </TouchableOpacity>
             </View>

             <View style={{marginTop: 10}}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setViewMode("Thakker")}
              >
                <Text style={styles.text}>Thakker</Text>
              </TouchableOpacity>
             </View>
             
            </View>
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
      backgroundColor: "pink",
      padding: 8,
      marginLeft: 22,
      marginRight: 20,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",

    },
    text:{
      justifyContent: "center",
      alignItems: "center",
    },
})

    
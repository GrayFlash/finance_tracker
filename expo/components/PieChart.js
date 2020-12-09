import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native';
import * as React from "react";
import { Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'expo-chart-kit';
import { VictoryBar,VictoryPie, VictoryChart, VictoryTheme } from "victory-native";

const sampleData=[
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 },
  { x: "Cow", y: 50 },
  { x: "Fish", y: 45 }
];
export default function ChartPage() {
    const screenWidth = Dimensions.get('window').width

          return (
            <View style={styles.container}>
              <VictoryPie
                innerRadius={100}
                data={sampleData}
              />
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
    theresNothing : {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
})

    
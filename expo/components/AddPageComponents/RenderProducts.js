import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';

export default function RenderProducts({ doneButtonHandler, scannedData }) {
/*
    let scannedData = {
        Categories: [
            "Hygiene",
            "Hygiene",
            "Food",
            "Home",
            "Hygiene",
            "Food",
            "Food",
            "Food",
            "Home",
            "Clothes",
            "Food",
            "Food",
            "Hygiene",
            "Hygiene",
        ],
        Items: [
            " GOWARDHAN GO CHEE",
            " ALIUL VANILA IC CR",
            " APPY JUICE 400 ML",
            " BT RAWRICE",
            " ORANGE CITRUS",
            " GOODLIFE PURE COW",
            " SUGAR",
            " ВАЛBINO ROASTED V",
            " CUCUMBER HYBRID",
            " DOUBLE HORSE IDIY",
            " GINGER",
            " GREEN CHILLY",
            " KGTIDE JR 1",
            " РЕPSODENТ KDS FRT",
        ],
        Prices: [
            54.04,
            19.58,
            17.44,
            41.14,
            95,
            21.75,
            38.76,
            36.37,
            18,
            10.74,
            45,
            45,
            85.73,
            47.1,
        ]
    }   
*/
    let productList = [], n = scannedData.Categories.length;
    for(let i=0 ; i<n ; i++) {
        productList = [ ...productList, { title: scannedData.Items[i], category: scannedData.Categories[i], total: scannedData.Prices[i] }]
    }

    return (
        <View>
            <View style={{
                alignItems: 'center', 
                paddingBottom: 15,
                marginHorizontal: 15,
                marginBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: 'black'
            }}>
                <Text style={{ color: "#194868" }}>Your scanned product's list</Text>
            </View>

            <View style={styles.table} >
                <Text style={{ marginBottom: 5 }} >Total items: {productList.length}</Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={[ "Product Name", "Category", "Amount" ]} style={styles.head} textStyle={styles.text}/>
                    {productList.map((item) => {
                        return (
                            <Row data={[ item.title, item.category, item.total]} textStyle={styles.text} key={productList.indexOf(item)} />
                        );  
                    })}
                </Table>
            </View>
            
            <TouchableOpacity 
                style={{ paddingTop: 10, marginTop: 10, marginBottom: 10 }}
                onPress={() => doneButtonHandler(productList) }
            >
                <View style={{
                    backgroundColor: "#444444",
                    padding: 12,
                    borderRadius: 6,
                }}>
                    <Text style={{color: "white", textAlign: "center"}}>Done</Text>
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
    table: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: '#fff' 
    },
    head: { 
        height: 40, 
        backgroundColor: '#f1f8ff'
    },
    text: { margin: 6 },
})

    
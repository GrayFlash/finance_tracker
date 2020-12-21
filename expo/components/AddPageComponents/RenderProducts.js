import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';

export default function RenderProducts({ doneButtonHandler, scannedData }) {

    let productList = [], n = scannedData.Categories.length, totalExpenseForUser = 0, categories= [];
    for(let i=0 ; i<n ; i++) {
        productList = [ ...productList, { title: scannedData.Items[i], category: scannedData.Categories[i], total: scannedData.Prices[i] }];
        totalExpenseForUser += scannedData.Prices[i];
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
                onPress={() => doneButtonHandler(productList, totalExpenseForUser) }
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

    
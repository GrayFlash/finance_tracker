import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert } from 'react-native'

export default function ManualAdd() {
    return (
        <View style={styles.container} >
            <Text style={styles.Text}>Product Name</Text>
            <TextInput 
                style={styles.inputField}
                //placeholder="Product Name" 
            />

            <Text style={styles.Text}>Category</Text>
            <TextInput 
                style={styles.inputField}
                //placeholder="Product Name" 
            />

            <Text style={styles.Text}>Amount</Text>
            <TextInput 
                style={styles.inputField}
                //placeholder="Product Name" 
            />

            {/* <Text>Date</Text>
            <TextInput 
                style={styles.inputField}
                //placeholder="Product Name" 
            /> */}

            <Text style={styles.Text}>Description</Text>
            <TextInput 
                style={styles.inputField}
                // placeholder="Product Name" 
            />
            <TouchableOpacity 
                style={{paddingTop: 10,marginTop: 10}}
                onPress={() => Alert.alert("Submit karne k baad ka code is on gaurav")}
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center"}}>Add Product</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingTop: 30,
    }, 
    inputField : {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
    },

    Text : {
        fontSize: 14,
        color: "black",
        paddingTop: 8,
    },

    button : {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
    }
})
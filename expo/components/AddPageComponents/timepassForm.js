import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Button } from 'react-native'

export default function ManualAdd() {
    return (
        <View style={styles.container} >
            <Text>Product Name</Text>
            <TextInput 
                style={styles.inputField}
                placeholder="Product Name" 
            />

            <Text> Category</Text>
            <TextInput 
                style={styles.inputField}
                placeholder="Product Name" 
            />

            <Text>Amount</Text>
            <TextInput 
                style={styles.inputField}
                placeholder="Product Name" 
            />

            <Text>Date</Text>
            <TextInput 
                style={styles.inputField}
                placeholder="Product Name" 
            />

            <Text>Description</Text>
            <TextInput 
                style={styles.inputField}
                placeholder="Product Name" 
            />
            <TouchableOpacity>
                <Button title="Add"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    }, 
    inputField : {
        backgroundColor: "pink",
        padding: 20,
    },
})
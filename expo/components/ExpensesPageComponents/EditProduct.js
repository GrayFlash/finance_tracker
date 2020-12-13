import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert, Picker } from 'react-native'

export default function EditProduct({ item }) {
    const [selectedValue, setSelectedValue] = useState("Education");
    return (
        <View style={styles.container} >
            <Text style={styles.Text}>Product Name</Text>
            <TextInput 
                style={styles.inputField}
                value={item.title}
            />

            <Text style={styles.Text}>Category</Text>
            {/* <TextInput 
                style={styles.inputField}
            /> */}
            <View style={{
                backgroundColor: "white",
                marginTop: 8,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#D1D1D1",
            }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 350 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                    
                    <Picker.Item label="Education" value="Education" />
                    <Picker.Item label="Nutrition" value="Nutrition" />
                    <Picker.Item label="Child" value="Child" />
                    <Picker.Item label="Beauty" value="Beauty" />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Clothing" value="Clothing" />
                </Picker>
            </View>

            <Text style={styles.Text}>Amount</Text>
            <TextInput 
                style={styles.inputField}
                value={item.total.toString()}
            />

            <Text style={styles.Text}>Description</Text>
            <TextInput 
                style={styles.inputField}
                value={item.description}
            />
            <TouchableOpacity 
                style={{paddingTop: 10,marginTop: 10}}
                onPress={() => Alert.alert("Submit karne k baad ka code is on Neel")}
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center"}}>Edit Product</Text>
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
        fontWeight: "bold",
        color: "black",
        paddingTop: 8,
    },

    button : {
        backgroundColor: "#222222",
        padding: 12,
        borderRadius: 6,
    }
})
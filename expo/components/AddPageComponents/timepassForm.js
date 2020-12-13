import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert, Picker } from 'react-native'

export default function ManualAdd() {
    const [selectedValue, setSelectedValue] = useState("Food");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Food");
    const [total, setTotal] = useState(0);
    const [description, setDescription] = useState("");
    const addExpense = async(te, ca, to) => {
        fetch('http://9776686554bd.ngrok.io/addExpense',{
            method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title: total,
                    category: category,
                    total: parseInt(total),
                    description: description
                })
        })
    }
    return (
        <View style={styles.container} >
            <Text style={styles.Text}>Product Name</Text>
            <TextInput 
                style={styles.inputField}
                //placeholder="Product Name" 
                value={title}
                onChangeText={text => setTitle(text)}
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
                    selectedValue={category}
                    style={{ height: 50, width: 350 }}
                    onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                    
                    <Picker.Item label="Hygiene" value="Hygiene" />
                    <Picker.Item label="Food" value="Food" />
                    <Picker.Item label="Home" value="Home" />
                    <Picker.Item label="Others" value="Others" />
                    <Picker.Item label="Stationery" value="Stationery" />
                    <Picker.Item label="Clothes" value="Clothes" />
                </Picker>
            </View>

            <Text style={styles.Text}>Amount</Text>
            <TextInput 
                style={styles.inputField}
                //placeholder="Product Name" 
                value={total.toString()}
                onChangeText={text => setTotal(text)}
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
                value={description}
                onChangeText={text => setDescription(text)}
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
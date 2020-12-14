import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert, Picker, ScrollView } from 'react-native';
import * as myConstClass from '../../screens/HttpLink';

export default function ManualAdd({categoriesData, people}) {
    const [selectedValue, setSelectedValue] = useState("Food");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Food");
    const [total, setTotal] = useState(0);
    const [description, setDescription] = useState("");
    const updateUserData = async() =>{
        fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
            method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:people._id,
                    name: people.name,
                    income: people.income,
                    savings: people.savings,
                    targetToSave: people.targetToSave,
                    thisMonthStatus: people.thisMonthStatus,
                    totalExpenses: parseInt(people.totalExpenses)+parseInt(total)
                })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${people.name} has been updated`)
        })
        .catch(err=>{
            Alert.alert("Some Error")
            console.log(err)
        })
    }

    const updateCategoryExpense = async() =>{
        for(var i in categoriesData){
            if(categoriesData[i].name === category){
                fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
                    method:"post",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            id:categoriesData[i]._id,
                            name: categoriesData[i].name,
                            icon: categoriesData[i].icon,
                            color: categoriesData[i].color,
                            totalExpenseInThis: parseInt(categoriesData[i].totalExpenseInThis) + parseInt(total)
                        })
                })
                .then(res=>res.json())
                .then(data=>{
                    Alert.alert(`Details of ${people.name} has been updated`)
                })
                .catch(err=>{
                    Alert.alert("Some Error")
                    console.log(err)
        })
            }
        }
    }

    
    const addExpense = () => {
        fetch(`${myConstClass.HTTP_LINK}/addExpense`,{
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
        .then(res=>res.json())
        .then(data =>{
            updateCategoryExpense();
            updateUserData();
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
                onPress={() => addExpense()}
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
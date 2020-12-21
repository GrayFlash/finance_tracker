import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Alert } from 'react-native'

export default function EditProduct({ item, categoriesData, editProductSaveButtonHandler, editProductDeleteButtonHandler, editProductCancelButtonHandler }) {
    
    const _id = item._id;
    const prevTotal = item.total;

    const [selectedValue, setSelectedValue] = useState(item.category);
    const [productName, setProductName] = useState(item.title);
    const [amount, setAmount] = useState(item.total.toString());
    const [description, setDescription] = useState(item.description);

    let [check_name, setCheck_name] = useState(true);
    let [check_amount, setCheck_amount] = useState(true);

    function pick() {
        if(productName.length==0 || amount==null || isNaN(amount) || !isNaN(productName) || amount.length==0){
            if(!isNaN(productName || productName.length==0)){
                setCheck_name(false);
            }
            if(isNaN(amount) || amount==null || amount.length==0){
                setCheck_amount(false);
            }
            if(isNaN(productName)){
                setCheck_name(true);
            }
            if(productName.length!==0){
                setCheck_name(true);
            }
            if(!isNaN(amount) && amount!==null){
                setCheck_amount(true);
            }
            Alert.alert('Please fill proper input.');

        } else {
            const obj = {
                id: _id,
                title: productName,
                description: description,
                category: selectedValue,
                total: Number(amount)
            }
            editProductSaveButtonHandler(obj, prevTotal);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{
                textAlign: "center", 
                color:"black", 
                fontFamily:"GothamBold", 
                fontSize: 17, 
                paddingBottom: 10,
            }}>Edit Your Product</Text>
            <View style={{borderBottomWidth: 1, borderBottomColor: "black", marginHorizontal: 50, marginBottom: 20}} />
            
            <Text style={styles.Text}>Product Name</Text>
            <TextInput 
                style={{
                    backgroundColor: "white",
                    fontFamily: 'GothamLight',
                    fontSize: 13,
                    borderWidth: 1,
                    borderColor: check_name ? "#D1D1D1" : "red",
                    borderRadius: 5,
                    padding: 10,
                }}
                value={productName}
                onChangeText={(text) => setProductName(text)}
            />

            <Text style={styles.Text}>Category</Text>
            
            <View style={{
                backgroundColor: "white",
                marginTop: 8,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#D1D1D1",
            }}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                    
                    {categoriesData.map((item) => {
                        return (
                            <Picker.Item key={item._id} label={item.name} value={item.name} />
                        );  
                    })}
                </Picker>
            </View>

            <Text style={styles.Text}>Amount</Text>
            <TextInput 
                style={{
                    backgroundColor: "white",
                    fontFamily: 'GothamLight',
                    fontSize: 13,
                    borderWidth: 1,
                    borderColor: check_amount ? "#D1D1D1" : "red",
                    borderRadius: 5,
                    padding: 10,
                }}
                value={amount}
                onChangeText={text => setAmount(text)}
            />

            <Text style={styles.Text}>Description</Text>
            <TextInput 
                style={styles.inputField}
                value={description}
                onChangeText={text => setDescription(text)}
            />
            
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}> 
                <TouchableOpacity 
                    style={{paddingTop: 10,marginTop: 10, flex: 1, marginRight: 5}}
                    onPress={() => {
                        pick()
                    }}
                >
                    <View style={{
                        backgroundColor: "#222222",
                        padding: 12,
                        borderRadius: 6,
                    }}>
                        <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>Edit Product</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity 
                    style={{paddingTop: 10,marginTop: 10, flex: 1, marginLeft: 5}}
                    onPress={() => {
                        const obj = {
                            id: _id,
                            title: productName,
                            description: description,
                            category: selectedValue,
                            total: Number(amount)
                        }
                        editProductDeleteButtonHandler(obj);
                    }}
                >
                    <View style={{
                        backgroundColor: "red",
                        padding: 12,
                        borderRadius: 6,
                    }}>
                        <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={{paddingTop: 10,marginTop: 10}}
                onPress={() => editProductCancelButtonHandler()}
            >
                <View style={{
                    backgroundColor: "white",
                    padding: 12,
                    borderRadius: 6,
                }}>
                    <Text style={{color: "black", textAlign: "center", fontFamily: 'GothamMedium'}}>Cancel</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingTop: 10,
        marginHorizontal: 28,
    }, 
    inputField : {
        backgroundColor: "white",
        fontFamily: 'GothamLight',
        fontSize: 13,
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
    },

    Text : {
        fontSize: 14,
        color: "black",
        paddingTop: 8,
        paddingBottom: 4,
        marginLeft: 2,
        fontFamily: 'GothamMedium'
    },
})
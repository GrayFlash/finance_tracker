import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, FlatList, ScrollView, ImageBackground } from 'react-native';
import * as myConstClass from './HttpLink';

export default function List() {
    
    const navigation = useNavigation();

    return (

        <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white"}}>
                <View style={{ flexDirection: 'row', marginTop: 40 , marginBottom: 10}}>
                    <TouchableOpacity style={{ flex: 1,}} onPress={() => navigation.goBack()} >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../assets/icons/back_arrow_icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>AddList</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>

            <View>
        <View style={styles.container} >
            <Text style={{
                textAlign: "center", 
                color:"black", 
                fontFamily:"GothamBold", 
                fontSize: 17, 
                paddingBottom: 10,
            }}>Add Product</Text>
            <View style={{borderBottomWidth: 1, borderBottomColor: "black", marginHorizontal: 60, marginBottom: 20}} />
            <Text style={styles.Text}>Product Name</Text>
            <TextInput 
                style={styles.inputField}
                
            />

            <Text style={styles.Text}>Category</Text>

            <Text style={styles.Text}>Amount</Text>
            <TextInput 
                style={styles.inputField}
                
            />

            <Text style={styles.Text}>Description</Text>
            <TextInput 
                style={styles.inputField}
                multiline={true}
                
            />
            <TouchableOpacity 
                style={{paddingTop: 10,marginTop: 10, marginBottom: 20}}
                
            >
                <View style={{backgroundColor: "black"}}>
                    <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>Add Product</Text>
                </View>
            </TouchableOpacity>
        </View>
        
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 50,
        padding: 50
    }, 
    inputField: {
        backgroundColor: "white"
    }
});



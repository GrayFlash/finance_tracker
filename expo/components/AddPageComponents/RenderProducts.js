import { StyleSheet, Text, View,} from 'react-native';
import React,{useState, useEffect} from "react";
import { Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';

export default function RenderProducts({ doneButtonHandler }) {
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

                {/* RENDER PRODUCTS HERE */}
            
                <View
                    style={{
                        flexDirection: 'row',
                        height: 40,
                        marginTop: 4,
                        paddingHorizontal: 12,
                        borderRadius: 10,
                        backgroundColor: "white",
                    }}
               
                >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 8, color: "#194868"}}>1.</Text>
                    <Text style={{ marginLeft: 20, color: "#194868"}}>Expenses</Text>
                </View>

                <View style={{justifyContent: 'center', marginRight: 40}}>
                    <Text style={{color: "#194868"}}>Category</Text>
                </View>

                <View style={{ justifyContent: 'center', marginRight: 30 }}>
                    <Text style={{ color: "#194868" }}>1200</Text>
                </View>
                <TouchableOpacity style={{ 
                    justifyContent: 'center', 
                    backgroundColor: "#444444", 
                    borderRadius: 8,
                    paddingHorizontal: 4,
                    marginVertical: 4
                }}>
                    <Image style={{width:30, height:30, tintColor: "white"}} source={require('../../assets/icons/edit0.png')} />
                </TouchableOpacity>
            </View>

            {/* BUTTON THAT UPLOADS INFO OR DOES SOMETHING AFTER USER CONFIRMS THE SCANNED PRODUCTS */}

            <TouchableOpacity 
                style={{paddingTop: 10,marginTop: 10}}
                onPress={() => doneButtonHandler() }
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
})

    
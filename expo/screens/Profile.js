import React from 'react';
import { View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { person } from '../data/dummyPerson';

export default function Home() {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        )
    }

    const [viewMode, setViewMode] = React.useState("expense");

    function renderExpense() {
        return (
            <View style={{marginTop: 20}}>
            
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 60,
                    marginTop: 0,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: "white",
                }}
               
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    {/* <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} /> */}

                    <Text style={{ marginLeft: 8, color: "#194868"}}>Monthly Income</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: "#194868" }}>{person.income} USD</Text>
                </View>
            </TouchableOpacity>

            
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 60,
                    marginTop: 14,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: "white",
                }}
               
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    {/* <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} /> */}

                    <Text style={{ marginLeft: 8, color: "#194868"}}>Expenses</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: "#194868" }}>{person.totalExpenses} USD</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 60,
                    marginTop: 14,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: "white",
                }}
                
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    {/* <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} /> */}

                    <Text style={{ marginLeft: 8, color: "#194868"}}>Target to save</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: "#194868" }}>{person.targetToSave} USD</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 60,
                    marginTop: 14,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: "white",
                }}
                
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    {/* <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} /> */}

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>This month's target </Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: "red" }}>Over Spent  ({person.thisMonthStatus})</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 60,
                    marginTop: 14,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: "white",
                }}
                onPress={() => setViewMode("edit")}
                
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    {/* <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} /> */}

                    <Text style={{ marginLeft: 8, color: "#194868"}}>Edit Values </Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Image style={{width: 20, height:20}}source={require('../assets/icons/right-arrow.png')} />
                </View>
            </TouchableOpacity>
        </View>


        )
    }

    function renderEdit() {
        return (
            <View>
            <View style={styles.container} >
            <Text style={styles.Text}>My Name</Text>
            <TextInput 
                style={styles.inputField}
                
            />

            <Text style={styles.Text}>Monthly Income</Text>
            <TextInput 
                style={styles.inputField}
               
            />

            <Text style={styles.Text}>Target to save</Text>
            <TextInput 
                style={styles.inputField}
                
            />

            {/* <Text style={styles.Text}>Extra expense this month</Text>
            <TextInput 
                style={styles.inputField}
            /> */}
            <TouchableOpacity 
                style={{marginTop: 5}}
                onPress={() => Alert.alert("Submit karne k baad ka code is on gaurav")}
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center"}}>Save Changes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{marginTop: 5}}
                onPress={() => setViewMode("expense")}
            >
                <View style={{
                        backgroundColor: "white",
                        padding: 12,
                        borderRadius: 6,
                        marginTop: 20
                    }}>
                    <Text style={{color: "black", textAlign: "center"}}>Cancel</Text>
                </View>
            </TouchableOpacity>
        </View>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.header}>
                <Image 
                    source={require('../assets/icons/profile.jpg')} 
                    style={{width: 100, height: 100, borderRadius: 1000}}
                />
                <Text style={{paddingTop: 10, fontSize: 16, lineHeight: 22}}>
                    {person.name}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', height: 80, backgroundColor: "#F5F7F9" }}>

            <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        borderBottomColor: viewMode == "expense" ? "#BEC1D2" : "#F5F7F9",
                        borderBottomWidth: 2,
                    }}
                    onPress={() => setViewMode("expense")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        
                        <Image style={{width: 40, height:40}} source={require('../assets/icons/salary.png')} />
                    </View>
                </TouchableOpacity>

                <LineDivider />

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        margin: 5,
                        borderBottomColor: viewMode == "edit" ? "#BEC1D2" : "#F5F7F9",
                        borderBottomWidth: 2,
                    }}
                    onPress={() => setViewMode("edit")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        
                        <Image style={{width: 40, height:40}} source={require('../assets/icons/pages.png')} />
                    </View>
                </TouchableOpacity>
                </View>
                {
                    viewMode == "expense" &&
                    <View>
                        {renderExpense()}
                    </View>
                }
                {
                    viewMode == "edit" && 
                    <View>
                        {renderEdit()}
                    </View>
                }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingTop: 5,
    }, 
    header : {
       padding : 50,
       backgroundColor: '#d1d0cd',
       alignItems: 'center', 
       justifyContent: 'center',
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
        marginTop: 20
    }
});



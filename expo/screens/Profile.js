import React from 'react';
import { View , Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';

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
            <View>
            
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Cats") ? "#BEC1D2" : "white",
                }}
               
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Monthly Income</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>94000 USD</Text>
                </View>
            </TouchableOpacity>

            
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Cats") ? "#BEC1D2" : "white",
                }}
               
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Expenses</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>840 USD</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Cats") ? "#BEC1D2" : "white",
                }}
                
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Target to save</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>450 USD</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Cats") ? "#BEC1D2" : "white",
                }}
                
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>This month's target </Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: "red" }}>Over Spent</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                    paddingHorizontal: 12,
                    marginHorizontal: 18,
                    borderRadius: 10,
                    backgroundColor: (viewMode == "Cats") ? "#BEC1D2" : "white",
                }}
                
              >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    
                    <Image 
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5
                    }} source={require('../assets/icons/pages.png')} />

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Edit Values </Text>
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
                style={{paddingTop: 10,marginTop: 10}}
                onPress={() => Alert.alert("Submit karne k baad ka code is on gaurav")}
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center"}}>Save Changes</Text>
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
                    Bruce Wayne
                </Text>
            </View>
            <View style={{ flexDirection: 'row', height: 80, backgroundColor: "white", borderRadius: 12 }}>

            <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "expense" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 10,
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
                        
                        <Image style={{width: 50, height:50}} source={require('../assets/icons/salary.png')} />
                    </View>
                </TouchableOpacity>

                <LineDivider />

                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "edit" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 10,
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
                        
                        <Image style={{width: 50, height:50}} source={require('../assets/icons/pages.png')} />
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
        paddingTop: 30,
    }, 
    header : {
       padding : 50,
       backgroundColor: 'pink',
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
    }
});



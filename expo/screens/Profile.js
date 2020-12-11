import React from 'react';
import { View , Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Cats</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
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

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Cats</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
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

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Cats</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
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

                    <Text style={{ marginLeft: 8, color: (viewMode == "Cats") ? "white" : "#194868"}}>Cats</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (viewMode == "Cats") ? "white" : "#194868" }}>94.00 USD - 18%</Text>
                </View>
            </TouchableOpacity>
        </View>


        )
    }

    function renderEdit() {
        return (
            <Text>Edit Function</Text>
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
            {/* <View style={{ flexDirection: 'row', height: 50, backgroundColor: "#F5F5F5", borderRadius: 12 ,alignItems: 'center', justifyContent: 'center', paddingTop: 40}}>

            <TouchableOpacity style={{backgroundColor: 'pink', paddingHorizontal: 10, marginHorizontal: 10}}>
                <Image style={{width: 50, height:50}} source={require('../assets/icons/salary.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'pink', paddingHorizontal: 10, marginHorizontal: 10}}>
                <Image style={{width: 50, height:50}} source={require('../assets/icons/expense.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'pink', paddingHorizontal: 10,marginHorizontal: 10 }}>
                <Image style={{width: 50, height:50}} source={require('../assets/icons/pages.png')} />
            </TouchableOpacity>
            </View> */}
            <View style={{ flexDirection: 'row', height: 80, backgroundColor: "#F5F5F5", borderRadius: 12 }}>

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
                        {/* <Text style={{ marginLeft: 0, fontSize: 16, lineHeight: 22, color: "black" }}>My info</Text> */}
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
                        {/* <Text style={{ marginLeft: 0, fontSize: 16, lineHeight: 22, color: "black" }}>Edit info</Text> */}
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
   header : {
       padding : 50,
       backgroundColor: 'pink',
       alignItems: 'center', 
       justifyContent: 'center',
   }
});



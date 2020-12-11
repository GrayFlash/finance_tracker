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

    const [viewMode, setViewMode] = React.useState("info");

    function renderInfo() {
        return (
            <Text>Function</Text>
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

            <View style={{ flexDirection: 'row', height: 55, backgroundColor: "#F5F5F5", borderRadius: 12 }}>

            <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "info" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 10,
                    }}
                    onPress={() => setViewMode("info")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ marginLeft: 0, fontSize: 16, lineHeight: 22, color: "black" }}>My info</Text>
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
                        <Text style={{ marginLeft: 0, fontSize: 16, lineHeight: 22, color: "black" }}>Edit info</Text>
                    </View>
                </TouchableOpacity>
                </View>
                {
                    viewMode == "info" &&
                    <View>
                        {renderInfo()}
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



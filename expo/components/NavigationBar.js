import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
} from 'react-native';

export default function NavigationBar({ NavbarButtonHandler, viewMode }) {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 24, marginTop: 10,}}>
            <View style={{ flexDirection: 'row', height: 55, backgroundColor: "white", borderRadius: 12 }}>
                {/* Claim */}
                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "expenses" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 10,
                    }}
                    onPress={() => NavbarButtonHandler("expenses")}
                    
                >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Image
                            source={require('../assets/icons/chart_icon.png')}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20
                            }}
                        /> */}
                        <Text style={{  marginLeft: 0, fontSize: 16, lineHeight: 22, color: "black"}}> Expenses </Text>
                    </View>
                </TouchableOpacity>

                {/* Divider */}
                <LineDivider />

                {/* Get Point */}
                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "chart" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 10,
                    }}
                    onPress={() => NavbarButtonHandler("chart")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* <Image
                            source={require('../assets/icons/chart_icon.png')}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20
                            }}
                        /> */}
                        <Text style={{ marginLeft: 0, fontSize: 16, lineHeight: 22, color: "black" }}>Pie Chart</Text>
                    </View>
                </TouchableOpacity>

                {/* Divider */}
                <LineDivider />

                {/* My Card */}
                <TouchableOpacity
                    style={{ 
                        flex: 1,
                        backgroundColor: viewMode == "add" ? "#BEC1D2" : null, 
                        margin: 5,
                        borderRadius: 10,
                    }}
                    onPress={() => NavbarButtonHandler("add")}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* <Image
                            source={require('../assets/icons/camera.png')}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40,
                            }}
                        /> */}
                        <Text style={{ marginLeft: 0, fontSize: 16, lineHeight: 22, color: "black" }}>Add</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    NavButtons : {
        marginTop: 0,
    },
})


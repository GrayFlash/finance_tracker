import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavigationBar({ NavbarButtonHandler, viewMode }) {

    const LineDivider = () => {
        return (
            <View style={{ width: 0, paddingVertical: 20 }}>
                <View style={{ flex: 1, borderLeftColor: "gray", borderLeftWidth: 1 }}></View>
            </View>
        );
    }

    const navigation = useNavigation();

    return (
        <View>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white",}}>
                <View style={{ flexDirection: 'row', marginTop: 40 , marginBottom: 10}}>
                    <TouchableOpacity   style={{ flex: 1,}} 
                                        onPress={() => navigation.toggleDrawer()} >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{marginLeft: 0, width: 27, height: 27, marginRight: 60 }} source={require('../assets/icons/menu.png')} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 18,fontFamily: 'GothamMedium', color: "black"}}>Home</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1,}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                    </View>
                </View>
            </View>
            
            <View style={{ flex: 1, justifyContent: 'center', padding: 24,}}>
                <View style={{ flexDirection: 'row', height: 55, backgroundColor: "white", borderRadius: 8 }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ 
                            flex: 1,
                            backgroundColor: viewMode == "expenses" ? "#BEC1D2" : null, 
                            margin: 5,
                            borderRadius: 6,
                        }}
                        onPress={() => NavbarButtonHandler("expenses")}
                        
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{  marginLeft: 0, fontSize: 16,fontFamily: 'GothamMedium', lineHeight: 22, color: "black"}}> Expenses </Text>
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
                            borderRadius: 8,
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
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>Pie Chart</Text>
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
                            borderRadius: 8,
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
                            <Text style={{ marginLeft: 0, fontSize: 16, fontFamily: 'GothamMedium', lineHeight: 22, color: "black" }}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    NavButtons : {
        marginTop: 0,
    },
})


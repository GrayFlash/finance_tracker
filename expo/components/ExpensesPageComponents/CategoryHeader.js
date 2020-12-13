import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    
 } from 'react-native';

export default function CategoryHeader({ setViewMode, totalCategories }) {
    return (
        <View style={styles.mainCategoryHeading}>
            {/* Title */}
            <View>
                <Text style={styles.titleText}>CATEGORIES</Text>
                <Text style={styles.titleSubText}>6 Total</Text>
            </View>

            {/* Button */}
            <View style={{ flexDirection: 'row' }}>
                {/* <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#95A9B8',
                        height: 50,
                        width: 50,
                        borderRadius: 25
                    }}
                >
                    <Image
                        source={require('../../assets/icons/chart_icon.png')}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: "white",
                        }}
                    />
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: null,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        marginLeft: 8
                    }}
                    onPress={() => setViewMode("list")}
                >
                    <Image
                        source={require('../../assets/icons/menu_icon.png')}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#898C95',
                        }}
                    />
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainCategoryHeading : {
        flexDirection: 'row', 
        paddingHorizontal: 26,
        paddingTop: 24,
        paddingBottom:14, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    titleText: {
        color: "#194868",
        fontSize: 16, 
        lineHeight: 22,
    },
    titleSubText: { 
        color: '#898C95', 
        fontSize: 14, 
        lineHeight: 22,
    },
})

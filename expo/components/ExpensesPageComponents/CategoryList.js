import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
    FlatList,
 } from 'react-native';

export default function CategoryList({ setSelectedCategory, categories, clhav }) {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            style={styles.itemButton}
        >
            <Image
                source={item.icon}
                style={{ width: 20, height: 20, tintColor: item.color }}
            />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ paddingHorizontal: 19 }}>
            <Animated.View style={{ height: clhav }}>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    numColumns={2}
                />
            </Animated.View>

            <TouchableOpacity style={styles.totalExpenseButton} >
                <View>
                    <Text style={styles.totalExpenseText}>
                        Total spend $6109
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemButton: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        backgroundColor: "white",
    },
    itemText: {
        marginLeft: 8, 
        color: "#194868", 
        fontSize: 14, 
        lineHeight: 22, 
    },
    totalExpenseButton: {
        backgroundColor: "#FF615F",
        marginTop: 5,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 12
    },
    totalExpenseText: {
        marginTop:0, 
        lineHeight: 22, 
        color: 'white', 
        textAlign: "center",
    }  
});
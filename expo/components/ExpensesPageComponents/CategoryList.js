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

export default function CategoryList({ setSelectedCategory, categories, clhav, totalExpenses, categoriesData }) {

    function renderItem({ item }){
        //console.log(item.icon)
        return(
        <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            style={styles.itemButton}
        >
            <Image
                source={{uri: item.icon}}
                style={{ width: 20, height: 20, tintColor: item.color }}
            />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );
        }
    return (
        <View style={{ paddingHorizontal: 19 }}>
            <Animated.View style={{ height: clhav }}>
                <FlatList
                    data={categoriesData}
                    renderItem={renderItem}
                    keyExtractor={item => `${item._id}`}
                    numColumns={2}
                />
            </Animated.View>

            <View style={styles.totalExpenseButton} >
                <View>
                    <Text style={styles.totalExpenseText}>
                        Total spend  ₹ {Math.round(totalExpenses*100)/100}
                    </Text>
                </View>
            </View>
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
        borderRadius: 8,
        backgroundColor: "white",
    },
    itemText: {
        marginLeft: 8, 
        color: "#194868", 
        lineHeight: 22, 
        fontFamily: 'GothamMedium',
    },
    totalExpenseButton: {
        backgroundColor: "#FF615F",
        marginTop: 5,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 8
    },
    totalExpenseText: {
        marginTop:0, 
        lineHeight: 22, 
        color: 'white', 
        textAlign: "center",
        fontFamily: 'GothamMedium'
    }  
});
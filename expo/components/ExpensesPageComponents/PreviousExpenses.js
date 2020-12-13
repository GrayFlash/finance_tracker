import React from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
 } from 'react-native';

export default function PreviousExpenses({ selectedCategory, allExpenses }) {
    
    if(selectedCategory !== null) {
        allExpenses = allExpenses.filter(item => {
            if(item.category === selectedCategory.name) {
                return item;
            }
        });
    }

    const renderItem = ({ item, index }) => (
        <View style={{
                width: 250,
                marginRight: 24,
                marginLeft: index == 0 ? 24 : 0,
                marginVertical: 0,
                borderRadius: 8,
                backgroundColor: "white",
            }}>

            <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 25,
                        backgroundColor: "white",
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8
                    }}
                >
                    <Image
                        source={selectedCategory.icon}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: selectedCategory.color
                        }}
                    />
                </View>
                <Text style={{ fontSize: 16, lineHeight: 22, color: selectedCategory.color, fontWeight:'bold'}}>{selectedCategory.name}</Text>
            </View>

            {/* Expense Description */}
            <View style={{ paddingHorizontal: 24 }}>
                {/* Title and description */}
                <Text style={{ fontSize: 18, lineHeight: 20 }}>{item.title}</Text>
                <Text style={{ fontSize: 12, lineHeight: 30, flexWrap: 'wrap', color: '#898C95' }}>
                    {item.description}
                </Text>
            </View>

            {/* Price */}
            <View
                style={{
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 24,
                    borderBottomStartRadius: 8,
                    borderBottomEndRadius: 8,
                    backgroundColor: selectedCategory.color,
                }}
            >
                <Text style={{ color: "white", fontSize: 15, lineHeight: 22 }}>{item.total.toFixed(2)} $</Text>
            </View>
        </View>
    )

    return (
        <View>
            <View style={{ height: 80, backgroundColor: '#F2F2F2', padding: 24 }}>
                <Text style={{ fontSize: 16, lineHeight: 22, color: "#194868" }}>PREVIOUS EXPENSES</Text>
                <Text style={{fontSize: 14, lineHeight: 22, color: '#898C95' }}>This Week</Text>
            </View>
            {
                selectedCategory === null &&
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                    <Text style={{ color: "#194868", fontSize: 12, lineHeight: 22 }}>Click on any above categories in categories section</Text>
                </View>
            }
            {
                selectedCategory !== null &&
                <FlatList
                    data={allExpenses}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            }
        </View>

    )
}
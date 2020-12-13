import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CategoryList from './ExpensesPageComponents/CategoryList';
import PreviousExpenses from './ExpensesPageComponents/PreviousExpenses';

export default function Expenses({ clhav, selectedCategory, setSelectedCategory, setViewMode, totalExpenses, categoriesData, allExpenses }) {

    return (
        <View>
            <View style={styles.mainCategoryHeading}>
                <View>
                    <Text style={styles.titleText}>CATEGORIES</Text>
                    <Text style={styles.titleSubText}>{categoriesData.length} Total</Text>
                </View>
            </View>


            <CategoryList   setSelectedCategory={setSelectedCategory}
                            clhav={clhav}
                            totalExpenses={totalExpenses}
                            categoriesData={categoriesData}
            />

            <PreviousExpenses selectedCategory={selectedCategory} allExpenses={allExpenses}  />      
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
